const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// middleware
const port = process.env.PORT;

// ! ENABLE FOR DEPLOYMENT !!!!!!
app.set("trust proxy", 1); //

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(cors());
app.use(express.json());

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  // Serve the frontend's index.html file at the root route
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });
  // Serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../build")));
  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });
}
// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    res.status(201).json({});
  });
}

//ROUTES

// *  create a new user
app.post("/createUser", async (req, res) => {
  try {
    const { username, firstname, lastname, bio, imagelink, email } = req.body;
    const newUser = await pool.query(
      `INSERT INTO users
     (username, firstname, lastname, bio, imagelink, email, datejoined) VALUES (
        $1, $2, $3, $4, $5, $6, CURRENT_DATE) RETURNING *`,
      [username, firstname, lastname, bio, imagelink, email]
    );
    const id = newUser.rows[0].id; // WORKS!
    res.send({ id: newUser.rows[0].id });
  } catch (err) {
    console.log(err.message);
  }
});

// *  post a new tweet
app.post("/addTweet", async (req, res) => {
  try {
    const { tweeterID, tweet, likes, retweets } = req.body;
    const newTweet = await pool.query(
      `INSERT INTO tweets
    (tweeterID, tweet, likes, retweets, date) VALUES (
        $1, $2, $3, $4, CURRENT_DATE) RETURNING *`,
      [tweeterID, tweet, likes, retweets]
    );
    //   const id = newUser.rows[0].id; // WORKS!
    updateTweetCount(tweeterID, 1);
    res.json(newTweet.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// *  update user's tweet count
const updateTweetCount = async (userID, increment) => {
  try {
    const update = await pool.query(
      `UPDATE users SET tweets
          = tweets + $1
          WHERE id = $2 RETURNING *`,
      [increment, userID]
    );

    return update;
  } catch (err) {
    console.log(err.message);
  }
};

// *  update user's like count
const updateLikeCount = async (tweetID, increment) => {
  try {
    const update = await pool.query(
      `UPDATE tweets SET likes
          = likes + $1
          WHERE id = $2 RETURNING *`,
      [increment, tweetID]
    );

    return update;
  } catch (err) {
    console.log(err.message);
  }
};

// *  update user's retweet count
const updateRetweetCount = async (tweetID, increment) => {
  try {
    const update = await pool.query(
      `UPDATE tweets SET retweets
          = retweets + $1
          WHERE id = $2 RETURNING *`,
      [increment, tweetID]
    );

    return update;
  } catch (err) {
    console.log(err.message);
  }
};

// *  update user's follower count
const updateFollowerCount = async (userID, increment) => {
  try {
    const update = await pool.query(
      `UPDATE users SET followers
          = followers + $1
          WHERE id = $2 RETURNING *`,
      [increment, userID]
    );

    return update;
  } catch (err) {
    console.log(err.message);
  }
};

// * update user's following count
const updateFollowingCount = async (userID, increment) => {
  try {
    const update = await pool.query(
      `UPDATE users SET following
          = following + $1
          WHERE id = $2 RETURNING *`,
      [increment, userID]
    );

    return update;
  } catch (err) {
    console.log(err.message);
  }
};

// * check if a given tweet is liked by a specific user
app.get("/tweets/liked/:tweetid/:likerid", async (req, res) => {
  try {
    const { tweetid, likerid } = req.params;
    const likedAlready = await pool.query(
      `SELECT
        CASE WHEN EXISTS
        (
              SELECT * FROM tweetLikes WHERE tweetID = $1
              AND likerID = $2
        )
        THEN 'TRUE'
        ELSE 'FALSE'
     END`,
      [tweetid, likerid]
    );

    res.send({ response: likedAlready.rows[0].case == "TRUE" });
  } catch (err) {
    console.log(err.message);
  }
});

// * check if a given user is followed by a specific user
app.get("/users/follow/:followerid/:followedid", async (req, res) => {
  try {
    const { followerid, followedid } = req.params;
    const followingAlready = await pool.query(
      `SELECT
        CASE WHEN EXISTS
        (
              SELECT * FROM followings WHERE followerid = $1
              AND followedid = $2
        )
        THEN 'TRUE'
        ELSE 'FALSE'
     END`,
      [followerid, followedid]
    );

    res.send({ response: followingAlready.rows[0].case == "TRUE" });
  } catch (err) {
    console.log(err.message);
  }
});

// * like or unlike a tweet
app.post("/tweets/like/:tweetid/:likerid", async (req, res) => {
  try {
    const { tweetID, likerID } = req.body;
    // const { tweetid, likerid } = req.params;

    const likedAlready = await pool.query(
      `SELECT
      CASE WHEN EXISTS
      (
            SELECT * FROM tweetLikes WHERE tweetID = $1
            AND likerID = $2
      )
      THEN 'TRUE'
      ELSE 'FALSE'
   END`,
      [tweetID, likerID]
    );

    let resp;
    let increment;

    if (likedAlready.rows[0].case == "TRUE") {
      resp = await pool.query(
        `DELETE FROM tweetLikes WHERE
              $1 = tweetID AND
              $2 = likerID`,
        [tweetID, likerID]
      );

      increment = -1;
    } else {
      resp = await pool.query(
        `INSERT INTO tweetLikes
          (tweetID, likerID) VALUES (
              $1, $2)`,
        [tweetID, likerID]
      );

      increment = 1;
    }
    updateLikeCount(tweetID, increment);

    // res.json(resp);
    res.send({ liked: likedAlready.rows[0].case == "TRUE" });
  } catch (err) {
    console.error(err.message);
  }
});

// * follow or unfollow a user
app.post("/users/follow", async (req, res) => {
  try {
    const { followerid, followedid } = req.body;
    // const { followerid, followedid } = req.params;

    const followedAlready = await pool.query(
      `SELECT
      CASE WHEN EXISTS
      (
            SELECT * FROM followings WHERE followerid = $1
            AND followedid = $2
      )
      THEN 'TRUE'
      ELSE 'FALSE'
   END`,
      [followerid, followedid]
    );

    let resp;
    let increment;

    if (followedAlready.rows[0].case == "TRUE") {
      resp = await pool.query(
        `DELETE FROM followings WHERE
              $1 = followerID AND
              $2 = followedID`,
        [followerid, followedid]
      );

      increment = -1;
    } else {
      resp = await pool.query(
        `INSERT INTO followings
          (followerID, followedID) VALUES (
              $1, $2)`,
        [followerid, followedid]
      );

      increment = 1;
    }
    updateFollowerCount(followedid, increment);
    updateFollowingCount(followerid, increment);

    res.send({ status: followedAlready.rows[0].case !== "TRUE" });
  } catch (err) {
    console.error(err.message);
  }
});

// * delete a user's account
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);

    res.json("User was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

// * delete a given tweet
app.delete("/tweets/:id/:tweeterid", async (req, res) => {
  try {
    const { id, tweeterid } = req.params;
    const deleteTweet = await pool.query(`DELETE FROM tweets WHERE id = $1`, [
      id,
    ]);
    updateTweetCount(tweeterid, -1);
    res.send("Deleted");
  } catch (err) {
    console.log(err.message);
  }
});

//* fetch a user's profile by id
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await pool.query(
      `SELECT * FROM users WHERE
        id = $1`,
      [id]
    );

    res.json(profile);
  } catch (err) {
    console.log(err.message);
  }
});

//* fetch a user's profile by username
app.get("/users/usernames/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await pool.query(
      `SELECT * FROM users WHERE
        username = $1`,
      [username]
    );

    res.json(profile);
  } catch (err) {
    console.log(err.message);
  }
});

//* fetch all tweets
app.get("/tweets", async (req, res) => {
  try {
    const tweets = await pool.query(
      `SELECT * FROM tweets order BY tweets.id DESC`
    );

    res.json(tweets);
  } catch (err) {
    console.log(err.message);
  }
});

//* fetch a specific user's tweets
app.get("/tweets/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tweets = await pool.query(
      `SELECT * FROM tweets WHERE tweeterID = $1 order BY tweets.id DESC`,
      [id]
    );

    res.json(tweets);
  } catch (err) {
    console.log(err.message);
  }
});

// * get user's home feed (all tweets by accounts followed)
app.get("/tweets/home/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tweets = await pool.query(
      `SELECT * FROM tweets 
      INNER JOIN (SELECT followedid FROM followings WHERE followerid = $1) AS res ON res.followedid = tweets.tweeterID
      order BY tweets.date DESC`,
      [id]
    );

    res.json(tweets);
  } catch (err) {
    console.log(err.message);
  }
});

// * update a user's profile
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, firstname, lastname, bio, imagelink } = req.body;
    const updateProfile = await pool.query(
      `UPDATE users SET 
      username = COALESCE($1, username),
      firstname = COALESCE($2, firstname),
      lastname = COALESCE($3, lastname),
      bio = COALESCE($4, bio), 
      imagelink = COALESCE($5, imagelink)
      WHERE id = $6 RETURNING *`,
      [username, firstname, lastname, bio, imagelink, id]
    );
    res.json(updateProfile);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log(`Server started at port ${port}!`);
});

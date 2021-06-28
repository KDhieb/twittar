const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
// middleware
app.use(cors());
app.use(express.json());

//ROUTES

app.post("/createUser", async (req, res) => {
  try {
    const { username, firstname, lastname, bio, imagelink } = req.body;
    const newUser = await pool.query(
      `INSERT INTO users
     (username, firstname, lastname, bio, imagelink, datejoined) VALUES (
        $1, $2, $3, $4, $5, CURRENT_DATE) RETURNING *`,
      [username, firstname, lastname, bio, imagelink]
    );
    const id = newUser.rows[0].id; // WORKS!
    res.json(newUser.rows);
    console.log(newUser);
    console.log(`NEW USER ID: ${id}`);
  } catch (err) {
    console.error(err.message);
  }
});

// create tweet

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
    res.json(newTweet.rows);
    console.log(newTweet.rows);
    //   console.log(`NEW USER ID: ${id}`);
  } catch (err) {
    console.error(err.message);
  }
});

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

// check if liked

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

    // return likedAlready.rows[0].case == "TRUE";
    // console.log(tweets.rows[0]);
  } catch (err) {
    // console.log(err.message);
  }
});

// //like tweet
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

    console.log(likedAlready);

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

      console.log("Like removed!");
    } else {
      resp = await pool.query(
        `INSERT INTO tweetLikes
          (tweetID, likerID) VALUES (
              $1, $2)`,
        [tweetID, likerID]
      );

      increment = 1;
      console.log("Like added!");
    }
    console.log(`INCREMENT = ${increment}`);
    updateLikeCount(tweetID, increment);

    // res.json(resp);
    res.send({ liked: likedAlready.rows[0].case == "TRUE" });
  } catch (err) {
    console.error(err.message);
  }
});

//like tweet
// app.post("/tweets/like/:tweetid/:likerid", async (req, res) => {
//   try {
//     const { tweetID, likerID } = req.body;
//     // const { tweetid, likerid } = req.params;

//     const likedAlready = await pool.query(
//       `SELECT
//       CASE WHEN EXISTS
//       (SELECT * FROM tweetLikes WHERE tweetID = $1 AND likerID = $2)
//       THEN
//       DELETE FROM tweetLikes WHERE
//       $1 = tweetID AND
//       $2 = likerID AND
//       ELSE
//       INSERT INTO tweetLikes
//       (tweetID, likerID) VALUES ($1, $2)
//       END
//       SELECT
//       CASE WHEN EXISTS
//       (SELECT * FROM tweetLikes WHERE tweetID = $1 AND likerID = $2)
//       THEN
//       1
//       ELSE
//       0
//       END
//       `,
//       [tweetID, likerID]
//     );

//     console.log(likedAlready);

//     let resp;
//     let increment;

//     increment = -1;

//     increment = 1;

//     res.send(likedAlready);

//     console.log(likedAlready.rows[0].case == "TRUE");

//     // res.json(resp);
//     // res.send({ liked: likedAlready.rows[0].case == "TRUE" });
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// follow user
app.post("/users/follow/:followerid/:followedid", async (req, res) => {
  try {
    // const { tweetID, likerID } = req.body;
    const { followerid, followedid } = req.params;

    const followedAlready = await pool.query(
      `SELECT
      CASE WHEN EXISTS
      (
            SELECT * FROM followings WHERE followerID = $1
            AND followedID = $2
      )
      THEN 'TRUE'
      ELSE 'FALSE'
   END`,
      [followerid, followedid]
    );

    console.log(followedAlready);

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

      console.log("Like removed!");
    } else {
      resp = await pool.query(
        `INSERT INTO followings
          (followerID, followedID) VALUES (
              $1, $2)`,
        [followerid, followedid]
      );

      increment = 1;
      console.log("Like added!");
    }
    console.log(`INCREMENT = ${increment}`);
    // updateLikeCount(tweetID, increment);

    // res.json(resp);
    res.send({ followed: followedAlready.rows[0].case == "TRUE" });
  } catch (err) {
    console.error(err.message);
  }
});

// delete a user
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

// delete a tweet
app.delete("/tweets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const { tweetID } = req.body;
    const deleteTweet = await pool.query(`DELETE FROM tweets WHERE id = $1`, [
      id,
    ]);
    res.send("Deleted");
  } catch (err) {
    console.log(err.message);
  }
});

// get profile
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await pool.query(
      `SELECT * FROM users WHERE
        id = $1`,
      [id]
    );

    res.json(profile);
    console.log(profile.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// get tweets
app.get("/tweets", async (req, res) => {
  try {
    //   const { id } = req.params;
    const tweets = await pool.query(
      `SELECT * FROM tweets order BY tweets.id DESC`
    );

    res.json(tweets);
    console.log(tweets.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// get user's tweets
app.get("/tweets/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tweets = await pool.query(
      `SELECT * FROM tweets WHERE tweeterID = $1 order BY tweets.id DESC`,
      [id]
    );

    res.json(tweets);
    console.log(tweets.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// update a profile
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, firstname, lastname, bio, imagelink } = req.body;
    const updateProfile = await pool.query(
      `UPDATE users SET (username, firstname, lastname, bio, imagelink) 
            = ($1, $2, $3, $4, $5) 
            WHERE id = $6 RETURNING *`,
      [username, firstname, lastname, bio, imagelink, id]
    );
    res.json(updateProfile);
    console.log(updateProfile.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// app.get("/getUsers", async (req, res) => {
//   try {
//     // const {tweeterID, tweet} = req.body
//     const newUser = await pool.query(`SELECT * FROM users`, (req, res) => {
//       // console.log(res.rows)
//     });

//     // res.json(newTweet)
//     // console.log(newUser)
//     // return newTweet;
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// app.post("/addTweet", async (req, res) => {
//   try {
//     const { tweeterID, tweet } = req.body;
//     const newTweet = await pool.query(
//       `INSERT INTO tweets
//         (tweeterID, tweet, likes, retweets, date)
//         VALUES ($1, $2, 0, 0, CURRENT_DATE)`,
//       [tweeterID, tweet]
//     );

//     res.json(newTweet);
//     return newTweet;
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//

app.listen(5000, () => {
  console.log("Server started at port 5000!");
});

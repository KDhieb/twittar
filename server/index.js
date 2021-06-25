const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");
// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//ROUTES

// create user

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
    const deleteTweet = await pool.query(`DELETE FROM tweets WHERE id = $1`, [
      id,
    ]);
    res.json("Tweet was deleted");
  } catch (err) {
    console.log(err.message);
  }
});

// get all tweets

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

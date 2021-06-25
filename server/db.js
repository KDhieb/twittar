const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const fs = require("fs");
const { Pool, Client } = require("pg");

var env = process.env;

console.log(process.env.DB_USER);

const config = {
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  database: env.DB_DATABASE,
  port: env.DB_PORT,
};

const pool = new Pool(config);

module.exports = pool;

// Create a connection pool

// const pool = new Pool(config);

// async function initTables(client, callback, obj = {}) {
//   await client.query(
//     `CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY
//         username VARCHAR(20),
//         firstname VARCHAR(20),
//         lastname VARCHAR(20),
//         bio VARCHAR(255),
//         imagelink TEXT,
//         datejoined DATE);`,
//     callback
//   );

//   await client.query(
//     `CREATE TABLE IF NOT EXISTS followings (
//         id SERIAL PRIMARY KEY,
//         followerID INT,
//         followedID INT,
//         FOREIGN KEY(followerID) REFERENCES users(id) ON DELETE CASCADE,
//         FOREIGN KEY(followedID) REFERENCES users(id) ON DELETE CASCADE);`,
//     callback
//   );

//   await client.query(
//     `CREATE TABLE IF NOT EXISTS tweets (
//         id SERIAL PRIMARY KEY,
//         tweeterID INT,
//         tweet VARCHAR(255),
//         likes INT,
//         retweets INT,
//         date DATE,
//         FOREIGN KEY(tweeterID) REFERENCES users(id) ON DELETE CASCADE);`,
//     callback
//   );

//   await client.query(
//     `CREATE TABLE IF NOT EXISTS tweetLikes (
//     id SERIAL PRIMARY KEY,
//     tweetID INT,
//     likerID INT,
//     FOREIGN KEY(tweetID) REFERENCES tweets(id) ON DELETE CASCADE,
//     FOREIGN KEY(likerID) REFERENCES users(id) ON DELETE CASCADE);`,
//     callback
//   );

//   await client.query(
//     `CREATE TABLE IF NOT EXISTS retweets (
//         id SERIAL PRIMARY KEY,
//         tweetID INT,
//         retweeterID INT,
//         FOREIGN KEY(tweetID) REFERENCES tweets(id) ON DELETE CASCADE,
//         FOREIGN KEY(retweeterID) REFERENCES users(id) ON DELETE CASCADE);`,
//     callback
//   );
// }

// TO USE

async function createUser(client, callback, user) {
  const [username, fname, lname, bio, image] = user;
  await client.query(
    `INSERT INTO users
    (username, firstname, lastname, bio, imagelink, datejoined) VALUES (
        ${username}, ${fname}, ${lname}, ${bio}, ${image}, CURRENT_DATE)`,
    callback
  );
}

async function createTweet(client, callback, tweet) {
  const [tweeterID, text, likes, retweets] = tweet;
  await client.query(
    `INSERT INTO tweets
    (tweeterID, tweet, likes, retweets, date) VALUES (
        ${tweeterID}, ${text}, ${likes}, ${retweets}, CURRENT_DATE)`,
    callback
  );
}

async function followUser(client, callback, users) {
  const [followerID, followedID] = users;

  const alreadyFollowing = await client.query(`SELECT
    CASE WHEN EXISTS
    (
          SELECT * FROM followings f WHERE f.followerID = ${followerID}
          AND f.followedID = ${followedID}
    )
    THEN 'TRUE'
    ELSE 'FALSE'
 END;`);

  if (alreadyFollowing) {
    await client.query(
      `DELETE FROM followings WHERE
            ${followerID} = followings.followerID AND
            ${followedID} = followings.followedID`,
      callback
    );
    console.log("Unfollowed!");
  } else {
    await client.query(
      `INSERT INTO followings
        (followerID, followedID) VALUES (
            ${followerID}, ${followedID}`,
      callback
    );

    console.log("Following now!");
  }
}

async function likeTweet(client, callback, info) {
  const [tweetID, likerID] = info;

  const likedAlready = await client.query(`SELECT
    CASE WHEN EXISTS
    (
          SELECT * FROM tweetLikes WHERE tweetLikes.tweetID = ${tweetID}
          AND tweetLikes.likerID = ${likerID}
    )
    THEN 'TRUE'
    ELSE 'FALSE'
 END;`);

  alert(typeof likedAlready);

  if (likedAlready) {
    await client.query(
      `DELETE FROM tweetLikes WHERE
            ${tweetID} = tweetLikes.tweetID AND
            ${likerID} = tweetLikes.likerID`,
      callback
    );

    console.log("Like removed!");
  } else {
    await client.query(
      `INSERT INTO followings
        (tweetID, likerID) VALUES (
            ${tweetID}, ${likerID}`,
      callback
    );
    console.log("Like added!");
  }
}

async function retweet(client, callback, info) {
  const [tweetID, retweeterID] = info;

  const retweetedAlready = await client.query(`SELECT
    CASE WHEN EXISTS
    (
          SELECT * FROM retweets WHERE retweets.tweetID = ${tweetID}
          AND retweets.retweeterID = ${retweeterID}
    )
    THEN 'TRUE'
    ELSE 'FALSE'
 END;`);

  alert(typeof retweetedAlready);

  if (retweetedAlready) {
    await client.query(
      `DELETE FROM retweets WHERE
            ${tweetID} = retweets.tweetID AND
            ${retweeterID} = retweets.retweeterID`,
      callback
    );
    console.log("removed retweet!");
  } else {
    await client.query(
      `INSERT INTO retweets
        (tweetID, retweeterID) VALUES (
            ${tweetID}, ${retweeterID}`,
      callback
    );
    console.log("retweeted!");
  }
}

async function fetchUser(client, callback, id) {
  await client.query(
    `SELECT * FROM users WHERE
        id = ${id}`,
    callback
  );
}

async function fetchExploreTweets(client, callback, obj) {
  await client.query(`select * from tweets order BY tweets.date ASC`, callback);
}

// TODO: find all follower tweets and return
// async function fetchFeedTweets(client, callback, id) {
//     await client.query(`select * from tweets order BY tweets.date ASC`,
//         callback
//     );
// }

// const client = new Client()
// await client.connect()

// module.exports = {
//     initTables: initTables,
//     createUser: createUser,
//     createTweet: createTweet,
//     followUser: followUser,
//     retweet: retweet,
//     fetchUser: fetchUser,
//     fetchExploreTweets: fetchExploreTweets
// }

CREATE DATABASE twittar;

CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         username VARCHAR(20),
         firstname VARCHAR(20),
         lastname VARCHAR(20),
         bio VARCHAR(255),
         imagelink TEXT,
         email VARCHAR(50),
         tweets INT DEFAULT 0,
         followers INT DEFAULT 0,
         following INT DEFAULT 0,
         datejoined DATE,
         UNIQUE (username));

CREATE TABLE IF NOT EXISTS tweets (
        id SERIAL PRIMARY KEY,
        tweeterID INT,
        tweet VARCHAR(255),
        likes INT,
        retweets INT,
        date DATE,
        FOREIGN KEY(tweeterID) REFERENCES users(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS tweetLikes (
    id SERIAL PRIMARY KEY,
    tweetID INT,
    likerID INT,
    FOREIGN KEY(tweetID) REFERENCES tweets(id) ON DELETE CASCADE,
    FOREIGN KEY(likerID) REFERENCES users(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS followings (
        id SERIAL PRIMARY KEY,
        followerID INT,
        followedID INT,
        FOREIGN KEY(followerID) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(followedID) REFERENCES users(id) ON DELETE CASCADE);
        
CREATE TABLE IF NOT EXISTS retweets (
        id SERIAL PRIMARY KEY,
        tweetID INT,
        retweeterID INT,
        FOREIGN KEY(tweetID) REFERENCES tweets(id) ON DELETE CASCADE,
        FOREIGN KEY(retweeterID) REFERENCES users(id) ON DELETE CASCADE);


-- example: insert a new user
      INSERT INTO users
     (username, firstname, lastname, bio, imagelink, email, datejoined) VALUES (
        'testtweeter1', 'Bob', 'Smith', 'Testing', 'https://imgur.com/gallery/oPUjMTX','likemikekd@hotmail.com', CURRENT_DATE) RETURNING *;





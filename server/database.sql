CREATE DATABASE twittar;

CREATE TABLE IF NOT EXISTS users (
         id SERIAL PRIMARY KEY,
         username VARCHAR(20),
         firstname VARCHAR(20),
         lastname VARCHAR(20),
         bio VARCHAR(255),
         imagelink TEXT,
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






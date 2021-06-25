CREATE DATABASE twittar;

CREATE TABLE IF NOT EXISTS followings (
    id SERIAL PRIMARY KEY, 
    followerID INT, 
    followedID INT, 
    FOREIGN KEY(followerID) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(followedID) REFERENCES users(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS tweets (
    id SERIAL PRIMARY KEY,
    tweeterID INT,
    tweet VARCHAR(255),
    likes INT,
    retweets INT,
    date DATE,
    FOREIGN KEY(tweeterID) REFERENCES users(id) ON DELETE CASCADE);




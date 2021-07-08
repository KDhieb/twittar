// API Request methods

const defaultImageLink = process.env.REACT_APP_S3_DEFAULT_IMG_URL;

const prefix =
  process.env.NODE_ENV === "production"
    ? "https://gotwittar.herokuapp.com"
    : "http://localhost:3000";

// const prefix = "http://localhost:8080";

const fetchUserId = async (username) => {
  try {
    const response = await fetch(`${prefix}/users/usernames/${username}`);
    const data = await response.json();
    return data.rows[0].id;
  } catch (err) {
    console.log(err);
  }
};

const fetchProfile = async (id) => {
  try {
    const response = await fetch(`${prefix}/users/${id}`);
    const data = await response.json();
    return data.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const fetchTweets = async () => {
  try {
    const response = await fetch(`${prefix}/tweets`);
    const data = await response.json();
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

const fetchUserTweets = async (id) => {
  try {
    const response = await fetch(`${prefix}/tweets/user/${id}`);
    const data = await response.json();
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

const fetchHomeTweets = async (id) => {
  try {
    const response = await fetch(`${prefix}/tweets/home/user/${id}`);
    const data = await response.json();
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

const addTweet = async (id, text) => {
  try {
    const response = await fetch(`${prefix}/addTweet`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tweeterID: id,
        tweet: text,
        likes: 0,
        retweets: 0,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

const isLiked = async (tweetID, likerID) => {
  try {
    const likedAlready = await fetch(
      `${prefix}/tweets/liked/${tweetID}/${likerID}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await likedAlready.json();

    return data.response;
  } catch (err) {
    console.log(err);
  }
};

const likeTweet = async (tweetID, likerID) => {
  try {
    const response = await fetch(
      `${prefix}/tweets/like/${tweetID}/${likerID}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tweetID: tweetID,
          likerID: likerID,
        }),
      }
    );
    const liked = await response.json();
    return liked.liked;
  } catch (err) {
    console.log(err);
  }
};

const deleteTweet = async (tweetID, tweeterID) => {
  try {
    await fetch(`${prefix}/tweets/${tweetID}/${tweeterID}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    return;
  } catch (err) {
    console.log(err);
  }
};

const isFollowing = async (followerID, followedID) => {
  try {
    const followedAlready = await fetch(
      `${prefix}/users/follow/${followerID}/${followedID}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await followedAlready.json();
    return data.response;
  } catch (err) {
    console.log(err);
  }
};

const followUser = async (followerID, followedID) => {
  try {
    const response = await fetch(`${prefix}/users/follow`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followerid: followerID,
        followedid: followedID,
      }),
    });
    const followed = await response.json();
    return followed.status;
  } catch (err) {
    console.log(err);
  }
};

// TODO
const isRetweeted = async (tweetID, retweeterID) => {};

// TODO
const retweetTweet = async (tweetID, retweeterID) => {};

const updateProfile = async (
  userID,
  bio = null,
  imagelink = null,
  firstname = null,
  lastname = null
) => {
  try {
    const response = await fetch(`${prefix}/users/${userID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bio: bio,
        imagelink: imagelink,
        firstname: firstname,
        lastname: lastname,
      }),
    });
    const updated = await response.json();
    return updated;
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (username, email) => {
  try {
    const response = await fetch(`${prefix}/createUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        firstname: null,
        lastname: null,
        bio: "I've just created a #twittar profile!",
        imagelink: defaultImageLink,
      }),
    });

    const idObj = await response.json();
    return idObj.id;
  } catch (err) {
    console.log(err);
  }
};

export {
  fetchProfile,
  fetchTweets,
  fetchUserTweets,
  fetchHomeTweets,
  addTweet,
  isLiked,
  likeTweet,
  isFollowing,
  followUser,
  deleteTweet,
  updateProfile,
  createUser,
  fetchUserId,
};

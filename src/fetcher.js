const fetchProfile = async (id) => {
  const response = await fetch(`http://localhost:5000/users/${id}`);
  const data = await response.json();
  return data.rows[0];
};

const fetchTweets = async () => {
  const response = await fetch("http://localhost:5000/tweets");
  const data = await response.json();
  return data.rows;
};

const fetchUserTweets = async (id) => {
  const response = await fetch(`http://localhost:5000/tweets/user/${id}`);
  const data = await response.json();
  return data.rows;
};

const addTweet = async (id, text) => {
  const response = await fetch("http://localhost:5000/addTweet", {
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
};

const isLiked = async (tweetID, likerID) => {
  const likedAlready = await fetch(
    `http://localhost:5000/tweets/liked/${tweetID}/${likerID}`,
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
};

const likeTweet = async (tweetID, likerID) => {
  const response = await fetch(
    `http://localhost:5000/tweets/like/${tweetID}/${likerID}`,
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
};

export {
  fetchProfile,
  fetchTweets,
  fetchUserTweets,
  addTweet,
  isLiked,
  likeTweet,
};

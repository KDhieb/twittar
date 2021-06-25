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

  console.log(response);
};

export { fetchProfile, fetchTweets, fetchUserTweets, addTweet };

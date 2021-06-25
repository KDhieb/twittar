import "../css/components.css";
import { useState } from "react";

import Tweet from "./Tweet";

const Tweets = () => {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    const response = await fetch("http://localhost:5000/tweets");
    const data = await response.json();
    console.log(data.rows);
    setTweets(data.rows);
  };

  if (tweets === []) fetchTweets();

  if (tweets.length == 0) {
    fetchTweets();
  }

  return (
    <div className="tweets">
      {tweets.map((aTweet) => (
        <Tweet key={aTweet.id} tweet={aTweet}></Tweet>
      ))}
    </div>
  );
};

export default Tweets;

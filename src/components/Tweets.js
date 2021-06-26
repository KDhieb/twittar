import "../css/components.css";
import { useState, useEffect } from "react";
import { fetchTweets } from "../fetcher";

import Tweet from "./Tweet";

const Tweets = ({ tweets, authUserID }) => {
  // const [tweets, setTweets] = useState([]);

  // useEffect(() => {
  //   fetchTweets().then((data) => {
  //     setTweets(data);
  //   });
  // }, []);

  return (
    <div className="tweets">
      {tweets.map((aTweet) => (
        <Tweet key={aTweet.id} tweet={aTweet} authUserID={authUserID}></Tweet>
      ))}
    </div>
  );
};

export default Tweets;

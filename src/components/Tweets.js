import "../css/components.css";
// import { useState, useEffect } from "react";
// import { fetchTweets } from "../fetcher";

import Tweet from "./Tweet";

const Tweets = ({ tweets, authUserID, forceUpdate }) => {
  return (
    <div className="tweets">
      {tweets.map((aTweet) => (
        <Tweet
          key={aTweet.id}
          tweet={aTweet}
          authUserID={authUserID}
          forceUpdate={forceUpdate}
        ></Tweet>
      ))}
    </div>
  );
};

export default Tweets;

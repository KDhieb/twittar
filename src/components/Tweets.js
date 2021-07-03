import "../css/components.css";
// import { useState, useEffect } from "react";
// import { fetchTweets } from "../fetcher";

import Tweet from "./Tweet";

const Tweets = ({ tweets, authUserID, forceUpdate, onDelete }) => {
  const noTweetsMsg = "No Tweets to display!";

  return (
    <div className="tweets">
      {tweets.map((aTweet) => (
        <Tweet
          key={aTweet.id}
          tweet={aTweet}
          authUserID={authUserID}
          forceUpdate={forceUpdate}
          onDelete={onDelete}
        ></Tweet>
      ))}

      {tweets.length == 0 && <h2>{noTweetsMsg}</h2>}
    </div>
  );
};

export default Tweets;

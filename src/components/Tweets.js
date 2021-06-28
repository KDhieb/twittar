import "../css/components.css";
// import { useState, useEffect } from "react";
// import { fetchTweets } from "../fetcher";

import Tweet from "./Tweet";

const Tweets = ({ tweets, authUserID, forceUpdate, onDelete }) => {
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
    </div>
  );
};

Tweets.defaultProps = {
  onDelete: () => {
    console.log("on delete default function");
  },
};

export default Tweets;

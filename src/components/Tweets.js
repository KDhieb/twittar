import "../css/components.css";

import Tweet from "./Tweet";

const Tweets = ({ tweets }) => {
  return (
    <div className="tweets">
      {tweets.map((aTweet) => (
        <Tweet key={aTweet.tweetid} tweet={aTweet}></Tweet>
      ))}
    </div>
  );
};

export default Tweets;

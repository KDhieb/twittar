import { Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import DisplayPicture from "./DisplayPicture";
import { fetchProfile, isLiked, likeTweet } from "../fetcher";

import "../css/components.css";

const Tweet = ({ tweet, authUserID }) => {
  const { id, tweeterid, date, likes, retweets } = tweet;
  const text = tweet.tweet;
  const [username, setUsername] = useState(null);
  const [dp, setDp] = useState("dp-blank.png");
  const [likeObj, setLikeObj] = useState({ state: false, count: likes });

  useEffect(async () => {
    fetchProfile(tweeterid).then((data) => {
      setUsername(data.username);
      setDp(data.imagelink);
    });
    isLiked(id, authUserID).then((data) => {
      setLikeObj({ state: data, count: likes });
    });
  }, []);

  const onClickLike = () => {
    likeTweet(id, authUserID).then((data) => {
      console.log(`data: ${data}`);
      if (data) {
        setLikeObj({ state: !data, count: likeObj.count - 1 });
      } else {
        setLikeObj({ state: !data, count: likeObj.count + 1 });
      }
    });
  };

  return (
    <div className="tweet card">
      <DisplayPicture
        src={`${process.env.PUBLIC_URL}/assets/images/${dp}`}
        alt="Display picture"
        classname="grid-item tweet-dp dp"
      />
      <Link
        className="grid-item tweet-username"
        to={`/users/${tweeterid}`}
        exact
      >
        {`@${username}`}{" "}
      </Link>
      <p className="grid-item tweet-date">
        {new Date(date).toLocaleDateString()}
      </p>
      &nbsp;
      <p className="grid-item tweet-text">{text}</p>
      <p className="grid-item tweet-bar">
        <button className="tweet-like-button" onClick={onClickLike}>
          {" "}
          {likeObj.state ? (
            <BsHeartFill style={{ color: "red" }} size={20} />
          ) : (
            <BsHeart size={20} />
          )}{" "}
        </button>
        {` ${likeObj.count}`}
      </p>
    </div>
  );
};

Tweet.defaultProps = {
  tweetid: 1,
  tweeterid: 1,
  dp: "../images/dp1.jpg",
  username: "@irstUser123",
  text: "This is a tweet's body",
  date: "June 21 2021",
  liked: false,
  likes: 51,
  retweeted: false,
};

export default Tweet;

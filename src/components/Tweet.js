import { Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useState } from "react";

import "../css/components.css";
import DisplayPicture from "./DisplayPicture";

const Tweet = ({ tweet }) => {
  const { tweeterid, date, likes, retweets } = tweet;
  const text = tweet.tweet;
  const [username, setUsername] = useState(null);
  const [dp, setDp] = useState("dp-blank.png");
  const [liked, setLiked] = useState(false);

  const fetchProfile = async () => {
    const response = await fetch(`http://localhost:5000/users/${tweeterid}`);
    const data = await response.json();
    console.log(data.rows);
    setUsername(data.rows[0].username);
    setDp(data.rows[0].imagelink);
  };

  if (!username) fetchProfile();

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
        <button className="tweet-like-button" onClick={console.log("heart!!")}>
          {" "}
          {liked ? <BsHeartFill size={20} /> : <BsHeart size={20} />}{" "}
        </button>
        {` ${likes}`}
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

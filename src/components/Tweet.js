import { Link } from "react-router-dom";

import "../css/components.css";
import DisplayPicture from "./DisplayPicture";

const Tweet = ({ tweet }) => {
  const { dp, tweeterid, username, date, text, liked, likes, retweeted } =
    tweet;

  {
    console.log(`${process.env.PUBLIC_URL}/assets/images/dp1.png`);
  }
  return (
    <div className="tweet">
      <DisplayPicture
        src={`${process.env.PUBLIC_URL}/assets/images/${dp}`}
        alt="Display picture"
        classname="grid-item tweet-dp"
      />
      <a
        className="grid-item tweet-username"
        href={`/users/${tweeterid}`}
      >{`@${username}`}</a>
      <p className="grid-item tweet-date">{date}</p>
      &nbsp;
      <p className="grid-item tweet-text">{text}</p>
      <p className="grid-item tweet-bar">{`Liked:${liked} Likes: ${likes} Retweeted:${retweeted}`}</p>
    </div>
  );
};

// Tweet.defaultProps = {
//   tweetid: 1,
//   tweeterid: 1,
//   dp: "../images/dp1.jpg",
//   username: "@irstUser123",
//   text: "This is a tweet's body",
//   date: "June 21 2021",
//   liked: false,
//   likes: 51,
//   retweeted: false,
// };

export default Tweet;

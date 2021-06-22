import { Link } from "react-router-dom";

import DisplayPicture from "./DisplayPicture"
import Tweets from "./Tweets"


const Profile = ({id, dp, authUserId}) => {

const tweets = [
    {
      tweetid: 1,
      tweeterid: 1,
      dp: "dp1.jpg",
      username: "firstUser123",
      text: "I just attended a group wedding for people who have been waiting years to get married. Just wow. #equality #lovewins",
      date: "June 21 2021",
      liked: false,
      likes: 51,
      retweeted: false,
    },
    {
      tweetid: 2,
      tweeterid: 2,
      dp: "dp2.jpg",
      username: "secondUser123",
      text: "All these automated DMs wasting my time :) I get 100 per day at least. Here's a 4-second loop for your enjoyment. LOL pic.twitter.com/jOkebqXb5q",
      date: "June 19 2021",
      liked: true,
      likes: 120,
      retweeted: false,
    },
    {
      tweetid: 3,
      tweeterid: 3,
      dp: "dp4.jpg",
      username: "thirdUser123",
      text: "My #SocialMedia seniors book in 1200+ stores in Canada, next to #1 best seller by Harper Lee. TY @ShopprsDrugMart",
      date: "June 20 2021",
      liked: true,
      likes: 87,
      retweeted: true,
    },
  ];



    return (
        <>
        <div className="profile">
        <DisplayPicture
        src={`${process.env.PUBLIC_URL}/assets/images/${dp}`}
        alt="Display picture"
        classname="grid-item profile-dp dp"
      />
       <p className="profile-username">@username</p>

      <p className="profile-bio">This is my bio! Welcome to my profile.</p>  

      <div className="grid-item profile-tabs nav nav-tabs">
      <Link className="nav-link">Tweets</Link>
      <Link className="nav-link">Likes</Link>
      <Link className="nav-link">Followers</Link>
      <Link className="nav-link">Following</Link>
      </div>  
      
      <div className="grid-item profile-buttons">
      {authUserId === id ? <Link className="btn btn-default bg-light text-dark border border-secondary">Edit</Link> : <Link className="btn btn-default bg-light text-dark border border-secondary">Follow</Link>}
      </div> 

        </div>
        <Tweets tweets={tweets}></Tweets>
        </>
    )
}

Profile.defaultProps = {
    id: 1,
    dp: "dp1.jpg",
    authUserId: 2
}

export default Profile

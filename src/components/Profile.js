import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DisplayPicture from "./DisplayPicture";
import Tweets from "./Tweets";
// import isEmpty from "../utility";
import {
  fetchProfile,
  fetchUserTweets,
  checkIfFollowing,
  followUser,
} from "../fetcher";

const Profile = ({ dp, authUserID, forceUpdate }) => {
  let { id } = useParams();

  const [profile, setProfile] = useState({});
  const [imagelink, setImagelink] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [userTweets, setUserTweets] = useState([]);
  const [following, setFollowing] = useState([false]);

  useEffect(async () => {
    await fetchProfile(id).then((data) => {
      setProfile(data);
      setImagelink(data.imagelink);
      setUsername(data.username);
      setBio(data.bio);
    });

    if (id != authUserID) {
      await checkIfFollowing(authUserID, id).then((data) => {
        setFollowing(data);
      });
    }

    await fetchUserTweets(id).then((data) => {
      setUserTweets(data);
    });
  }, []);

  const onClickFollow = async (followerID, followedID) => {
    alert("following");
    await followUser(authUserID, id).then((data) => {
      setFollowing(data);
    });
  };

  return (
    <>
      <div className="profile">
        <DisplayPicture
          src={`${process.env.PUBLIC_URL}/assets/images/${imagelink}`}
          alt="Display picture"
          classname="grid-item profile-dp dp"
        />
        <p className="profile-username">@{username}</p>

        <p className="profile-bio">{bio}</p>

        <div className="grid-item profile-tabs nav nav-tabs">
          <Link className="nav-link">Tweets</Link>
          <Link className="nav-link">Likes</Link>
          <Link className="nav-link">Followers</Link>
          <Link className="nav-link">Following</Link>
        </div>

        <div className="grid-item profile-buttons">
          {authUserID === parseInt(id) ? (
            <Link className="btn btn-default bg-light text-dark border border-secondary">
              Edit
            </Link>
          ) : (
            <Link
              className="btn btn-default bg-light text-dark border border-secondary"
              onClick={() => {
                onClickFollow(authUserID, parseInt(id));
              }}
            >
              {following ? "Unfollow" : "Follow"}
            </Link>
          )}
        </div>
      </div>
      <Tweets
        tweets={userTweets}
        authUserID={authUserID}
        forceUpdate={forceUpdate}
      ></Tweets>
    </>
  );
};

Profile.defaultProps = {
  id: 1,
  dp: "dp1.jpg",
  authUserId: 2,
};

export default Profile;

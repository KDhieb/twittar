import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DisplayPicture from "./DisplayPicture";
import Tweets from "./Tweets";

import {
  fetchProfile,
  fetchUserTweets,
  isFollowing,
  followUser,
  updateProfile,
} from "../fetcher";

const Profile = ({ dp, authUserID, forceUpdate }) => {
  let { id } = useParams();

  const [profile, setProfile] = useState({});
  const [followerCount, setFollowerCount] = useState([0]);
  const [followingCount, setFollowingCount] = useState([0]);
  const [tweetCount, setTweetCount] = useState([0]);
  const [imagelink, setImagelink] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [userTweets, setUserTweets] = useState([]);
  const [followingStatus, setFollowingStatus] = useState([false]);
  const [update, setUpdate] = useState([false]);
  const [editing, setEditing] = useState(false);

  useEffect(async () => {
    await fetchProfile(id).then((data) => {
      setProfile(data);
      setImagelink(data.imagelink);
      setUsername(data.username);
      setBio(data.bio);
      setFollowerCount([data.followers]);
      setFollowingCount([data.following]);
      setTweetCount([data.tweets]);
      setFullname(`${data.firstname} ${data.lastname}`);
    });

    if (id != authUserID) {
      await isFollowing(authUserID, id).then((data) => {
        setFollowingStatus(data);
      });
    }

    await fetchUserTweets(id).then((data) => {
      setUserTweets(data);
    });
  }, [update]);

  const onClickFollow = async () => {
    await followUser(authUserID, id).then((data) => {
      setFollowingStatus(data);
    });
  };

  const onDelete = () => {
    setUpdate([!update]);
  };

  const handleEdit = () => {
    setEditing(!editing);
    if (editing) {
      updateProfile(id, bio, imagelink);
    }
  };

  return (
    <>
      <div className="profile">
        <DisplayPicture
          src={`${process.env.PUBLIC_URL}/assets/images/${imagelink}`}
          alt="Display picture"
          classname="grid-item profile-dp dp"
        />
        <p className="profile-username">
          {" "}
          {fullName} | @{username}
        </p>

        {editing ? (
          <textarea
            className="profile-bio"
            id="bio"
            // defaultValue={bio}
            value={bio}
            style={{ maxWidth: "80%" }}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        ) : (
          <p className="profile-bio" id="bio">
            {bio}
          </p>
        )}

        <div className="grid-item profile-tabs nav nav-tabs">
          <Link className="nav-link">Tweets: {tweetCount}</Link>
          {/* <Link className="nav-link">Likes</Link> */}
          <Link className="nav-link">Followers: {followerCount}</Link>
          <Link className="nav-link">Following: {followingCount}</Link>
        </div>

        <div className="grid-item profile-buttons">
          {authUserID === parseInt(id) ? (
            <Link
              className="btn btn-default bg-light text-dark border border-secondary"
              onClick={handleEdit}
            >
              {editing ? "Save" : "Edit"}
            </Link>
          ) : (
            <Link
              className="btn btn-default bg-light text-dark border border-secondary"
              onClick={() => {
                onClickFollow(authUserID, parseInt(id));
              }}
            >
              {followingStatus ? "Unfollow" : "Follow"}
            </Link>
          )}
        </div>
      </div>
      <Tweets
        tweets={userTweets}
        authUserID={authUserID}
        forceUpdate={forceUpdate}
        onDelete={onDelete}
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

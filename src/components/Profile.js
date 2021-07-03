import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DisplayPicture from "./DisplayPicture";
import Tweets from "./Tweets";
import Amplify, { Auth, Storage } from "aws-amplify";
// import Amplify, { Storage } from "aws-amplify";
// require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [newImageURL, setNewImageURL] = useState(null);

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

    if (id !== authUserID[0]) {
      await isFollowing(authUserID[0], id).then((data) => {
        setFollowingStatus(data);
      });
    }

    if (id) {
      await fetchUserTweets(id).then((data) => {
        setUserTweets(data);
      });
    }
  }, [update]);

  useEffect(async () => {
    const uniqueKey = `${username}-DP`;
    const base = await process.env.REACT_APP_S3_IMAGE_BASE_URL;
    const imageURL = `${base}/${uniqueKey}`;

    await Storage.put(uniqueKey, selectedFile).then((resp) => {
      // alert("STORED");
      setNewImageURL(imageURL);
      setImagelink("");
      setImagelink(newImageURL);
      updateProfile(id, bio, newImageURL);
      setSelectedFile(null);
      setUpdate([!update[0]]);
    });
  }, [newImageURL]);

  const onClickFollow = async () => {
    if (authUserID[0])
      await followUser(authUserID[0], id).then((data) => {
        setFollowingStatus(data);
      });
    else alert("Signup to follow users!");
  };

  const onDelete = () => {
    setUpdate([!update]);
  };

  const handleEdit = async () => {
    setEditing(!editing);
    if (editing) {
      await imageUploadHandler();
    }
  };

  const imageSelectedHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const imageUploadHandler = async () => {
    if (selectedFile) {
      const uniqueKey = `${username}-DP`;
      const base = await process.env.REACT_APP_S3_IMAGE_BASE_URL;
      const imageURL = `${base}/${uniqueKey}`;

      setNewImageURL(imageURL);
    }
  };

  return (
    <>
      <div className="profile">
        <DisplayPicture
          key={imagelink}
          src={imagelink}
          alt="Display picture"
          classname="grid-item profile-dp dp"
          update={update}
        />

        {editing && <input type="file" onChange={imageSelectedHandler} />}

        <p className="profile-username"> @{username}</p>

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
          {authUserID[0] === parseInt(id) ? (
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
                onClickFollow(authUserID[0], parseInt(id));
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

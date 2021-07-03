import "../css/components.css";
import { Link, withRouter, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import { AmplifySignOut } from "@aws-amplify/ui-react";

import { Auth } from "aws-amplify";

const Navbar = ({
  authUserID,
  forceUpdate,
  authState,
  handleAuthStateChange,
  handleSignoutCallback,
  updateChild,
}) => {
  const [authUserUsername, setAuthUserUsername] = useState("");
  const [forceUpdateNavbar, setForceUpdateNavbar] = useState();

  let history = useHistory();

  useEffect(async () => {
    let userInfo = await Auth.currentAuthenticatedUser();
    setAuthUserUsername(userInfo.username);
    setForceUpdateNavbar(updateChild);
  }, [updateChild]);

  const onSignout = async () => {
    await Auth.signOut().then((res) => {});
  };

  const handleSignout = async (e) => {
    handleAuthStateChange(e);
    setAuthUserUsername(null);
    handleSignoutCallback();
    history.push("/login");
    forceUpdate();
  };

  return (
    <div className="navbar">
      <h1 className="navbar-logo">
        <Link to={authUserID[0] ? "/" : "/explore"} exact>
          <img
            className="navbar-logo"
            src={`${process.env.PUBLIC_URL}/assets/images/twittar_white.png`}
          ></img>
        </Link>
      </h1>
      <div className="navbar-buttons">
        {authUserUsername && (
          <Link
            className="navbar-item nav-link"
            to="/"
            text="Home"
            onClick={forceUpdate}
          >
            Home
          </Link>
        )}

        <Link
          className="navbar-item nav-link"
          to="/explore"
          text="Explore"
          onClick={forceUpdate}
        >
          Explore
        </Link>

        {authUserUsername && (
          <Link className="navbar-item nav-link" to={`/users/${authUserID}`}>
            Profile
          </Link>
        )}

        {authUserUsername && (
          <AmplifySignOut handleAuthStateChange={handleSignout} />
        )}

        {!authUserUsername && (
          <Link className="navbar-item nav-link" to={`/login`}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default withRouter(Navbar);

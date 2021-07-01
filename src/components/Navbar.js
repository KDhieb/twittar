import "../css/components.css";
import Button from "./Button";
import { Link } from "react-router-dom";

import {
  withAuthenticator,
  AmplifySignOut,
  AmplifyAuthenticator,
} from "@aws-amplify/ui-react";

import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";

const Navbar = (props) => {
  const onSignout = async () => {
    await Auth.signOut().then((res) => {
      alert(`Result from signout: ${res}`);
    });
  };

  return (
    <div className="navbar">
      <h1 className="navbar-logo">
        <Link to="/" exact>
          <img
            className="navbar-logo"
            src={`${process.env.PUBLIC_URL}/assets/images/twittar_white.png`}
          ></img>
        </Link>
      </h1>
      <div className="navbar-buttons">
        <Link
          className="navbar-item nav-link"
          to="/"
          text="Home"
          onClick={props.forceUpdate}
        >
          Home
        </Link>
        <Link
          className="navbar-item nav-link"
          to="/explore"
          text="Explore"
          onClick={props.forceUpdate}
        >
          Explore
        </Link>
        <Link className="navbar-item nav-link" to={`/users/${props.id}`}>
          Profile
        </Link>
        <Link className="navbar-item nav-link" to="/auth">
          {/* <AmplifyAuthenticator> */}
          <AmplifySignOut handleAuthStateChange={onSignout} />
          {/* <AmplifyAuthenticator /> */}
        </Link>
        <Link className="navbar-item nav-link">Welcome, User {props.id}</Link>
      </div>
    </div>
  );
};

export default Navbar;

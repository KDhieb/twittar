import "../css/components.css";
import Button from "./Button";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <h1 className="navbar-logo">
        <Link to="/" exact>
          Twittar Lite
        </Link>
      </h1>
      <div className="navbar-buttons">
        <Link className="navbar-item" to="/" text="Home">
          Home
        </Link>
        <Link className="navbar-item" to="/explore" text="Explore">
          Explore
        </Link>
        <Link className="navbar-item" to="/users/1">
          Profile
        </Link>
        <Link className="navbar-item" to="/auth">
          Logout
        </Link>
        <p className="navbar-item">Welcome, user {props.id}</p>
      </div>
    </div>
  );
};

export default Navbar;

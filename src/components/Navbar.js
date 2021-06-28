import "../css/components.css";
import Button from "./Button";
import { Link } from "react-router-dom";

const Navbar = (props) => {
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
        <Link className="navbar-item nav-link" to="/" text="Home">
          Home
        </Link>
        <Link className="navbar-item nav-link" to="/explore" text="Explore">
          Explore
        </Link>
        <Link className="navbar-item nav-link" to={`/users/${props.id}`}>
          Profile
        </Link>
        <Link className="navbar-item nav-link" to="/auth">
          Logout
        </Link>
        <Link className="navbar-item nav-link">Welcome, User {props.id}</Link>
      </div>
    </div>
  );
};

export default Navbar;

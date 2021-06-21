import "../css/components.css";
import Button from "./Button";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>
        <a href="/">Navbar - Twitter Lite</a>
      </h1>
      <div>
        <Button text="Home" />
        <Button text="Explore" />
        <Button text="Profile" />
        <Button text="Log out" />
      </div>
    </div>
  );
};

export default Navbar;

import "../css/components.css";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="grid-item footer-about">
        <h2 className="text-center">About Twittar</h2>
        <p>
          This is a personal project made to create a Twitter-like application
          for self-learning. Built with &#9829; using React!
        </p>
      </div>

      <div className="grid-item footer-copyright text-center">
        <p>Copyright &copy; 2021 - Khalid Dhieb</p>

        <a
          className=""
          href="https://github.com/KDhieb/twittar.git"
          target="_blank"
        >
          <FaGithub size={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

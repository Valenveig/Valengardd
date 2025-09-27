import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Valengardd</p>
      <div className="social-icons">
        <a href="#"><FaGithub /></a>
        <a href="#"><FaLinkedin /></a>
        <a href="#"><FaInstagram /></a>
      </div>
    </footer>
  );
}

export default Footer;

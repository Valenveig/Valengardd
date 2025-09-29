import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Valengardd</p>
      <div className="social-icons">
        <a 
          href="https://github.com/Valenveig" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a 
          href="https://www.linkedin.com/in/valentina-gomes-8b49a61a3" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}

export default Footer;


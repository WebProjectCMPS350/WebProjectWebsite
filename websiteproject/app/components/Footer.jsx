import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2025 QU Student Management. All rights reserved.</p>

        <ul className="socials">
          <li>
            <a href="#" title="Soon...">
              <i className="fa-brands fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="#" title="Soon...">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#" title="Soon...">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#" title="Soon...">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a href="#" title="Soon...">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </li>
          <li>
            <a
              title="Check the website repo on GitHub"
              href="https://github.com/WebProjectCMPS350/WebProjectWebsite"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
          <li>
            <a href="#" title="Soon...">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

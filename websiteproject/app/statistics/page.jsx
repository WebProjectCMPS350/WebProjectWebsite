import React from "react";

export default function page() {
  return (
    <div className="container">
      <header>
        <a className="changable-link" href="#">
          <h1>QU Student Management</h1>
        </a>

        <nav>
          <ul>
            <li>
              <a href="about-us.html">About us</a>
            </li>
            <li>
              <a href="contact-us.html">Contact us</a>
            </li>
            <li>
              <a className="changable-link" href="#">
                Main page
              </a>
            </li>
            <li>
              <a href="login-page.html" id="logout">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="statistics">
          <h2>Statistics</h2>
          <div className="statistics-content">
            <div className="statistic">
              <h3>Total Students</h3>
              <p>1500</p>
            </div>
            <div className="statistic">
              <h3>Total Courses</h3>
              <p>50</p>
            </div>
            <div className="statistic">
              <h3>Total Faculty</h3>
              <p>100</p>
            </div>
            <div className="statistic">
              <h3>The total of students per course: </h3>
              <p>10</p>
            </div>
            <div className="statistic">
              <h3>Average GPA</h3>
              <p>3.5</p>
            </div>
            <div className="statistic">
              <h3>Total Graduates</h3>
              <p>300</p>
            </div>
            <div className="statistic">
              <h3>The top 3 courses taken by the students: </h3>
              <p>50</p>
            </div>
            <div className="statistic">
              <h3>The failure rate per course: </h3>
              <p>Engineering</p>
            </div>
            <div className="statistic">
              <h3>Most popular course</h3>
              <p>Computer Science</p>
            </div>
            <div className="statistic">
              <h3>Average Class Size per Course Category: </h3>
              <p>Engineering</p>
            </div>
          </div>
        </div>
      </main>
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
    </div>
  );
}

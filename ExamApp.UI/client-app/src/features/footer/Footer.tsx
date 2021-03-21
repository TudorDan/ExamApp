import React from "react";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-info">
              <img src="assets/img/logo.png" alt="TheExam" />
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Architecto quaerat voluptate provident.
              </p>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Latest Topics</h4>
              <ul>
                <li>
                  <i className="bi bi-tags"></i>Literature
                </li>
                <li>
                  <i className="bi bi-tags"></i>History
                </li>
                <li>
                  <i className="bi bi-tags"></i>Astrology
                </li>
                <li>
                  <i className="bi bi-tags"></i>Driving License
                </li>
                <li>
                  <i className="bi bi-tags"></i>Grammar
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Useful Resources</h4>
              <ul>
                <li>
                  <i className="bi bi-chevron-right"></i>
                  <a href="/">German Language</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>
                  <a href="/">Antiquity</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>
                  <a href="/">Middle Ages</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>
                  <a href="/">Modern Hstory</a>
                </li>
                <li>
                  <i className="bi bi-chevron-right"></i>
                  <a href="/">Historical Documents</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-contact">
              <h4>Contact Us</h4>
              <p>
                Orșova Street, nr. 104 <br />
                Orșova, MH 123432 <br />
                România <br />
                <br />
                <strong>Phone:</strong> +40 123 456 789
                <br />
                <strong>Email:</strong> office@historianprogrammer.com
                <br />
              </p>

              <div className="social-links">
                <a href="/" className="google-plus">
                  <i className="bi bi-youtube"></i>
                </a>
                <a href="/" className="twitter">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="/" className="facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="/" className="instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="/" className="linkedin">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; 2021 - Programmed by historian programmer, yours truly.
        </div>
        <div className="credits">
          Graphical template provided by{" "}
          <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

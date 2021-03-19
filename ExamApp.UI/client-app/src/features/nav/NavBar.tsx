import React from "react";

const NavBar = () => {
  return (
    <header id="header" className="d-flex align-items-center ">
      <div className="container-fluid container-xxl d-flex align-items-center">
        <div id="logo" className="me-auto">
          <a href="index.html" className="scrollto">
            <img src="assets/img/logo.png" alt="" title="" />
          </a>
        </div>

        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li>
              <a className="nav-link scrollto active" href="#hero">
                Home
              </a>
            </li>

            <li>
              <a className="nav-link scrollto" href="#about">
                About
              </a>
            </li>

            <li>
              <a className="nav-link scrollto" href="#speakers">
                Tests
              </a>
            </li>
          </ul>
        </nav>

        <a className="buy-tickets scrollto" href="#buy-tickets">
          Register
        </a>
      </div>
    </header>
  );
};

export default NavBar;

import React, { useState, useEffect, useRef } from "react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

const NavBar = () => {
  const [isHome, SetIsHome] = useState(true);
  const [isAbout, SetIsAbout] = useState(false);
  const [isTests, SetIsTests] = useState(false);
  const [isRegister, SetIsRegister] = useState(false);
  const [isLogin, SetIsLogin] = useState(false);
  const headerContainerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (element: string) => {
    switch (element) {
      case "home":
        SetIsHome(true);
        SetIsAbout(false);
        SetIsTests(false);
        SetIsRegister(false);
        SetIsLogin(false);
        break;
      case "about":
        SetIsHome(false);
        SetIsAbout(true);
        SetIsTests(false);
        SetIsRegister(false);
        SetIsLogin(false);
        break;
      case "tests":
        SetIsHome(false);
        SetIsAbout(false);
        SetIsTests(true);
        SetIsRegister(false);
        SetIsLogin(false);
        break;
      case "register":
        SetIsHome(false);
        SetIsAbout(false);
        SetIsTests(false);
        SetIsRegister(true);
        SetIsLogin(false);
        break;
      case "login":
        SetIsHome(false);
        SetIsAbout(false);
        SetIsTests(false);
        SetIsRegister(false);
        SetIsLogin(true);
        break;
    }
  };

  useEffect(() => {
    if (headerContainerRef.current !== null) {
      if (!isHome) {
        headerContainerRef.current.style.height = "60px";
      } else {
        headerContainerRef.current.style.height = "70px";
      }
    }
  }, [isHome]);

  useScrollPosition(({ prevPos, currPos }) => {
    console.log(currPos.y);
    if (currPos.y < -200) {
      SetIsHome(false);
    } else {
      SetIsHome(true);
    }
  });

  return (
    <header
      id="header"
      className={`d-flex align-items-center ${isHome ? "" : "header-scrolled"}`}
      ref={headerContainerRef}
    >
      <div className="container-fluid container-xxl d-flex align-items-center">
        <div id="logo" className="me-auto">
          <a
            href="index.html"
            className="scrollto"
            onClick={() => handleToggle("home")}
          >
            <img
              src="assets/img/logo.png"
              alt="logo"
              title="personalisedLogo"
            />
          </a>
        </div>

        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li>
              <a
                className={`nav-link scrollto ${isAbout ? "active" : ""}`}
                onClick={() => handleToggle("about")}
                href="#about"
              >
                About
              </a>
            </li>

            <li>
              <a
                className={`nav-link scrollto ${isTests ? "active" : ""}`}
                onClick={() => handleToggle("tests")}
                href="#speakers"
              >
                Tests
              </a>
            </li>

            <li>
              <a
                className={`nav-link scrollto ${isRegister ? "active" : ""}`}
                onClick={() => handleToggle("register")}
                href="#speakers"
              >
                Register
              </a>
            </li>

            <li>
              <a
                className={`nav-link scrollto ${isLogin ? "active" : ""}`}
                onClick={() => handleToggle("login")}
                href="#speakers"
              >
                Login
              </a>
            </li>
          </ul>
        </nav>

        <a className="buy-tickets scrollto" href="#buy-tickets">
          Create
        </a>
      </div>
    </header>
  );
};

export default NavBar;

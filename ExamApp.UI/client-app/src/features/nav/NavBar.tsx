import React, { useState, useEffect, useRef, useContext } from "react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import LoginForm from "../user/LoginForm";
import { RootStoreContext } from "../../app/stores/rootStore";
import RegisterForm from "../user/RegisterForm";

const firstRender = window.location.href.split("/")[3] === "" ? true : false;

const NavBar: React.FC = () => {
  const [isHome, SetIsHome] = useState(firstRender);
  const [isTests, SetIsTests] = useState(false);
  const [isRegister, SetIsRegister] = useState(false);
  const [isLogin, SetIsLogin] = useState(false);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user, logout } = rootStore.userStore;

  const handleToggle = (element: string) => {
    switch (element) {
      case "home":
        SetIsHome(true);
        SetIsTests(false);
        SetIsRegister(false);
        SetIsLogin(false);
        break;
      case "tests":
        SetIsHome(false);
        SetIsTests(true);
        SetIsRegister(false);
        SetIsLogin(false);
        break;
      case "register":
        SetIsHome(true);
        SetIsTests(false);
        SetIsRegister(false);
        SetIsLogin(false);
        break;
      case "login":
        SetIsHome(true);
        SetIsTests(false);
        SetIsRegister(false);
        SetIsLogin(false);
        break;
      default:
        SetIsHome(false);
        SetIsTests(false);
        SetIsRegister(false);
        SetIsLogin(false);
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
    if (window.location.href.split("/")[3].split("#")[0] === "") {
      SetIsHome(true);

      if (currPos.y < -100) {
        SetIsHome(false);
      } else {
        SetIsHome(true);
      }
    }
  });

  return (
    <>
      <header
        id="header"
        className={`d-flex align-items-center ${
          isHome ? "" : "header-scrolled"
        }`}
        ref={headerContainerRef}
      >
        <div className="container-fluid container-xxl d-flex align-items-center">
          <div id="logo" className="me-auto">
            <NavLink
              to="/"
              className="scrollto"
              onClick={() => handleToggle("home")}
            >
              <img
                src="assets/img/logo.png"
                alt="logo"
                title="personalisedLogo"
              />
            </NavLink>
          </div>

          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              {isLoggedIn && user ? (
                <>
                  <li>
                    <NavLink
                      to="/tests"
                      className={`nav-link scrollto ${isTests ? "active" : ""}`}
                      onClick={() => handleToggle("tests")}
                    >
                      Tests
                    </NavLink>
                  </li>

                  <li>
                    <button id="logout-btn" onClick={logout}>
                      Logout
                    </button>
                  </li>

                  <li>
                    <span>{`Welcome ${user.displayName}`}</span>
                  </li>

                  <Link to="/createTest">
                    <button
                      className="buy-tickets scrollto"
                      onClick={() => handleToggle("")}
                    >
                      Create
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to={"/register"}
                      className={`nav-link scrollto ${
                        isRegister ? "active" : ""
                      }`}
                      onClick={() => handleToggle("register")}
                      data-bs-toggle="modal"
                      data-bs-target="#register-modal"
                    >
                      Register
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={"/login"}
                      className={`nav-link me-5 scollto ${
                        isLogin ? "active" : ""
                      }`}
                      onClick={() => handleToggle("login")}
                      data-bs-toggle="modal"
                      data-bs-target="#buy-ticket-modal"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <RegisterForm />
      <LoginForm />
    </>
  );
};

export default observer(NavBar);

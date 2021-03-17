import React from "react";
import { auth } from "./firebase";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";

function Navigation({ user, setOpenSignIn }) {
  return (
    <div>
      <nav
        class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
        id="mainNav"
      >
        <div class="container">
          <a class="navbar-brand js-scroll-trigger" href="/">
            Project Vitality
          </a>
          <button
            class="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded"
            type="button"
          >
            Menu
            <i>
              <MenuIcon style={{ fontSize: 20 }} />
            </i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item mx-0 mx-lg-1">
                <div className="app__loginContainer">
                  <Button
                    className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-uppercase font-weight-bold  "
                    component={Link}
                    to="/ParticipantPage"
                  >
                    Participant List
                  </Button>
                  <Button
                    className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-uppercase font-weight-bold  "
                    onClick={() => auth.signOut()}
                    component={Link}
                    to="/"
                  >
                    Logout
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;

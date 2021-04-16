import React from "react";
import MenuIcon from "@material-ui/icons/Menu";

function Nav({ user, setOpenSignIn }) {
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
                  <button
                    className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-uppercase font-weight-bold "
                    onClick={() => setOpenSignIn(true)}
                  >
                    Sign In
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;

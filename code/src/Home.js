import React, { useState, useEffect } from "react";
import "./Home.css";
import logo from "./logo.svg";
import { auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Input } from "@material-ui/core";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import GradeIcon from "@material-ui/icons/Grade";
import MenuIcon from "@material-ui/icons/Menu";

/*Styling for modal. Code from material-ui.com*/
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Home() {
  /*states...how you set variables in react*/
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null); //state to keep track of the user

  //imageupload functions

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      //listen anytime an authentication change happens
      if (authUser) {
        //user has logged in...
        console.log(authUser); //check the console if someone is there or not
        setUser(authUser); //Cookie tracking to keep you logged in. Captures the user in our state.

        if (authUser.displayName) {
          //dont update username if they dont have a display name
        } else {
          // if we just created someone...
          return authUser.updateProfile({
            displayName: username, //set their display name in firebase
          });
        }
      } else {
        // user has logged out...
        setUser(null);
      }
    });

    return () => {
      //perform some cleanup actions before restarting the useEffect. This to avoid duplicate listeners.
      unsubscribe();
    };
  }, [user, username]);

  //sign up function. Fired up by the button
  const signUp = (event) => {
    event.preventDefault(); //avoid refresh when sign up button is clicked

    //verify email
    auth.onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        firebaseUser.sendEmailVerification().then(
          function () {
            // Email sent.
            //alert("Your email verification code has been sent")
          },
          function (error) {
            // An error happened.
            alert(error.message);
          }
        );
      } else {
      }
    });

    auth
      .createUserWithEmailAndPassword(email, password) //create user
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      //backend validation is done by firebase
      .catch((error) => alert(error.message)); //alert of any errors with a message

    setOpen(false); //close modal after signing up
  };

  //sign in function. Fired up by the button
  const signIn = (event) => {
    event.preventDefault(); //avoid refresh when sign in button is clicked

    auth
      .signInWithEmailAndPassword(email, password)
      //backend validation is done by firebase
      .catch((error) => alert(error.message)); //alert of any errors with a message

    setOpenSignIn(false); //close modal after signing in
  };

  return (
    <div>
      <nav
        class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
        id="mainNav"
      >
        <div class="container">
          <a class="navbar-brand js-scroll-trigger" href="#page-top">
            Project Vitality
          </a>
          <button
            class="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded"
            type="button"
            // data-toggle="collapse"
            // data-target="#navbarResponsive"
            // aria-controls="navbarResponsive"
            // aria-expanded="false"
            // aria-label="Toggle navigation"
          >
            Menu
            <i>
              <MenuIcon style={{ fontSize: 20 }} />
            </i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item mx-0 mx-lg-1">
                <a
                  class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  href="#portfolio"
                >
                  Portfolio
                </a>
              </li>
              <li class="nav-item mx-0 mx-lg-1">
                <a
                  class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  href="loggedin.html"
                >
                  About
                </a>
              </li>
              <li class="nav-item mx-0 mx-lg-1">
                <a
                  class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  href="#contact"
                >
                  Contact
                </a>
              </li>
              <li class="nav-item mx-0 mx-lg-1">
                {user?.displayName ? ( //if the user exists, show a Logout button
                  <div>
                    <button
                      class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-uppercase font-weight-bold  "
                      onClick={() => auth.signOut()}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  //else, show a sign up button
                  <div className="app__loginContainer">
                    <button
                      class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-uppercase font-weight-bold "
                      onClick={() => setOpenSignIn(true)}
                    >
                      Sign In
                    </button>
                    <button
                      class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-uppercase font-weight-bold  "
                      onClick={() => setOpen(true)}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Body -- Project Vitality */}

      <header class="masthead bg-primary text-white text-center">
        <div class="container d-flex align-items-center flex-column">
          {/* <!-- Masthead Avatar Image--> */}
          <img
            class="masthead-avatar mb-5"
            src="assets/img/avataaars.svg"
            alt=""
          />
          {/* <!-- Masthead Heading--> */}
          <h1 class="masthead-heading text-uppercase mb-0">Project Vitality</h1>
          {/* <!-- Icon Divider--> */}
          <div class="divider-custom divider-light">
            <div class="divider-custom-line"></div>
            <div class="divider-custom-icon">
              <i>
                <GradeIcon style={{ fontSize: 50 }} />
              </i>
            </div>
            <div class="divider-custom-line"></div>
          </div>
          {/* <!-- Masthead Subheading--> */}
          <p class="masthead-subheading font-weight-light mb-0">
            Bridging the gap of communication lol
          </p>
        </div>
      </header>

      <Modal //Sign up Modal
        open={open} //state to keep track if its open
        onClose={() => setOpen(false)} //onClose method. closes the model when anywhere else on the screen is clicked
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <button
              class="close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <i class="fas fa-times"></i>
              </span>
            </button>
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    {/* <!-- Portfolio Modal - Title--> */}
                    <h2
                      class="portfolio-modal-title text-secondary text-uppercase mb-0"
                      id="portfolioModal1Label"
                    >
                      Sign Up
                    </h2>
                    {/* <!-- Icon Divider--> */}
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon">
                        <GradeIcon style={{ fontSize: 40 }} />
                      </div>
                      <div class="divider-custom-line"></div>
                    </div>
                    <form
                      id="signupForm"
                      name="sentMessage"
                      novalidate="novalidate"
                      method="post"
                      action=""
                    >
                      <input type="hidden" name="submitted" value="1" />
                      <h3></h3>
                      <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                          <input
                            class="form-control"
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            required="required"
                            data-validation-required-message="Please enter your email address."
                          />
                          <p class="help-block text-danger"></p>
                        </div>
                      </div>

                      <h3></h3>

                      <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                          <input
                            class="form-control"
                            id="email"
                            type="text"
                            placeholder="Username"
                            required="required"
                            data-validation-required-message="Please enter your username."
                          />
                          <p class="help-block text-danger"></p>
                        </div>
                      </div>

                      <h3></h3>

                      <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                          <input
                            class="form-control"
                            id="email"
                            type="password"
                            placeholder="Password"
                            required="required"
                            data-validation-required-message="Please enter your password."
                          />
                          <p class="help-block text-danger"></p>
                        </div>
                      </div>

                      <h3></h3>

                      <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                          <input
                            class="form-control"
                            id="email"
                            type="password"
                            placeholder="Confirm Password"
                            required="required"
                            data-validation-required-message="Please enter confirm your password."
                          />
                          <p class="help-block text-danger"></p>
                        </div>
                      </div>

                      <br />
                      <div id="success"></div>
                      <button
                        type="submit"
                        class="btn btn-primary btn-xl"
                        onClick={signUp}
                      >
                        Sign Up
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal //Sign Out and Login Modal
        open={openSignIn} //state to keep track if its open
        onClose={() => setOpenSignIn(false)} //onClose method. closes the model when anywhere else on the screen is clicked
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src={logo}
                alt=""
                width="100px"
                height="100px"
              />
            </center>

            <EmailOutlinedIcon />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <LockOutlinedIcon />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" onClick={signIn}>
              Sign In
            </button>
          </form>
        </div>
      </Modal>

      {/* <!-- Footer--> */}
      <footer class="footer text-center">
        <div class="container">
          <div class="row">
            {/* <!-- Footer Location--> */}
            <div class="col-lg-4 mb-5 mb-lg-0">
              <h4 class="text-uppercase mb-4">Location</h4>
              <p class="lead mb-0">
                University of Regina
                <br />
                3737 Wascana Parkway,
                <br />
                Regina, SK, Canada. S4S 0A2
              </p>
            </div>
            {/* <!-- Footer Social Icons--> */}
            <div class="col-lg-4 mb-5 mb-lg-0">
              <h4 class="text-uppercase mb-4">Around the Web</h4>
              <a class="btn btn-outline-light btn-social mx-1" href="#!">
                <i class="fab fa-fw fa-facebook-f"></i>
              </a>
              <a class="btn btn-outline-light btn-social mx-1" href="#!">
                <i class="fab fa-fw fa-twitter"></i>
              </a>
              <a class="btn btn-outline-light btn-social mx-1" href="#!">
                <i class="fab fa-fw fa-linkedin-in"></i>
              </a>
              <a class="btn btn-outline-light btn-social mx-1" href="#!">
                <i class="fab fa-fw fa-dribbble"></i>
              </a>
            </div>
            {/* <!-- Footer About Text--> */}
            <div class="col-lg-4">
              <h4 class="text-uppercase mb-4">About Project Vitality</h4>
              <p class="lead mb-0">
                Freelance is a free to use, MIT licensed Bootstrap theme created
                by
                <a href="http://startbootstrap.com">Start Bootstrap</a>.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

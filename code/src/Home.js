import React, { useState, useEffect } from "react";
import "./Home.css";
import { auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import MenuIcon from "@material-ui/icons/Menu";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import bowl from "./bowl.png";
import bottle from "./milk bottle.png";
import calendar from "./Calendar.png";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import IconButton from "@material-ui/core/IconButton";
import breastfeeding from "./breastfeeding.png";
import vitamins from "./vitamins.png";
import un from "./un.jpeg";
//import { dom } from "@fortawesome/fontawesome-svg-core";

//dom.watch(); // This will kick of the initial replacement of i to svg tags and configure a MutationObserver

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
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openMic, setOpenMic] = useState(false);
  const [openBr, setOpenBr] = useState(false);
  const [openFirst, setOpenFirst] = useState(false);
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
          >
            Menu
            <i>
              <MenuIcon style={{ fontSize: 20 }} />
            </i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
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
                      className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-uppercase font-weight-bold "
                      onClick={() => setOpenSignIn(true)}
                    >
                      Sign In
                    </button>
                    {/* <button
                      class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger text-uppercase font-weight-bold  "
                      onClick={() => setOpen(true)}
                    >
                      Sign Up
                    </button> */}
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
          <img class="masthead-avatar mb-5" alt="" />
          {/* <!-- Masthead Heading--> */}
          <h1 class="masthead-heading text-uppercase mb-0">Project Vitality</h1>
          {/* <!-- Icon Divider--> */}
          <div class="divider-custom divider-light">
            <div class="divider-custom-line"></div>
            <div classs="divider-custom-icon">
              <i>
                <GradeRoundedIcon style={{ fontSize: 70 }} />
              </i>
            </div>
            <div class="divider-custom-line"></div>
          </div>
          {/* <!-- Masthead Subheading--> */}
          <p class="masthead-subheading font-weight-light mb-0">
            A step towards zero hunger.
          </p>
        </div>
      </header>

      {/* <!-- Three Main Focuses Section--> */}
      <section class="page-section portfolio" id="Three Main Focuses">
        <div class="container">
          {/* <!-- Portfolio Section Heading--> */}
          <h1 class="page-section-heading text-center text-uppercase text-secondary mb-0">
            Three Main Focuses
          </h1>
          {/* <!-- Icon Divider--> */}
          <div class="divider-custom">
            <div class="divider-custom-line"></div>
            <div class="divider-custom-icon">
              <i>
                <GradeRoundedIcon style={{ fontSize: 70 }} />
              </i>
            </div>
            <div class="divider-custom-line"></div>
          </div>
          {/* <!-- Three Main Focuses Grid Items--> */}
          <div class="row justify-content-center">
            {/* <!-- Three Main Focuses Item 1--> */}
            <div class="col-md-6 col-lg-4 mb-5"></div>
            {/* <!-- Micronutrient Intervention--> */}
            <div class="col-md-6 col-lg-4 mb-5">
              <div class="portfolio-item mx-auto">
                <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div class="portfolio-item-caption-content text-center text-white">
                    <h4>Micronutrient Intervention</h4>
                    <a className="info">View More</a>
                    {/* <IconButton>
                      <AddRoundedIcon
                        className="text-white"
                        style={{ fontSize: 100 }}
                        onClick={() => setOpenMic(true)}
                      />
                    </IconButton>{" "} */}
                  </div>
                </div>
                <img class="img-fluid" src={bowl} alt="" />
              </div>
            </div>
            {/* <!-- Portfolio Item 3--> */}
            <div class="col-md-6 col-lg-4 mb-5"></div>
            {/* <!-- Portfolio Item 4--> */}
            <div class="col-md-6 col-lg-4 mb-5 mb-lg-0"></div>
            {/* Breastfeeding Awareness */}
            <div class="col-md-6 col-lg-4 mb-5 mb-md-0">
              <div class="portfolio-item mx-auto">
                <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div class="breastfeeding portfolio-item-caption-content text-center text-white">
                    <h4>Breastfeeding Awareness</h4>
                    <a className="info">View More</a>
                  </div>
                </div>
                <img class="img-fluid" src={bottle} alt="" />
              </div>
            </div>
            {/* <!-- Portfolio Item 6--> */}
            <div class="col-md-6 col-lg-4"></div>

            {/* <!-- Portfolio Item 7--> */}
            <div class="col-md-6 col-lg-4"></div>

            {/* <!-- First 100 days --> */}
            <div class="col-md-6 col-lg-4">
              <div class="portfolio-item mx-auto">
                <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                  <div class="portfolio-item-caption-content text-center text-white">
                    <h3>First 100 days</h3>
                    <a className="info">View More</a>
                    {/* <IconButton>
                      <AddRoundedIcon
                        className="text-white"
                        style={{ fontSize: 100 }}
                        onClick={() => setOpenFirst(true)}
                      />
                    </IconButton>{" "} */}
                  </div>
                </div>

                <img class="img-fluid" src={calendar} alt="" />
              </div>
            </div>

            {/* <!-- Portfolio Item 9--> */}
            <div class="col-md-6 col-lg-4"></div>
          </div>
        </div>
      </section>
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
                        <GradeRoundedIcon style={{ fontSize: 40 }} />
                      </div>
                      <div class="divider-custom-line"></div>
                    </div>
                    <form id="signupForm" name="sentMessage">
                      <h3></h3>

                      <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                          <input
                            class="form-control"
                            id="username"
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
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
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                          />{" "}
                          <p class="help-block text-danger"></p>
                        </div>
                      </div>

                      <h3></h3>

                      <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                          <input
                            class="form-control"
                            id="password"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
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
                      <br />
                      <br />
                      <span>Already have an account? </span>
                      <span
                        className="signin__link font-weight-bold"
                        onClick={() => {
                          setOpenSignIn(true);
                          setOpen(false);
                        }}
                      >
                        Sign In.
                      </span>
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
                      Sign In
                    </h2>
                    {/* <!-- Icon Divider--> */}
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon">
                        <GradeRoundedIcon style={{ fontSize: 40 }} />
                      </div>
                      <div class="divider-custom-line"></div>
                    </div>
                    <form id="signupForm" name="sentMessage">
                      <h3></h3>
                      <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                          <input
                            placeholder="Email"
                            class="form-control"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <p class="help-block text-danger"></p>
                        </div>
                      </div>

                      <br />
                      <div id="success"></div>

                      <button
                        type="submit"
                        class="btn btn-primary btn-xl"
                        onClick={signIn}
                      >
                        Sign In
                      </button>
                      <br />
                      <br />
                      <span>Not yet a user? </span>
                      <span
                        className="signin__link font-weight-bold"
                        onClick={() => {
                          setOpen(true);
                          setOpenSignIn(false);
                        }}
                      >
                        Sign Up now.
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal for Micronutient Intervention */}
      <Modal
        open={openMic} //state to keep track if its open
        onClose={() => setOpenMic(false)} //onClose method. closes the model when anywhere else on the screen is clicked
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <button class="close" type="button">
              <span aria-hidden="true"></span>
            </button>
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    {/* <!-- Portfolio Modal - Title--> */}
                    <h2
                      class="portfolio-modal-title text-secondary text-uppercase mb-0"
                      id="portfolioModal5Label"
                    >
                      Micronutrient Intervention
                    </h2>
                    {/* <!-- Icon Divider--> */}
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon">
                        <i>
                          <GradeRoundedIcon style={{ fontSize: 70 }} />
                        </i>
                      </div>
                      <div class="divider-custom-line"></div>
                    </div>
                    {/* <!-- Portfolio Modal - Image--> */}
                    <img
                      class="img-fluid rounded mb-5"
                      src={vitamins}
                      alt=""
                      width="200"
                      height="200"
                    />
                    {/* <!-- Portfolio Modal - Text--> */}
                    <p class="mb-5">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Mollitia neque assumenda ipsam nihil, molestias magnam,
                      recusandae quos quis inventore quisquam velit asperiores,
                      vitae? Reprehenderit soluta, eos quod consequuntur itaque.
                      Nam.
                    </p>
                    <button
                      class="btn btn-primary"
                      onClick={() => setOpenMic(false)}
                    >
                      <i class="fas fa-times fa-fw"></i>
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal for Breastfeeding Awareness */}
      <Modal
        open={openBr} //state to keep track if its open
        onClose={() => setOpenBr(false)} //onClose method. closes the model when anywhere else on the screen is clicked
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
                      id="portfolioModal5Label"
                    >
                      Breastfeeding Awareness
                    </h2>
                    {/* <!-- Icon Divider--> */}
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon">
                        <i>
                          <GradeRoundedIcon style={{ fontSize: 70 }} />
                        </i>
                      </div>
                      <div class="divider-custom-line"></div>
                    </div>
                    {/* <!-- Portfolio Modal - Image--> */}
                    <img
                      class="img-fluid rounded mb-5"
                      src={breastfeeding}
                      alt=""
                      width="200"
                      height="200"
                    />
                    {/* <!-- Portfolio Modal - Text--> */}
                    <p class="mb-5">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Mollitia neque assumenda ipsam nihil, molestias magnam,
                      recusandae quos quis inventore quisquam velit asperiores,
                      vitae? Reprehenderit soluta, eos quod consequuntur itaque.
                      Nam.
                    </p>
                    <button
                      class="btn btn-primary"
                      onClick={() => setOpenBr(false)}
                    >
                      <i class="fas fa-times fa-fw"></i>
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal for First 1000 days  */}
      <Modal
        open={openFirst} //state to keep track if its open
        onClose={() => setOpenFirst(false)} //onClose method. closes the model when anywhere else on the screen is clicked
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
                      id="portfolioModal5Label"
                    >
                      First 100 days of a child's life
                    </h2>
                    {/* <!-- Icon Divider--> */}
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon">
                        <i>
                          <GradeRoundedIcon style={{ fontSize: 70 }} />
                        </i>
                      </div>
                      <div class="divider-custom-line"></div>
                    </div>
                    {/* <!-- Portfolio Modal - Image--> */}
                    <img
                      class="img-fluid rounded mb-5"
                      src={calendar}
                      alt=""
                      width="200"
                      height="200"
                    />
                    {/* <!-- Portfolio Modal - Text--> */}
                    <p class="mb-5">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Mollitia neque assumenda ipsam nihil, molestias magnam,
                      recusandae quos quis inventore quisquam velit asperiores,
                      vitae? Reprehenderit soluta, eos quod consequuntur itaque.
                      Nam.
                    </p>
                    <button
                      class="btn btn-primary"
                      onClick={() => setOpenFirst(false)}
                    >
                      <i class="fas fa-times fa-fw"></i>
                      Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                <i>
                  <FacebookIcon style={{ fontSize: 40 }} />
                </i>
              </a>
              <a class="btn btn-outline-light btn-social mx-1" href="#!">
                <i>
                  <TwitterIcon style={{ fontSize: 38 }} />
                </i>
              </a>
              <a class="btn btn-outline-light btn-social mx-1" href="#!">
                <i>
                  <LinkedInIcon style={{ fontSize: 38 }} />
                </i>
              </a>
              <a class="btn btn-outline-light btn-social mx-1" href="#!">
                <i>
                  <InstagramIcon style={{ fontSize: 38 }} />
                </i>{" "}
              </a>
            </div>
            {/* <!-- Footer About Text--> */}
            <div class="col-lg-4">
              <h4 class="text-uppercase mb-4">About Project Vitality</h4>
              <p class="lead mb-0">A step towards zero hunger</p>
            </div>
          </div>
        </div>
      </footer>

      {/* <!-- Scroll to Top Button (Only visible on small and extra-small screen sizes)--> */}
      <div class="scroll-to-top d-lg-none position-fixed">
        <a
          class="js-scroll-trigger d-block text-center text-white rounded"
          href="#page-top"
        >
          <i class="fa fa-chevron-up"></i>
        </a>
      </div>
    </div>
  );
}

export default Home;

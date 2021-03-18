import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ParticipantPage from "./ParticipantPage";
import { auth } from "./firebase";
import Navigation from "./Navigation";
import Nav from "./Nav";
import QuestionnairePage from "./QuestionnairePage";

function App() {
  const [user, setUser] = useState(null); //state to keep track of the user
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

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
    <div className="app">
      <Router>
        {/* if the user exists */}
        {user ? (
          <>
            {/* signed in Navigation bar */}
            <Navigation user={user} setOpenSignIn={setOpenSignIn} />
            <Switch>
              <Route exact path="/">
                <Home
                  user={user}
                  setUsername={setUsername}
                  signIn={signIn}
                  signUp={signUp}
                  email={email}
                  setEmail={setEmail}
                  open={open}
                  setOpen={setOpen}
                  openSignIn={openSignIn}
                  setOpenSignIn={setOpenSignIn}
                  password={password}
                  setPassword={setPassword}
                />
              </Route>
              <Route exact path="/ParticipantPage">
                <ParticipantPage
                  user={user}
                  setOpenSignIn={setOpenSignIn}
                  username={username}
                />
              </Route>

              <Route exact path="/QuestionnairePage">
                <QuestionnairePage user={user} setOpenSignIn={setOpenSignIn} />
              </Route>
            </Switch>
          </>
        ) : (
          // if the user does not exist
          <>
            {/* signed out Navigation bar */}
            <Nav user={user} setOpenSignIn={setOpenSignIn} />
            <Switch>
              <Route exact path="/">
                <Home
                  user={user}
                  setUsername={setUsername}
                  signIn={signIn}
                  signUp={signUp}
                  email={email}
                  setEmail={setEmail}
                  open={open}
                  setOpen={setOpen}
                  openSignIn={openSignIn}
                  setOpenSignIn={setOpenSignIn}
                  password={password}
                  setPassword={setPassword}
                />
              </Route>
            </Switch>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

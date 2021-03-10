import React from "react";

function Authentication(
  resetPass,
  setResetPass,
  signUpYes,
  setSignUp,
  signInYes,
  setSignIn,
  emailRef,
  passwordRef,
  username,
  setUsername,
  register,
  signIn
) {
  return (
    <div className="authentication">
      <div className="authentication__background">
        {/* <img className="authentication__logo" src={logo} alt="" /> */}

        <div className="authentication__header">
          <h1>Bridging the gap of communication.</h1>
          {/* <h2>Citizens and Ministries.</h2> */}
        </div>

        {/* display sign in button at the top when user is on sign up page*/}
        {!signInYes ? (
          <>
            <button
              onClick={() => {
                setSignIn(true);
                setSignUp(false);
                setResetPass(false);
              }}
              className="authentication__button"
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            {/* else display sign up button at the top*/}
            <button
              onClick={() => {
                setSignUp(true);
                setSignIn(false);
                setResetPass(false);
              }}
              className="authentication__button"
            >
              Sign Up
            </button>
          </>
        )}

        {/* display page */}
        <div className="authentication__gradient" />
      </div>
    </div>
  );
}

export default Authentication;

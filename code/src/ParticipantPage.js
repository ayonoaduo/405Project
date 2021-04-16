import React, { useState, useEffect } from "react";
import "./ParticipantPage.css";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import Modal from "@material-ui/core/Modal";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import { db } from "./firebase";
import firebase from "firebase";
import Participants from "./Participants";

function ParticipantPage({ user, name, setName, uid, setUid }) {
  const [openAddParticipant, setOpenAddParticipant] = useState(false); //State to handle First100Days Modal
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState("");

  const [users, setUsers] = useState([]);
  //useEffect runs a piece of code based on a specific
  //condition
  useEffect(() => {
    //this is where the code runs
    //snapshot is a powerful listener that will run the code when a post is made
    db.collection("users")
      .orderBy("name", "asc")
      .onSnapshot((snapshot) => {
        //everytime a new post is added, this code fires...
        setUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id, //the user ids
            userr: doc.data(),
          }))
        );
      });
  }, []); //[] symbol means run the code once;

  const upload = () => {
    db.collection("users").add({
      name: name,
      username: user.displayName,
      date: date,
      address: address,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setOpenAddParticipant(false);
    setName(""); //reset progress
    setDate("");
    setAddress("");
  };

  return (
    <div className="back">
      <Modal
        open={openAddParticipant}
        onClose={() => {
          setOpenAddParticipant(false);
          setName(""); //reset progress
          setDate("");
          setAddress("");
        }}
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">
                      Add Participant
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
                    <div class="control-group">
                      <div class="form-group floating-label-form-group controls mb-0 pb-2">
                        <input
                          placeholder="Name of Participant"
                          class="form-control"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <p class="help-block text-danger"></p>
                      </div>
                    </div>
                    <h3></h3>
                    <div class="control-group">
                      <div class="form-group floating-label-form-group controls mb-0 pb-2">
                        <input
                          placeholder="Date of Birth"
                          class="form-control"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />

                        <p class="help-block text-danger"></p>
                      </div>
                    </div>
                    <div class="control-group">
                      <div class="form-group floating-label-form-group controls mb-0 pb-2">
                        <input
                          placeholder="Address"
                          class="form-control"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <p class="help-block text-danger"></p>
                      </div>
                    </div>

                    <p></p>
                    <button
                      type="submit"
                      class="btn btn-primary btn-xl"
                      onClick={upload}
                    >
                      Add Participant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="participant__info">
        <center>
          <h1>Welcome, {user.displayName}</h1>
          <br></br>
          <h5>Who are you tracking?</h5>
          <br></br>
          <h5>
            Participant List
            <AddBoxOutlinedIcon
              className="addBox"
              onClick={() => {
                setOpenAddParticipant(true);
              }}
            />
          </h5>
          <br></br>
          <div className="profilePage__posts">
            {
              /*loop through posts in state*/
              users.map(({ id, userr }) => (
                //the key allows the page to only refresh the new post, not all the posts. since each post has its own key
                <Participants
                  // key={id}
                  setUid={setUid}
                  uid={uid}
                  userId={id}
                  user={user}
                  name={userr.name}
                  address={userr.address}
                ></Participants>
              ))
            }
          </div>
        </center>
      </div>
    </div>
  );
}

export default ParticipantPage;

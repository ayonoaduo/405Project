import React, { useState } from "react";
import "./ParticipantPage.css";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import Modal from "@material-ui/core/Modal";
import calendar from "./Calendar.png";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import { db, storage } from "./firebase";
import firebase from "firebase";

function ParticipantPage({ user }) {
  const [openAddParticipant, setOpenAddParticipant] = useState(false); //State to handle First100Days Modal
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState("");

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
    <div>
      <div className="participant__info">
        <h5>Welcome, {user.displayName}</h5>
        <h5>Who are you tracking?</h5>
        <br />

        <h5>
          Participant List{" "}
          <AddBoxOutlinedIcon
            className="addBox"
            onClick={() => {
              setOpenAddParticipant(true);
            }}
          />
        </h5>
      </div>

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
                    {/* <!-- Portfolio Modal - Title--> */}
                    <button
                      class="btn btn-primary closeWindow"
                      onClick={() => setOpenAddParticipant(false)}
                    >
                      Close Window
                    </button>
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
                          //   class="form-control"
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
    </div>
  );
}

export default ParticipantPage;

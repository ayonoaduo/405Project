import React, { useState, useEffect } from "react";
import "./ParticipantPage.css";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import Modal from "@material-ui/core/Modal";
import calendar from "./Calendar.png";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import { db, storage } from "./firebase";
import firebase from "firebase";
import Participants from "./Participants";

const google = (window.google = window.google ? window.google : {});
// Load the Visualization API and the corechart package.
google.charts.load("current", { packages: ["corechart"] });

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
  // Create the data table.
  // Some raw data (not necessarily accurate)

  var data = google.visualization.arrayToDataTable([
    [
      "Month",
      "Bolivia",
      "Ecuador",
      "Madagascar",
      "Papua New Guinea",
      "Rwanda",
      "Average",
    ],
    ["2004/05", 902, 938, 522, 998, 450, 614.6],
    ["2005/06", 135, 1120, 599, 1268, 288, 682],
    ["2006/07", 157, 1167, 587, 807, 397, 623],
    ["2007/08", 139, 1110, 615, 968, 215, 609.4],
    ["2008/09", 136, 691, 629, 1026, 366, 569.6],
  ]);

  var options = {
    title: "Monthly Coffee Production by Country",
    vAxis: { title: "Rating" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
  };

  var chart = new google.visualization.ComboChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

function ParticipantPage({ user, name, setName, uid, setUid }) {
  const [openAddParticipant, setOpenAddParticipant] = useState(false); //State to handle First100Days Modal
  const [date, setDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [users, setUsers] = useState([]);
  const [num, setNum] = useState("");
  //useEffect runs a piece of code based on a specific
  //condition
  useEffect(() => {
    //this is where the code runs
    //snapshot is a powerful listener that will run the code when a post is made
    db.collection("users")
      .orderBy("name", "desc")
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
      num: num,
    });
    setOpenAddParticipant(false);
    setName(""); //reset progress
    setDate("");
    setAddress("");
    setNum("");
  };

  return (
    <div>
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
                    <div class="control-group">
                      <div class="form-group floating-label-form-group controls mb-0 pb-2">
                        <input
                          placeholder="Num"
                          class="form-control"
                          type="text"
                          value={num}
                          onChange={(e) => setNum(e.target.value)}
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

          <div id="chart_div">
            <button onClick={google.charts.setOnLoadCallback(drawChart)}>
              Draw Chart
            </button>
          </div>
        </center>
      </div>
    </div>
  );
}

export default ParticipantPage;

import { useState, useEffect } from "react";
import "./Participants.css";
import { db } from "./firebase";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Modal from "@material-ui/core/Modal";
import "./QuestionnairePage.css";
import firebase from "firebase";
import Button from "@material-ui/core/Button";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Reports from "./Reports";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Report2 from "./Report2";
import Chart from "react-google-charts";

function Participants({ uid, setUid, userId, name, address }) {
  const [height, setHeight] = useState("");
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);
  const [value6, setValue6] = useState(0);
  const [partProfileModal, setPartProfileModal] = useState(false);
  const [questModal1, setQuestModal1] = useState(false);
  const [questModal2, setQuestModal2] = useState(false);
  const [questModal3, setQuestModal3] = useState(false);
  const [questModal4, setQuestModal4] = useState(false);
  const [questModal5, setQuestModal5] = useState(false);
  const [questModal6, setQuestModal6] = useState(false);

  const [progressModal, setProgressModal] = useState(false);
  const [progress2Modal, setProgress2Modal] = useState(false);

  const [infoModal, setInfoModal] = useState(false);

  const [chooseOptModal, setchooseOptModal] = useState(false);

  const [average, setAverage] = useState("");

  const [babyAge, setBabyAge] = useState("");

  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [comment3, setComment3] = useState("");
  const [comment4, setComment4] = useState("");
  const [comment5, setComment5] = useState("");
  const [comment6, setComment6] = useState("");

  const [reports, setReports] = useState([]); //keep track of the comments
  const heightMarks = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
  };
  useEffect(() => {
    //this is where the code runs
    //snapshot is a powerful listener that will run the code when a post is made
    db.collection("users")
      .doc(userId)
      .collection("reports")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //everytime a new post is added, this code fires...
        setReports(
          snapshot.docs.map((doc) => ({
            reportId: doc.id, //the user ids
            reportss: doc.data(),
          }))
        );
      });
  }, []); //[] symbol means run the code once;

  //function that submits comment into database for a specific post
  const postReport = (event) => {
    //event.preventDefault();

    db.collection("users").doc(userId).collection("reports").add({
      babyAge: babyAge,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      comment1: comment1,
      comment2: comment2,
      comment3: comment3,
      comment4: comment4,
      comment5: comment5,
      comment6: comment6,
      value1: value1,
      value2: value2,
      value3: value3,
      value4: value4,
      value5: value5,
      value6: value6,
    });

    setValue1(0);
    setValue2(0);
    setValue3(0);
    setValue4(0);
    setValue5(0);
    setValue6(0);
    setComment1("");
    setComment2("");
    setComment3("");
    setComment4("");
    setComment5("");
    setComment6("");
  };
  // FLAGS
  var flag1, flag2, flag3, flag4, flag5, flag6, total;

  //array of numbers for all questions
  const numbers1 = new Array();

  const numbers2 = new Array();
  const numbers3 = new Array();
  const numbers4 = new Array();
  const numbers5 = new Array();
  const numbers6 = new Array();
  //states for average calculation for all questions
  const [solution1, setSolution1] = useState(0);
  const [solution2, setSolution2] = useState(0);
  const [solution3, setSolution3] = useState(0);
  const [solution4, setSolution4] = useState(0);
  const [solution5, setSolution5] = useState(0);
  const [solution6, setSolution6] = useState(0);

  return (
    <div className="participants">
      <Button
        onClick={() => setPartProfileModal(true)}
        className=" text-uppercase font-weight-bold bg-primary text-white rounded"
        classes={{ label: "button__styling" }}
      >
        {name}
      </Button>
      <br></br>
      <br></br>

      <Modal //Participant Profile
        open={partProfileModal} //state to keep track if its open
        onClose={() => {
          setPartProfileModal(false);
        }} //onClose method. closes the model when anywhere else on the screen is clicked
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2
                      class="portfolio-modal-title text-secondary text-uppercase mb-0"
                      id="portfolioModal1Label"
                    >
                      {name}
                    </h2>

                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon">
                        <GradeRoundedIcon style={{ fontSize: 40 }} />
                      </div>
                      <div class="divider-custom-line"></div>
                    </div>

                    <h3>Profile</h3>

                    <br />
                    <form id="signupForm" name="sentMessage">
                      <h3></h3>
                      <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                          <Button
                            className=" text-uppercase font-weight-bold bg-primary text-white rounded"
                            classes={{ label: "button__styling" }}
                            onClick={() => {
                              setPartProfileModal(false);
                              setchooseOptModal(false);
                              setProgressModal(true);
                            }}
                          >
                            View Progress
                          </Button>
                          <p class="help-block text-danger"></p>
                        </div>
                      </div>
                      <h3></h3>
                      <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                          <Button
                            className=" text-uppercase font-weight-bold bg-primary text-white rounded"
                            classes={{ label: "button__styling" }}
                            onClick={() => {
                              setPartProfileModal(false);
                              setchooseOptModal(true);
                            }}
                          >
                            Complete Questionnaire
                          </Button>
                          <p class="help-block text-danger"></p>
                        </div>
                      </div>

                      <br />
                      <br />
                      <br />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Choose Option Modal */}
      <Modal
        open={chooseOptModal}
        onClose={() => {
          setchooseOptModal(false);
          setValue1(0);
          setValue2(0);
          setValue3(0);
          setValue4(0);
          setValue5(0);
          setValue6(0);
          setComment1("");
          setComment2("");
          setComment3("");
          setComment4("");
          setComment5("");
          setComment6("");
        }}
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2
                      class="portfolio-modal-title text-secondary text-uppercase mb-0"
                      id="portfolioModal1Label"
                    >
                      {name}
                    </h2>
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon">
                        <GradeRoundedIcon style={{ fontSize: 40 }} />
                      </div>
                      <div class="divider-custom-line"></div>
                    </div>
                    <h3>What is the baby's age?</h3>
                    <br />
                    <form id="signupForm" name="sentMessage">
                      <h3></h3>
                      <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                          <Button
                            className="text-uppercase font-weight-bold bg-primary text-white rounded"
                            classes={{ label: "button__styling" }}
                            onClick={() => {
                              setPartProfileModal(false);
                              setchooseOptModal(false);
                              setQuestModal1(true);
                              setBabyAge("0 - 6 Months");
                            }}
                          >
                            0 - 6 Months
                          </Button>
                          <p class="help-block text-danger"></p>
                        </div>
                      </div>

                      <h3></h3>

                      <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                          <Button
                            className=" text-uppercase font-weight-bold bg-primary text-white rounded"
                            classes={{ label: "button__styling" }}
                            onClick={() => {
                              setPartProfileModal(false);
                              setchooseOptModal(false);
                              setQuestModal1(true);
                              setBabyAge("6 - 18 Months");
                            }}
                          >
                            6 - 18 Months
                          </Button>
                          <p class="help-block text-danger"></p>
                        </div>
                      </div>
                      <h3></h3>
                      <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                          <Button
                            className=" text-uppercase font-weight-bold bg-primary text-white rounded"
                            classes={{ label: "button__styling" }}
                            onClick={() => {
                              setPartProfileModal(false);
                              setchooseOptModal(false);
                              setQuestModal1(true);
                              setBabyAge("18 Onwards");
                            }}
                          >
                            18 Onwards
                          </Button>
                          <p class="help-block text-danger"></p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Question 1 */}
      <Modal
        open={questModal1}
        onClose={() => {
          setQuestModal1(false);
          setValue1(0);
          setValue2(0);
          setValue3(0);
          setValue4(0);
          setValue5(0);
          setValue6(0);
          setComment1("");
          setComment2("");
          setComment3("");
          setComment4("");
          setComment5("");
          setComment6("");
        }}
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2
                      class="portfolio-modal-title text-secondary text-uppercase mb-0"
                      id="portfolioModal1Label"
                    >
                      Questionnaire
                    </h2>
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
                          <h5 className="questions__styling">
                            1. Rate the baby's latch.
                          </h5>
                          <Slider
                            defaultValue={0}
                            min={0}
                            max={10}
                            step={1}
                            onChange={(e) => {
                              setHeight(e);
                              setValue1(e);
                            }}
                            //value={rating}
                            //onChange={(e) => setRating(e.target.value)}
                            marks={heightMarks}
                            style={{ width: "100%" }}
                          />
                          <br></br>
                          <h5 className="questionnaire__value">
                            You selected {value1}
                          </h5>
                          <br />
                          <textarea
                            className="question__comments"
                            placeholder="Please provide additional comments"
                            type="text"
                            value={comment1}
                            onChange={(e) => setComment1(e.target.value)}
                          />
                          <br />
                          <br />
                        </div>
                      </div>
                      <div className="left_align">
                        <Button
                          className="text-uppercase font-weight-bold bg-primary text-white"
                          classes={{ label: "questionBackButton__styling" }}
                          onClick={() => {
                            setPartProfileModal(true);
                            setQuestModal1(false);
                          }}
                        >
                          <NavigateBeforeIcon />
                          Back
                        </Button>
                        <br />
                        <br />
                      </div>
                      <div className="right_align">
                        <Button
                          className="text-uppercase font-weight-bold bg-primary text-white"
                          classes={{ label: "questionButton__styling" }}
                          onClick={() => {
                            setPartProfileModal(false);
                            setQuestModal1(false);
                            setQuestModal2(true);
                          }}
                        >
                          Next
                          <NavigateNextIcon />
                        </Button>
                        <h3></h3>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Question 2 */}
      <Modal
        open={questModal2}
        onClose={() => {
          setQuestModal2(false);
          setValue1(0);
          setValue2(0);
          setValue3(0);
          setValue4(0);
          setValue5(0);
          setValue6(0);
          setComment1("");
          setComment2("");
          setComment3("");
          setComment4("");
          setComment5("");
          setComment6("");
        }}
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2
                      class="portfolio-modal-title text-secondary text-uppercase mb-0"
                      id="portfolioModal1Label"
                    >
                      Questionnaire
                    </h2>
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
                          <h5 className="questions__styling">
                            2. Rate the baby's appetite with 10 being the best.
                          </h5>
                          <Slider
                            defaultValue={0}
                            min={0}
                            max={10}
                            step={1}
                            onChange={(e) => {
                              setHeight(e);
                              setValue2(e);
                            }}
                            marks={heightMarks}
                            style={{ width: "100%" }}
                          />
                          <br />

                          <h5 className="questionnaire__value">
                            You selected {value2}
                          </h5>
                          <br />
                          <br />
                          <textarea
                            className="question__comments"
                            placeholder="Please provide additional comments"
                            id="reason"
                            type="text"
                            value={comment2}
                            onChange={(e) => setComment2(e.target.value)}
                          />
                          <br />
                        </div>
                      </div>
                      <div className="left_align">
                        <Button
                          className="text-uppercase font-weight-bold bg-primary text-white"
                          classes={{ label: "questionBackButton__styling" }}
                          onClick={() => {
                            setPartProfileModal(false);
                            setQuestModal1(true);
                            setQuestModal2(false);
                          }}
                        >
                          <NavigateBeforeIcon />
                          Back
                        </Button>
                        <br />
                      </div>
                      <div className="right_align">
                        <Button
                          className="text-uppercase font-weight-bold bg-primary text-white"
                          classes={{ label: "questionButton__styling" }}
                          onClick={() => {
                            setPartProfileModal(false);
                            setQuestModal1(false);
                            setQuestModal2(false);
                            setQuestModal3(true);
                          }}
                        >
                          Next
                          <NavigateNextIcon />
                        </Button>
                        <h3></h3>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Question 3 */}
      <Modal
        open={questModal3}
        onClose={() => {
          setQuestModal3(false);
          setValue1(0);
          setValue2(0);
          setValue3(0);
          setValue4(0);
          setValue5(0);
          setValue6(0);
          setComment1("");
          setComment2("");
          setComment3("");
          setComment4("");
          setComment5("");
          setComment6("");
        }}
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2
                      class="portfolio-modal-title text-secondary text-uppercase mb-0"
                      id="portfolioModal1Label"
                    >
                      Questionnaire
                    </h2>
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
                          <h5 className="questions__styling">
                            3. Rate the frequency of breastfeeding.
                          </h5>
                          <Slider
                            defaultValue={0}
                            min={0}
                            max={10}
                            step={1}
                            onChange={(e) => {
                              setHeight(e);
                              setValue3(e);
                            }}
                            marks={heightMarks}
                            style={{ width: "100%" }}
                          />
                          <br />

                          <h5 className="questionnaire__value">
                            You selected {value3}
                          </h5>
                          <br />
                          <br />
                          <textarea
                            className="question__comments"
                            placeholder="Please provide additional comments"
                            id="reason"
                            type="text"
                            value={comment3}
                            onChange={(e) => setComment3(e.target.value)}
                          />
                          <br />
                        </div>
                      </div>
                      <div className="left_align">
                        <Button
                          className="text-uppercase font-weight-bold bg-primary text-white"
                          classes={{ label: "questionBackButton__styling" }}
                          onClick={() => {
                            setPartProfileModal(false);
                            setQuestModal1(false);
                            setQuestModal2(true);
                            setQuestModal3(false);
                          }}
                        >
                          <NavigateBeforeIcon />
                          Back
                        </Button>
                        <br />
                      </div>
                      <div className="right_align">
                        <Button
                          className="text-uppercase font-weight-bold bg-primary text-white"
                          classes={{ label: "questionButton__styling" }}
                          onClick={() => {
                            setPartProfileModal(false);
                            setQuestModal1(false);
                            setQuestModal2(false);
                            setQuestModal3(false);
                            setQuestModal4(true);
                          }}
                        >
                          Next
                          <NavigateNextIcon />
                        </Button>

                        <h3></h3>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Question 4 */}
      <Modal
        open={questModal4}
        onClose={() => {
          setQuestModal4(false);
          setValue1(0);
          setValue2(0);
          setValue3(0);
          setValue4(0);
          setValue5(0);
          setValue6(0);
          setComment1("");
          setComment2("");
          setComment3("");
          setComment4("");
          setComment5("");
          setComment6("");
        }}
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2
                      class="portfolio-modal-title text-secondary text-uppercase mb-0"
                      id="portfolioModal1Label"
                    >
                      Questionnaire
                    </h2>
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
                          <h5 className="questions__styling">
                            4. Rate the mother's hunger levels
                          </h5>
                          <Slider
                            defaultValue={0}
                            min={0}
                            max={10}
                            step={1}
                            onChange={(e) => {
                              setHeight(e);
                              setValue4(e);
                            }}
                            marks={heightMarks}
                            style={{ width: "100%" }}
                          />
                          <br />

                          <h5 className="questionnaire__value">
                            You selected {value4}
                          </h5>
                          <br />
                          <br />
                          <textarea
                            className="question__comments"
                            placeholder="Please provide additional comments"
                            id="reason"
                            type="text"
                            value={comment4}
                            onChange={(e) => setComment4(e.target.value)}
                          />
                          <br />
                        </div>
                      </div>
                      <div className="left_align">
                        <Button
                          className="text-uppercase font-weight-bold bg-primary text-white"
                          classes={{ label: "questionBackButton__styling" }}
                          onClick={() => {
                            setPartProfileModal(false);
                            setQuestModal1(false);
                            setQuestModal2(false);
                            setQuestModal3(true);
                            setQuestModal4(false);
                          }}
                        >
                          <NavigateBeforeIcon />
                          Back
                        </Button>
                        <br />
                      </div>
                      <div className="right_align">
                        <Button
                          className="text-uppercase font-weight-bold bg-primary text-white"
                          classes={{ label: "questionButton__styling" }}
                          onClick={() => {
                            setPartProfileModal(false);
                            setQuestModal1(false);
                            setQuestModal2(false);
                            setQuestModal3(false);
                            setQuestModal4(false);
                            setQuestModal5(true);
                          }}
                        >
                          Next
                          <NavigateNextIcon />
                        </Button>
                        <h3></h3>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Question 5 */}

      <Modal
        open={questModal5}
        onClose={() => {
          setQuestModal5(false);
          setValue1(0);
          setValue2(0);
          setValue3(0);
          setValue4(0);
          setValue5(0);
          setValue6(0);
          setComment1("");
          setComment2("");
          setComment3("");
          setComment4("");
          setComment5("");
          setComment6("");
        }}
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2
                      class="portfolio-modal-title text-secondary text-uppercase mb-0"
                      id="portfolioModal1Label"
                    >
                      Questionnaire
                    </h2>
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
                          <h5 className="questions__styling">
                            5. Rate the mother's appetite with 10 being the
                            best.
                          </h5>
                          <Slider
                            defaultValue={0}
                            min={0}
                            max={10}
                            step={1}
                            onChange={(e) => {
                              setHeight(e);
                              setValue5(e);
                            }}
                            marks={heightMarks}
                            style={{ width: "100%" }}
                          />
                          <br />

                          <h5 className="questionnaire__value">
                            You selected {value5}
                          </h5>
                          <br />
                          <br />
                          <textarea
                            className="question__comments"
                            placeholder="Please provide additional comments"
                            id="reason"
                            type="text"
                            value={comment5}
                            onChange={(e) => setComment5(e.target.value)}
                          />
                          <br />
                        </div>
                      </div>
                      <div className="left_align">
                        <Button
                          className="text-uppercase font-weight-bold bg-primary text-white"
                          classes={{ label: "questionBackButton__styling" }}
                          onClick={() => {
                            setPartProfileModal(false);
                            setQuestModal1(false);
                            setQuestModal2(false);
                            setQuestModal3(false);
                            setQuestModal4(true);
                            setQuestModal5(false);
                          }}
                        >
                          <NavigateBeforeIcon />
                          Back
                        </Button>
                        <br />
                      </div>
                      <div className="right_align">
                        <Button
                          className="text-uppercase font-weight-bold bg-primary text-white"
                          classes={{ label: "questionButton__styling" }}
                          onClick={() => {
                            setPartProfileModal(false);
                            setQuestModal1(false);
                            setQuestModal2(false);
                            setQuestModal3(false);
                            setQuestModal4(false);
                            setQuestModal5(false);
                            setQuestModal6(true);
                          }}
                        >
                          Next
                          <NavigateNextIcon />
                        </Button>
                        <h3></h3>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Question 6 */}
      <Modal
        open={questModal6}
        onClose={() => {
          setQuestModal6(false);
          setValue1(0);
          setValue2(0);
          setValue3(0);
          setValue4(0);
          setValue5(0);
          setValue6(0);
          setComment1("");
          setComment2("");
          setComment3("");
          setComment4("");
          setComment5("");
          setComment6("");
        }}
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <h2
                      class="portfolio-modal-title text-secondary text-uppercase mb-0"
                      id="portfolioModal1Label"
                    >
                      Questionnaire
                    </h2>
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
                          <h5 className="questions__styling">
                            6. Rate the quality of supplementary foods if any.
                          </h5>
                          <Slider
                            defaultValue={0}
                            min={0}
                            max={10}
                            step={1}
                            onChange={(e) => {
                              setHeight(e);
                              setValue6(e);
                            }}
                            marks={heightMarks}
                            style={{ width: "100%" }}
                          />
                          <br />

                          <h5 className="questionnaire__value">
                            You selected {value6}
                          </h5>
                          <br />
                          <br />
                          <textarea
                            className="question__comments"
                            placeholder="Please provide additional comments"
                            id="reason"
                            type="text"
                            value={comment6}
                            onChange={(e) => setComment6(e.target.value)}
                          />
                          <br />
                        </div>
                      </div>
                      <div className="left_align">
                        <Button
                          className="text-uppercase font-weight-bold bg-primary text-white"
                          classes={{ label: "questionBackButton__styling" }}
                          onClick={() => {
                            setPartProfileModal(false);
                            setQuestModal1(false);
                            setQuestModal2(false);
                            setQuestModal3(false);
                            setQuestModal4(false);
                            setQuestModal5(true);
                            setQuestModal6(false);
                          }}
                        >
                          <NavigateBeforeIcon />
                          Back
                        </Button>
                        <br />
                      </div>
                      <div className="right_align">
                        <Button
                          className="text-uppercase font-weight-bold bg-primary text-white"
                          classes={{ label: "questionButton__styling" }}
                          onClick={() => {
                            setPartProfileModal(false);
                            setQuestModal1(false);
                            setQuestModal2(false);
                            setQuestModal3(false);
                            setQuestModal4(false);
                            setQuestModal5(false);
                            setQuestModal6(false);
                            postReport();
                          }}
                        >
                          Submit
                        </Button>
                        <h3></h3>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal //Participant Profile
        open={progressModal} //state to keep track if its open
        onClose={() => {
          setProgressModal(false);
        }} //onClose method. closes the model when anywhere else on the screen is clicked
      >
        <div
          class="modal-dialog modal-xl  modal-dialog-scrollable "
          role="document"
        >
          <div class="modal-content">
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center ">
                  <div class="col-lg-8">
                    <div className="alignInfo">
                      <CloseIcon
                        className="icon"
                        style={{ fontWeight: "bold" }}
                        type="button"
                        onClick={() => {
                          setPartProfileModal(false);
                          setQuestModal1(false);
                          setQuestModal2(false);
                          setQuestModal3(false);
                          setQuestModal4(false);
                          setQuestModal5(false);
                          setQuestModal6(false);
                          setProgressModal(false);
                        }}
                      ></CloseIcon>
                    </div>
                    <h2
                      class="portfolio-modal-title text-secondary text-uppercase mb-0"
                      id="portfolioModal1Label"
                    >
                      Progress Report
                    </h2>
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon">
                        <GradeRoundedIcon style={{ fontSize: 40 }} />
                      </div>
                      <div class="divider-custom-line"></div>
                    </div>
                    {reports.map(({ reportId, reportss }) => (
                      <>
                        <span className="hideDis">{(j = j + 1)}</span>
                        <Reports
                          userId={userId}
                          name={name}
                          address={address}
                          reportId={reportId}
                          reportss={reportss}
                          value1={reportss.value1}
                          value2={reportss.value2}
                          value3={reportss.value3}
                          value4={reportss.value4}
                          value5={reportss.value5}
                          value6={reportss.value6}
                          j={j}
                          solution1={solution1}
                          solution2={solution2}
                          solution3={solution3}
                          solution4={solution4}
                          solution5={solution5}
                          solution6={solution6}
                        ></Reports>
                        <p></p>

                        {/*  store each answer from q1 to q6
                        in an array of numbers */}
                        <span className="hideDis">
                          {(numbers1[a] = reportss.value1)}
                        </span>
                        <span className="hideDis">
                          {(numbers2[a] = reportss.value2)}
                        </span>
                        <span className="hideDis">
                          {(numbers3[a] = reportss.value3)}
                        </span>
                        <span className="hideDis">
                          {(numbers4[a] = reportss.value4)}
                        </span>
                        <span className="hideDis">
                          {(numbers5[a] = reportss.value5)}
                        </span>
                        <span className="hideDis">
                          {(numbers6[a] = reportss.value6)}
                        </span>

                        <span className="hideDis">
                          {numbers1.map((number) => number)}
                        </span>
                        <span className="hideDis">
                          {numbers2.map((number) => number)}
                        </span>
                        <span className="hideDis">
                          {numbers3.map((number) => number)}
                        </span>
                        <span className="hideDis">
                          {numbers4.map((number) => number)}
                        </span>
                        <span className="hideDis">
                          {numbers5.map((number) => number)}
                        </span>
                        <span className="hideDis">
                          {numbers6.map((number) => number)}
                        </span>
                        <span className="hideDis">{(a = a + 1)}</span>
                      </>
                    ))}
                    <br></br>

                    <span className="hideDis">
                      {solution1 < 5 ? (flag1 = "Yes") : (flag1 = "No")}
                      {solution2 < 5 ? (flag2 = "Yes") : (flag2 = "No")}
                      {solution3 < 5 ? (flag3 = "Yes") : (flag3 = "No")}
                      {solution4 < 5 ? (flag4 = "Yes") : (flag4 = "No")}
                      {solution5 < 5 ? (flag5 = "Yes") : (flag5 = "No")}
                      {solution6 < 5 ? (flag6 = "Yes") : (flag6 = "No")}
                    </span>
                    {/* HARDCODED SHIT*/}
                    {average == "" ? (
                      <button
                        onClick={() => {
                          setAverage("1");
                          setSolution1(
                            (
                              numbers1.reduce(function (total, amount) {
                                return total + amount;
                              }) / a
                            ).toFixed(2) //convert average to 2 decimal places
                          );
                          setSolution2(
                            (
                              numbers2.reduce(function (total, amount) {
                                return total + amount;
                              }) / a
                            ).toFixed(2)
                          );
                          setSolution3(
                            (
                              numbers3.reduce(function (total, amount) {
                                return total + amount;
                              }) / a
                            ).toFixed(2)
                          );
                          setSolution4(
                            (
                              numbers4.reduce(function (total, amount) {
                                return total + amount;
                              }) / a
                            ).toFixed(2)
                          );
                          setSolution5(
                            (
                              numbers5.reduce(function (total, amount) {
                                return total + amount;
                              }) / a
                            ).toFixed(2)
                          );
                          setSolution6(
                            (
                              numbers6.reduce(function (total, amount) {
                                return total + amount;
                              }) / a
                            ).toFixed(2)
                          );
                        }}
                        className="avg"
                      >
                        Average
                      </button>
                    ) : (
                      <>
                        <center>
                          <span
                            className="average"
                            onClick={() => setAverage("")}
                          >
                            <h4>Average</h4>
                          </span>
                          <Chart
                            chartType="Table"
                            loader={<div>Loading Chart</div>}
                            data={[
                              [
                                { type: "string", label: "Question" },
                                { type: "number", label: "Average" },
                                { type: "string", label: "Flag" },
                              ],
                              ["Baby's latch", { v: solution1 }, flag1],
                              ["Baby's appetite", { v: solution2 }, flag2],
                              [
                                "Frequency of breastfeeding",
                                { v: solution3 },
                                flag3,
                              ],
                              [
                                "Mother's hunger levels",
                                { v: solution4 },
                                flag4,
                              ],
                              ["Mothers's appetite", { v: solution5 }, flag5],
                              [
                                "Quality of supplementary foods",
                                { v: solution6 },
                                flag6,
                              ],
                            ]}
                            options={{
                              showRowNumber: true,
                              width: "100%",
                            }}
                            rootProps={{ "data-testid": "1" }}
                            legendToggle
                          />
                        </center>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal //Participant Profile
        open={progress2Modal} //state to keep track if its open
        onClose={() => {
          setProgress2Modal(false);
        }} //onClose method. closes the model when anywhere else on the screen is clicked
      >
        <div
          class="modal-dialog modal-xl  modal-dialog-scrollable "
          role="document"
        >
          <div class="modal-content">
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center ">
                  <div class="col-lg-8">
                    <h2
                      class="portfolio-modal-title text-secondary text-uppercase mb-0"
                      id="portfolioModal1Label"
                    >
                      Progress 2 Report
                    </h2>
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon">
                        <GradeRoundedIcon style={{ fontSize: 40 }} />
                      </div>
                      <div class="divider-custom-line"></div>
                    </div>

                    {reports.map(({ reportId, reportss }) => (
                      <>
                        <span className="hideDis">{(j = j + 1)}</span>

                        <Report2
                          userId={userId}
                          name={name}
                          address={address}
                          reportId={reportId}
                          reportss={reportss}
                          value1={reportss.value1}
                          value2={reportss.value2}
                          value3={reportss.value3}
                          value4={reportss.value4}
                          value5={reportss.value5}
                          value6={reportss.value6}
                          j={j}
                        ></Report2>
                        <p></p>
                      </>
                    ))}
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

export default Participants;

import { useState } from "react";
import "./Participants.css";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "./firebase";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Modal from "@material-ui/core/Modal";
import "./components/QuestionnairePage.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

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
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
  },
}));
function Participants({ uid, setUid, userId, name, address }) {
  const [height, setHeight] = useState("");
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);
  const [value6, setValue6] = useState(0);
  const [modalStyle] = useState(getModalStyle);
  const [partProfileModal, setPartProfileModal] = useState(false);
  const [questModal1, setQuestModal1] = useState(false);
  const [questModal2, setQuestModal2] = useState(false);
  const [questModal3, setQuestModal3] = useState(false);
  const [questModal4, setQuestModal4] = useState(false);
  const [questModal5, setQuestModal5] = useState(false);
  const [questModal6, setQuestModal6] = useState(false);

  const [progressModal, setProgressModal] = useState(false);

  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [comment3, setComment3] = useState("");
  const [comment4, setComment4] = useState("");
  const [comment5, setComment5] = useState("");
  const [comment6, setComment6] = useState("");
  const classes = useStyles();

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

  //function that submits comment into database for a specific post
  const postReport = (event) => {
    //event.preventDefault();

    db.collection("users").doc(userId).collection("reports").add({
      value1: value1,
      comment1: comment1,
      value2: value2,
      comment2: comment2,
      value3: value3,
      comment3: comment3,
      value4: value4,
      comment4: comment4,
      value5: value5,
      comment5: comment5,
      value6: value6,
      comment6: comment6,
    });
  };
  return (
    <div className="participants">
      <Button
        component={Link}
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
                    <form id="signupForm" name="sentMessage">
                      <h3></h3>
                      <div class="control-group">
                        <div class="form-group floating-label-form-group controls mb-0 pb-2">
                          <Button
                            className=" text-uppercase font-weight-bold bg-primary text-white rounded"
                            classes={{ label: "button__styling" }}
                            onClick={() => {
                              setPartProfileModal(false);
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
                          <p class="help-block text-danger"></p>
                        </div>
                      </div>

                      <br />
                      <div id="success"></div>
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
                      <Button
                        className="text-uppercase font-weight-bold bg-primary text-white"
                        classes={{ label: "questionButton__styling" }}
                        onClick={() => {
                          setPartProfileModal(true);
                          setQuestModal1(false);
                        }}
                        style={{ float: left }}
                      >
                        Back
                        <NavigateBeforeIcon />
                      </Button>
                      <br />
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
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

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
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

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
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

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
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

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
                            5. Rate the baby's appetite with 10 being the best.
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
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

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
                            6. Rate the quality of supplemenetray foods if any.
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
                    </form>
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

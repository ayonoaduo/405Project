import React, { useState } from "react";
import "./QuestionnairePage.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { db } from "../firebase";

function QuestionnairePage({ name, userId, uid }) {
  const [height, setHeight] = useState("");
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);
  const [value5, setValue5] = useState(0);
  const [value6, setValue6] = useState(0);

  const [comment1, setComment1] = useState("");
  const [comment2, setComment2] = useState("");
  const [comment3, setComment3] = useState("");
  const [comment4, setComment4] = useState("");
  const [comment5, setComment5] = useState("");
  const [comment6, setComment6] = useState("");

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
    event.preventDefault();

    db.collection("users").doc(uid).collection("reports").add({
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
    <div>
      <div className="questionnaire__styling">
        <h1 className="header__styling">Questionnaire Page</h1>
        <br />
        <h4>{uid}</h4>
        <br />
        <h5 className="questions__styling">1. Rate the baby's latch.</h5>
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
        <h5 className="questionnaire__value">You selected {value1}</h5>

        <br />
        <br />
        <textarea
          className="question__comments"
          placeholder="Please provide additional comments"
          // id="reason"
          type="text"
          value={comment1}
          onChange={(e) => setComment1(e.target.value)}
        />
        <br />
        <br />
        <br />
        <h3>{comment1}</h3>
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

        <h5 className="questionnaire__value">You selected {value2}</h5>
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
        <br />
        <br />

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

        <h5 className="questionnaire__value">You selected {value3}</h5>
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
        <br />
        <br />

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

        <h5 className="questionnaire__value">You selected {value4}</h5>
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
        <br />
        <br />

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

        <h5 className="questionnaire__value">You selected {value5}</h5>
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
        <br />
        <br />

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

        <h5 className="questionnaire__value">You selected {value6}</h5>
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
        <br />
        <br />
        <button
          className="questionnaire_Submit"
          type="submit"
          onClick={postReport}
        >
          Submit
        </button>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default QuestionnairePage;

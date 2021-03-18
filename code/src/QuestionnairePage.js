import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import Button from "@material-ui/core/Button";
import { auth } from "./firebase";
import { Link } from "react-router-dom";
import "./QuestionnairePage.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function QuestionnairePage({ user, setOpenSignIn }) {
  const [height, setHeight] = useState("");
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
  return (
    <div>
      <div className="questionnaire__styling">
        <h1 className="header__styling">Questionnaire Page</h1>
        <br />
        <br />
        <h5 className="questions__styling">1. Rate the baby's latch.</h5>
        <Slider
          defaultValue={0}
          min={0}
          max={10}
          step={1}
          onChange={(e) => setHeight(e)}
          marks={heightMarks}
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <textarea
          className="question__comments"
          placeholder="Please provide additional comments"
          id="reason"
          type="text"
        />
        <br />
        <br />
        <br />

        <h5 className="questions__styling">
          2. Rate the baby's appetite with 10 being the best.
        </h5>
        <Slider
          defaultValue={0}
          min={0}
          max={10}
          step={1}
          onChange={(e) => setHeight(e)}
          marks={heightMarks}
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <textarea
          className="question__comments"
          placeholder="Please provide additional comments"
          id="reason"
          type="text"
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
          onChange={(e) => setHeight(e)}
          marks={heightMarks}
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <textarea
          className="question__comments"
          placeholder="Please provide additional comments"
          id="reason"
          type="text"
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
          onChange={(e) => setHeight(e)}
          marks={heightMarks}
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <textarea
          className="question__comments"
          placeholder="Please provide additional comments"
          id="reason"
          type="text"
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
          onChange={(e) => setHeight(e)}
          marks={heightMarks}
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <textarea
          className="question__comments"
          placeholder="Please provide additional comments"
          id="reason"
          type="text"
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
          onChange={(e) => setHeight(e)}
          marks={heightMarks}
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <textarea
          className="question__comments"
          placeholder="Please provide additional comments"
          id="reason"
          type="text"
        />
        <br />
        <br />
        <br />

        <h5 className="questions__styling">7. Lorem Ipsum</h5>
        <Slider
          defaultValue={0}
          min={0}
          max={10}
          step={1}
          onChange={(e) => setHeight(e)}
          marks={heightMarks}
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <textarea
          className="question__comments"
          placeholder="Please provide additional comments"
          id="reason"
          type="text"
        />
        <br />
        <br />
        <br />

        <h5 className="questions__styling">8. Lorem Ipsum</h5>
        <Slider
          defaultValue={0}
          min={0}
          max={10}
          step={1}
          onChange={(e) => setHeight(e)}
          marks={heightMarks}
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <textarea
          className="question__comments"
          placeholder="Please provide additional comments"
          id="reason"
          type="text"
        />
        <br />
        <br />
        <br />

        <h5 className="questions__styling">9. Lorem Ipsum</h5>
        <Slider
          defaultValue={0}
          min={0}
          max={10}
          step={1}
          onChange={(e) => setHeight(e)}
          marks={heightMarks}
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <textarea
          className="question__comments"
          placeholder="Please provide additional comments"
          id="reason"
          type="text"
        />
        <br />
        <br />
        <br />

        <h5 className="questions__styling">10. Lorem Ipsum</h5>
        <Slider
          defaultValue={0}
          min={0}
          max={10}
          step={1}
          onChange={(e) => setHeight(e)}
          marks={heightMarks}
          style={{ width: "100%" }}
        />
        <br />
        <br />
        <textarea
          className="question__comments"
          placeholder="Please provide additional comments"
          id="reason"
          type="text"
        />
        <br />
        <br />
        <br />
      </div>
      <div></div>
    </div>
  );
}

export default QuestionnairePage;

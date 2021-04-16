import React from "react";
import { useState } from "react";
import { db } from "./firebase";
import Chart from "react-google-charts";
import "./Reports.css";

function Reports({
  uid,
  setUid,
  userId,
  name,
  address,
  user,
  userr,
  reportId,
  reportss,
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
  j,
  solution1,
  solution2,
  solution3,
  solution4,
  solution5,
  solution6,
}) {
  return (
    <div>
      {/* Prints on flag column. Flag if a question if its average is greater than 5 */}

      <div className="chart_div">
        <h4>Report {j}</h4>
        <center>
          <Chart
            chartType="Table"
            loader={<div>Loading Chart</div>}
            data={[
              [
                { type: "string", label: "Question" },
                { type: "number", label: "Answer" },
              ],
              ["Baby's latch", { v: value1 }],
              ["Baby's appetite", { v: value2 }],
              ["Frequency of breastfeeding", { v: value3 }],
              ["Mother's hunger levels", { v: value4 }],
              ["Mothers's appetite", { v: value5 }],
              ["Quality of supplementary foods", { v: value6 }],
            ]}
            options={{
              showRowNumber: true,
              width: "100%",
            }}
            rootProps={{ "data-testid": "1" }}
            legendToggle
          />
        </center>
      </div>
    </div>
  );
}

export default Reports;

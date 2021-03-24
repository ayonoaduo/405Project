import React from "react";
import "./Reports.css";
import firebase from "firebase";
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
function Reports({ user }) {
  return (
    <div>
      <div class="chart_div" id="chart_div">
        <h5>Test</h5>
        <button onClick={google.charts.setOnLoadCallback(drawChart)}>
          Draw Chart
        </button>
      </div>
    </div>
  );
}

export default Reports;

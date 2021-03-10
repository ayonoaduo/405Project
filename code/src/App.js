import React from "react";
import "./App.css";
import Home from "./Home";
//import Profile from "./Profile";
//import AdminPage from "./AdminPage";
import { Route, Switch } from "react-router-dom";
//import ActiveReports from "./ActiveReports";

function App() {
  return (
    <div>
      {/* <Navigation/> */}
      <Switch>
        <Route exact path="/" component={Home}></Route>
        {/* <Route exact path="/Profile" component={Profile}></Route>
        <Route exact path="/AdminPage" component={AdminPage}></Route>
        <Route exact path="/ActiveReports" component={ActiveReports}></Route> */}
      </Switch>
      {/* </div>  */}
    </div>
  );
}

export default App;

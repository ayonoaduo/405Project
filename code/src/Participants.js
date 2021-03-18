import React, { useEffect, useState } from "react";
import "./Participants.css";
import { db } from "./firebase";
function Participants({ userId, user, name, address }) {
  return (
    <div className="participants">
      <button className="text-uppercase font-weight-bold bg-primary text-white rounded">
        {name}
      </button>
    </div>
  );
}

export default Participants;

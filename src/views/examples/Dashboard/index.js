import React from "react";
import jwtDecode from "jwt-decode";
import CeoDashboard from "./ceoDashboard";
import EMPDashboard from "./empDashboard";

const index = () => {
 let user;
  if (localStorage.getItem("userDetail")) {
    user = jwtDecode(localStorage.getItem("userDetail")).foundUser;
  }
  return (
    <div>
      {user.ability === "CEO_ABILITY" && <CeoDashboard />}
      {user.ability !== "CEO_ABILITY" && <EMPDashboard />}
    </div>
  );
};

export default index;

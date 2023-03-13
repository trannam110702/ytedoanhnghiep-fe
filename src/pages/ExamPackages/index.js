import React from "react";
import ForAdmin from "./ForAdmin";
import ForEnterprise from "./ForEnterprise";
const index = () => {
  switch (localStorage.getItem("role")) {
    case "admin":
      return <ForAdmin />;
    case "enterprise":
      return <ForEnterprise />;
    default:
      return <></>;
  }
};

export default index;

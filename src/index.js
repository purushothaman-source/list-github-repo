import React from "react";
import ReactDOM from "react-dom/client";

import { Apollo } from "./apolloConfig";
import Mainpage from "./components/Mainpage/Mainpage";

console.log("prinf");

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Apollo>
    <Mainpage />
  </Apollo>
);

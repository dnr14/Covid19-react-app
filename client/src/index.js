import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import GlobalStyled, { AppWrapper } from "assets/style/styled";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyled />
    <AppWrapper>
      <App />
    </AppWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);

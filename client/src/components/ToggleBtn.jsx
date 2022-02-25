import React, { useState } from "react";
import { ToggleBtnStyled } from "assets/style/styled";

const ToggleBtn = () => {
  const [onOff, setOnoff] = useState(false);

  const handleOnOffClick = () => {
    const textValues = document.querySelectorAll(".textValue");
    textValues.forEach((textValue) => {
      textValue.style.fontWeight = "bold";
      onOff ? (textValue.style.opacity = 0) : (textValue.style.opacity = 1);
    });
    setOnoff(!onOff);
  };

  return (
    <ToggleBtnStyled>
      <span>on / off</span>
      <label className="toggle-container">
        <input type="checkbox" className="real-checkbox" />
        <div className="toggle-button" onClick={handleOnOffClick}></div>
      </label>
    </ToggleBtnStyled>
  );
};

export default React.memo(ToggleBtn);

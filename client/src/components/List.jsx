import React, { useState } from "react";
import { StyledList } from "./style/styled";

const List = ({ setCurrnetProperty, currnetProperty }) => {
  const handleClick = (e) => {
    setCurrnetProperty(e.target.dataset.property);
  };

  const [lis] = useState([
    {
      name: "사망자",
      property: "deathCnt",
    },
    {
      name: "격리 해제",
      property: "clearCnt",
    },
    {
      name: "확진자",
      property: "decideCnt",
    },
    {
      name: "검사 진행",
      property: "examCnt",
    },
    {
      name: "치료자",
      property: "careCnt",
    },
  ]);

  return (
    <StyledList>
      {lis.map((li, idx) => (
        <li key={idx}>
          <span onClick={handleClick} className={li.property === currnetProperty ? "selected" : null} data-property={li.property}>
            {li.name}
          </span>
        </li>
      ))}
    </StyledList>
  );
};

export default List;

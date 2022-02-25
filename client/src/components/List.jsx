import React, { useState } from "react";
import { StyledList } from "assets/style/styled";

const List = ({ setCurrnetProperty, currnetProperty }) => {
  const handleClick = (e) => {
    setCurrnetProperty(e.target.dataset.property);
  };

  // 치료자 격리해제가 더 이상 제공을 안해주는거 같다.
  // api가 끊이기전에 미리 포트폴리오를 만들자.
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
      property: "accExamCnt",
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
          <span
            onClick={handleClick}
            className={li.property === currnetProperty ? "selected" : null}
            data-property={li.property}
          >
            {li.name}
          </span>
        </li>
      ))}
    </StyledList>
  );
};

export default React.memo(List);

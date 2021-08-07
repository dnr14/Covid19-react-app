import React from "react";
import { StyledSelect } from "./style/styled";

const SelectBox = ({ setSearchType, searchType }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchType(value);
  };

  return (
    <div className="covid--apiCall">
      <span>날짜 단위</span>
      <StyledSelect defaultValue={searchType} onChange={handleChange}>
        <option value="month">월</option>
        <option value="day">일</option>
      </StyledSelect>
    </div>
  );
};

export default SelectBox;

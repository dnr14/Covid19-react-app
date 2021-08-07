import React from "react";

const SelectBox = ({ setSearchType, searchType }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchType(value);
  };

  return (
    <select defaultValue={searchType} onChange={handleChange}>
      <option value="month">월</option>
      <option value="day">일</option>
    </select>
  );
};

export default SelectBox;

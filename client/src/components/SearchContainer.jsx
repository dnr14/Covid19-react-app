import React, { useState } from "react";
import getInitialDate, { monthInitailDate } from "util/DateUtil";
import DaySearch from "./DaySearch";
import MonthSearch from "./MonthSearch";
import SelectBox from "./SelectBox";

const SearchContainer = ({ setModalOnOff, setDate, covidApiData }) => {
  const [searchType, setSearchType] = useState("day");

  return (
    <>
      <SelectBox searchType={searchType} setSearchType={setSearchType} />
      {searchType === "day" ? (
        <DaySearch setModalOnOff={setModalOnOff} setDate={setDate} covidApiData={covidApiData} date={getInitialDate()} />
      ) : (
        <MonthSearch setModalOnOff={setModalOnOff} setDate={setDate} covidApiData={covidApiData} date={monthInitailDate()} />
      )}
    </>
  );
};

export default SearchContainer;

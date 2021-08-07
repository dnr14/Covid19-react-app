import React, { useRef, useState } from "react";
import { validation } from "util/DateUtil";
import deepEquals from "util/DeepEquals";
import Search from "./Search";

const DaySearch = ({ setModalOnOff, setDate, covidApiData, date }) => {
  const startInput = useRef(null);
  const endInput = useRef(null);
  const [text] = useState({ startText: "시작 날짜", endText: "종료 날짜" });

  const handleClick = () => {
    const startValue = startInput.current.value;
    const endValue = endInput.current.value;

    const currentDataObject = { [startInput.current.name]: startValue, [endInput.current.name]: endValue };

    if (validation(currentDataObject)) {
      setModalOnOff(true);
      return;
    }

    setDate((prevData) => {
      covidApiData.isShow = true;
      return covidApiData.isError ? { ...prevData } : deepEquals(prevData, { ...date, ...currentDataObject });
    });
  };

  return <Search date={date} handleClick={handleClick} startInput={startInput} endInput={endInput} text={text} />;
};

export default DaySearch;

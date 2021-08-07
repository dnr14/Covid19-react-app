import React, { useRef, useState } from "react";
import { endMonthCheck, startMonthCheck } from "util/DateUtil";
import deepEquals from "util/DeepEquals";
import Search from "./Search";

//해야될일
// 벨리데이션 , 보고싶은 데이터 셀렉터 , 셀렉터 박스 꾸미기

const MonthSearch = ({ setModalOnOff, setDate, covidApiData, date }) => {
  const startInput = useRef(null);
  const endInput = useRef(null);
  const [text] = useState({ startText: "시작 월", endText: "종료 월" });

  const handleChange = () => {
    const startValue = startMonthCheck(startInput.current.value);
    const endValue = endMonthCheck(endInput.current.value);
    startInput.current.value = startValue;
    endInput.current.value = endValue;
  };

  const handleClick = () => {
    const startValue = startInput.current.value;
    const endValue = endInput.current.value;

    const currentDataObject = { [startInput.current.name]: startValue, [endInput.current.name]: endValue };

    setDate((prevData) => {
      covidApiData.isShow = true;
      return covidApiData.isError ? { ...prevData } : deepEquals(prevData, { ...date, ...currentDataObject });
    });
  };

  return <Search date={date} handleChange={handleChange} handleClick={handleClick} startInput={startInput} endInput={endInput} text={text} />;
};

export default MonthSearch;

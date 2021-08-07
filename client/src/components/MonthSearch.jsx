import React, { useRef, useState } from "react";
import { endMonthCheck, monthValidation, startMonthCheck } from "util/DateUtil";
import deepEquals from "util/DeepEquals";
import Search from "./Search";

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

    if (monthValidation(currentDataObject)) {
      setModalOnOff({ current: true, titles: ["날짜를 확인하세요.", "최대 2달까지 가능", "빈값 입력 확인"] });
      return;
    }

    setDate((prevData) => {
      covidApiData.isShow = true;
      return covidApiData.isError ? { ...prevData } : deepEquals(prevData, { ...date, ...currentDataObject });
    });
  };

  return <Search date={date} handleChange={handleChange} handleClick={handleClick} startInput={startInput} endInput={endInput} text={text} />;
};

export default MonthSearch;

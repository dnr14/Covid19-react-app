import React, { useRef } from "react";
import { validation } from "util/DateUtil";
import deepEquals from "util/DeepEquals";

const DaySearch = ({ setModalOnOff, setDate, covidApiData, date }) => {
  const startInput = useRef(null);
  const endInput = useRef(null);

  const handleClick = () => {
    const startValue = startInput.current.value;
    const endValue = endInput.current.value;

    const currentDataObject = { [startInput.current.name]: startValue, [endInput.current.name]: endValue };

    // if (validation(currentDataObject)) {
    //   setModalOnOff(true);
    //   return;
    // }

    setDate((prevData) => {
      covidApiData.isShow = true;
      return covidApiData.isError ? { ...prevData } : deepEquals(prevData, { ...date, ...currentDataObject });
    });
  };

  return (
    <>
      <div className="covid--apiCall">
        <span>시작 날짜</span>
        <input ref={startInput} type="date" defaultValue={date.startData} name="startData" />
      </div>
      <div className="covid--apiCall">
        <span>종료 날짜</span>
        <input ref={endInput} type="date" defaultValue={date.endData} name="endData" />
      </div>
      <div className="covid--apiCall">
        <button type="button" onClick={handleClick}>
          검색
        </button>
      </div>
    </>
  );
};

export default DaySearch;

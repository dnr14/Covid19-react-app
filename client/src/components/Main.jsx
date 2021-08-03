import React, { useEffect, useRef, useState } from "react";
import { ImgLoding, Title, Row, Col, MaxWidthContainer } from "./styled";
import LineChart from "./LineChart";
import "scss/main.scss";
import useCurrentDivWidth from "hooks/useCurrentDivWidth";
import getInitialDate, { validation } from "util/DateUtil.js";
import deepEquals from "util/DeepEquals.js";
import useCovidApiCall from "hooks/useCovidApiCall";

const Main = () => {
  const [date, setDate] = useState(getInitialDate());
  const apiData = useCovidApiCall(date);

  const isShow = useRef(true);
  const divRef = useRef(null);
  const startInput = useRef(null);
  const endInput = useRef(null);
  const currentDivWidth = useCurrentDivWidth(divRef);

  // useEffect(() => {
  //   setTimeout(() => {
  //     isShow.current = false;
  //   }, 1000);
  // }, [date]);

  const handleClick = () => {
    const startValue = startInput.current.value;
    const endValue = endInput.current.value;

    const currentDataObject = { [startInput.current.name]: startValue, [endInput.current.name]: endValue };

    if (validation(currentDataObject)) {
      alert(" 날짜를 확인하세요. \n 최대 7일까지 \n 빈값 입력 확인");
      return;
    }

    setDate((prevData) => {
      isShow.current = true;
      return deepEquals(prevData, { ...date, ...currentDataObject });
    });
  };

  return (
    <section id="Main">
      <Row>
        <Col>
          <MaxWidthContainer>
            <Title>코로나 현황을 시각화로 확인해보세요.</Title>
            {isShow.current && <ImgLoding />}
            <div className="covid--search">
              <div className="covid--apiCall">
                <span>시작 날짜</span> <input ref={startInput} type="date" defaultValue={date.startData} name="startData" />
              </div>
              <div className="covid--apiCall">
                <span>종료 날짜</span> <input ref={endInput} type="date" defaultValue={date.endData} name="endData" />
              </div>
              <div className="covid--apiCall">
                <button type="button" onClick={handleClick}>
                  검색
                </button>
              </div>
            </div>
            <div className="chart--Container" ref={divRef}>
              <LineChart divWidth={currentDivWidth._100} items={apiData} dataProperty={"deathCnt"} chartTitle={"코로나 확진자 현황"} />
            </div>
          </MaxWidthContainer>
        </Col>
      </Row>
    </section>
  );
};

export default Main;

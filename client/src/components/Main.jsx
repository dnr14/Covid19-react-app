import React, { useRef, useState } from "react";
import { ImgLoding, Title, Row, Col, MaxWidthContainer, MainChartContainer, DateShow, CovidSearch } from "./style/styled";
import LineChart from "./chart/LineChart";
import useCurrentDivWidth from "hooks/useCurrentDivWidth";
import getInitialDate, { validation } from "util/DateUtil.js";
import deepEquals from "util/DeepEquals.js";
import chartTitleEnum from "util/ChartTitleEnum";
import useCovidApiCall from "hooks/useCovidApiCall";
import ToggleBtn from "./ToggleBtn";
import Modal from "./Modal";

const Main = () => {
  const [date, setDate] = useState(getInitialDate());
  const [modalOnOff, setModalOnOff] = useState(false);
  const divRef = useRef(null);
  const startInput = useRef(null);
  const endInput = useRef(null);
  const covidApiData = useCovidApiCall(date);
  const currentDivWidth = useCurrentDivWidth(divRef);

  //해야될일
  // 2. 월 별
  // 3. 년 별
  // 4. bar chart
  // 5. pie chart

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

  return (
    <section id="Main">
      {covidApiData.isShow && <ImgLoding />}
      <Row>
        <Col>
          <MaxWidthContainer>
            <Modal modalOnOff={modalOnOff} setModalOnOff={setModalOnOff} title={"날짜를 확인하세요. 최대 7일까지 빈값 입력 확인"} />
            <Title>코로나 데이터를 시각화로 확인해보세요.</Title>
            <DateShow>
              <span>검색한 데이터 날짜</span>
              <span>{date.startData}</span>
              <span>~</span>
              <span>{date.endData}</span>
            </DateShow>
            <CovidSearch>
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
            </CovidSearch>
            <MainChartContainer>
              <div ref={divRef}>
                <ToggleBtn />
                <LineChart
                  divWidth={currentDivWidth._100}
                  items={covidApiData.data}
                  dataProperty={"careCnt"}
                  chartTitle={chartTitleEnum["careCnt"]}
                />
              </div>
            </MainChartContainer>
          </MaxWidthContainer>
        </Col>
      </Row>
    </section>
  );
};

export default Main;

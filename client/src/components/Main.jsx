import React, { useRef, useState } from "react";
import { ImgLoding, Title, Row, Col, MaxWidthContainer, MainChartContainer, DateShow, CovidSearch } from "./style/styled";
import LineChart from "./chart/LineChart";
import useCurrentDivWidth from "hooks/useCurrentDivWidth";
import getInitialDate, { monthInitailDate } from "util/DateUtil.js";
import { BarChartTitleEnum, LineChartTitleEnum } from "util/ChartTitleEnum";
import useCovidApiCall from "hooks/useCovidApiCall";
import ToggleBtn from "./ToggleBtn";
import Modal from "./Modal";
import DaySearch from "./DaySearch";
import BarChart from "./chart/BarChart";
import MonthSearch from "./MonthSearch";
import SelectBox from "./SelectBox";

const Main = () => {
  const [date, setDate] = useState(getInitialDate());
  const [searchType, setSearchType] = useState("day");
  const [modalOnOff, setModalOnOff] = useState(false);
  const divRef = useRef(null);
  const covidApiData = useCovidApiCall(date);
  const currentDivWidth = useCurrentDivWidth(divRef);

  //해야될일
  // 2. 월 별
  // 이니셜데이터

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
              {searchType === "day" ? (
                <DaySearch setModalOnOff={setModalOnOff} setDate={setDate} covidApiData={covidApiData} date={getInitialDate()} />
              ) : (
                <MonthSearch setModalOnOff={setModalOnOff} setDate={setDate} covidApiData={covidApiData} date={monthInitailDate()} />
              )}
              <SelectBox searchType={searchType} setSearchType={setSearchType} />
            </CovidSearch>
            <MainChartContainer>
              <div ref={divRef}>
                <ToggleBtn />
                <LineChart
                  divWidth={currentDivWidth._100}
                  items={covidApiData.data}
                  dataProperty={"clearCnt"}
                  chartTitle={LineChartTitleEnum["clearCnt"].title}
                  bottomText={LineChartTitleEnum["clearCnt"].bottomText}
                />
                <BarChart
                  divWidth={currentDivWidth._100}
                  items={covidApiData.data}
                  dataProperty={"clearCnt"}
                  chartTitle={BarChartTitleEnum["clearCnt"].title}
                  bottomText={BarChartTitleEnum["clearCnt"].bottomText}
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

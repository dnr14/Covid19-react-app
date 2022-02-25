import React, { useRef, useState } from "react";
import {
  MaxWidthContainer,
  Col,
  Row,
  FlexBox,
  HomeTitle,
  Loading,
  DateShow,
  HomeChartContainer,
} from "assets/style/styled";
import LineChart from "components/chart/LineChart";
import ToggleBtn from "components/ToggleBtn";
import useCurrentDivWidth from "hooks/useCurrentDivWidth.js";
import useCovidApiCall from "hooks/useCovidApiCall";
import getInitialDate from "util/DateUtil";
import { LineChartTitleEnum } from "util/ChartTitleEnum";

const Home = () => {
  const [date] = useState(getInitialDate());
  const covidApiData = useCovidApiCall(date);
  const divRef = useRef(null);
  const currentDivWidth = useCurrentDivWidth(divRef, 50);

  return (
    <section id="Home">
      <Row>
        <Col>
          <MaxWidthContainer>
            {covidApiData.isShow && <Loading />}
            <HomeChartContainer>
              <HomeTitle>코로나 현황 사이트 😷</HomeTitle>
              <DateShow>
                <span>{date.startData}</span>
                <span>~</span>
                <span>{date.endData}</span>
              </DateShow>
              <ToggleBtn />
              <FlexBox>
                <div className="flex-item" ref={divRef}>
                  <div className="flex-item--w50">
                    <LineChart
                      divWidth={currentDivWidth._50}
                      items={covidApiData.data}
                      dataProperty={"accExamCnt"}
                      chartTitle={LineChartTitleEnum["accExamCnt"].title}
                      bottomText={LineChartTitleEnum["accExamCnt"].bottomText}
                    />
                  </div>
                  <div className="flex-item--w50">
                    <LineChart
                      divWidth={currentDivWidth._50}
                      items={covidApiData.data}
                      dataProperty={"decideCnt"}
                      chartTitle={LineChartTitleEnum["decideCnt"].title}
                      bottomText={LineChartTitleEnum["decideCnt"].bottomText}
                    />
                  </div>
                </div>
                <div className="flex-item">
                  <LineChart
                    divWidth={currentDivWidth._100}
                    items={covidApiData.data}
                    dataProperty={"deathCnt"}
                    chartTitle={LineChartTitleEnum["deathCnt"].title}
                    bottomText={LineChartTitleEnum["deathCnt"].bottomText}
                  />
                </div>
              </FlexBox>
            </HomeChartContainer>
          </MaxWidthContainer>
        </Col>
      </Row>
    </section>
  );
};

export default Home;

import React, { useEffect, useRef, useState } from "react";
import { MaxWidthContainer, Col, Row, FlexBox, HomeTitle } from "./styled";
import "scss/home.scss";
import LineChart from "./LineChart";
import useCurrentDivWidth from "hooks/useCurrentDivWidth.js";
import getInitialDate from "util/DateUtil";
import { ImgLoding } from "./styled";
import useCovidApiCall from "hooks/useCovidApiCall";

const Home = () => {
  const divRef = useRef(null);
  const onOffRef = useRef(false);
  const currentDivWidth = useCurrentDivWidth(divRef, 50);
  const [date] = useState(getInitialDate());
  const apiData = useCovidApiCall(date);

  const isShow = useRef(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     isShow.current = false;
  //   }, 1000);
  // });

  const handleOnOffClick = () => {
    const textValues = document.querySelectorAll(".textValue");
    textValues.forEach((textValue) => {
      textValue.style.fontWeight = "bold";
      onOffRef.current ? (textValue.style.opacity = 0) : (textValue.style.opacity = 1);
    });
    onOffRef.current = !onOffRef.current;
  };

  return (
    <section id="Home">
      <Row>
        <Col>
          <MaxWidthContainer>
            {isShow.current && <ImgLoding />}
            <div className="charts--container">
              <HomeTitle>코로나 현황 사이트 😷</HomeTitle>
              <div className="toggleBox">
                <span>on / off</span>
                <label className="toggle-container">
                  <input type="checkbox" className="real-checkbox" />
                  <div className="toggle-button" onClick={handleOnOffClick}></div>
                </label>
              </div>
              <FlexBox>
                <div className="flex--item" ref={divRef}>
                  <div className="flex--item-w50">
                    {/* <LineChart divWidth={currentDivWidth._50} items={apiData} dataProperty={"examCnt"} chartTitle={"코로나 검사 진행 현황 😷"} /> */}
                    <LineChart divWidth={currentDivWidth._50} items={apiData} dataProperty={"deathCnt"} chartTitle={"코로나 검사 진행 현황 😷"} />
                  </div>
                  <div className="flex--item-w50">
                    <LineChart divWidth={currentDivWidth._50} items={apiData} dataProperty={"deathCnt"} chartTitle={"코로나 확진자 현황 🥶"} />
                    {/* <LineChart divWidth={currentDivWidth._50} items={apiData} dataProperty={"decideCnt"} chartTitle={"코로나 확진자 현황 🥶"} /> */}
                  </div>
                </div>
                <div className="flex--item">
                  <LineChart divWidth={currentDivWidth._100} items={apiData} dataProperty={"deathCnt"} chartTitle={"코로나 사망자 현황 💀"} />
                  {/* <LineChart divWidth={currentDivWidth._100} items={apiData} dataProperty={"deathCnt"} chartTitle={"코로나 사망자 현황 💀"} /> */}
                </div>
              </FlexBox>
            </div>
          </MaxWidthContainer>
        </Col>
      </Row>
    </section>
  );
};

export default Home;

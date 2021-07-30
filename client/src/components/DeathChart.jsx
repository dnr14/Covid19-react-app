import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import * as d3 from "d3";

const LineSvg = styled.svg`
  overflow: unset;
  border-top: 1px solid;
  border-left: 1px solid;
  background-color: rgba(127, 140, 141, 0.5);

  width: 100%;

  ${({ h }) =>
    h &&
    css`
      height: ${h}px;
    `}
`;

const optimizeAnimation = (callback) => {
  let ticking = false;
  return (e) => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        callback(e);
        ticking = false;
      });
    }
  };
};

const DeathChart = ({ deathCnt }) => {
  const [lineData, setLineData] = useState([0, 5, 34, 22, 50, 100, 70, 30]);
  const [lineDate, setLineDate] = useState(["02월 01일", "02월 02일", "02월 03일", "02월 04일", "02월 05일", "02월 06일", "02월 07일", "02월 08일"]);
  const [w, setW] = useState(700);
  const [h, setH] = useState(150);

  const lineRef = useRef(null);

  const render = (data) => {
    const svgLine = d3.select(lineRef.current);

    const xScale = d3
      .scaleLinear()
      .domain([0, lineData.length - 1])
      .range([0, w]);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(lineData.length)
      .tickFormat((index) => {
        return lineDate[index];
      })
      .tickPadding(10);

    svgLine.select(".x-axis").style("transform", `translateY(${h}px)`).call(xAxis);

    //domain 실제 값 범위
    //range 변환하고 싶은 비율
    const yScale = d3.scaleLinear().domain([0, 100]).range([h, 0]);

    //ticks 쪼개는 단위
    const yAxis = d3.axisRight(yScale).ticks(10).tickPadding(10);

    svgLine.select(".y-axis").style("transform", `translateX(${w}px)`).call(yAxis);

    // x 좌표
    // y 좌표
    const myLine = d3
      .line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(d3.curveBasis);

    svgLine
      .selectAll(".line")
      .data([lineData])
      .join("path")
      .attr("class", "line")
      .attr("d", (value) => myLine(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
  };

  useEffect(() => {
    render(lineData);
  }, [lineData, lineDate]);

  // const debounce = useRef(null);
  // const [chartSize, setChartSize] = useState({
  //   w: 778,
  //   h: 400,
  // });

  // useEffect(() => {
  //   setChartSize({
  //     w: svgRef.current.clientWidth,
  //     h: chartSize.h,
  //   });

  //   const handleResize = () => {
  //     if (debounce.current) {
  //       clearTimeout(debounce.current);
  //     }

  //     debounce.current = setTimeout(() => {
  //       setChartSize({
  //         w: svgRef.current.clientWidth,
  //         h: chartSize.h,
  //       });
  //     }, 100);
  //   };

  //   const clearEv = optimizeAnimation(handleResize);
  //   window.addEventListener("resize", clearEv);
  //   return () => {
  //     // cleanup
  //     window.removeEventListener("resize", clearEv);
  //   };
  // }, []);

  return (
    <div>
      <LineSvg ref={lineRef} width={w} height={h}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </LineSvg>

      <div>
        <button
          onClick={() => {
            setLineData([1, 2, 55, 8, 9, 35]);
            setLineDate(["02월 01일", "02월 02일", "02월 03일", "02월 04일", "02월 05일", "02월 06일"]);
          }}
        >
          데이터1
        </button>
      </div>
    </div>
  );
};

export default DeathChart;

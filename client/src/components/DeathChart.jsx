import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import * as d3 from "d3";

const LineSvg = styled.svg`
  overflow: unset;
  border-top: 1px solid;
  border-left: 1px solid;

  width: 100%;
  ${({ h }) =>
    h &&
    css`
      height: ${h}px;
    `}

  .point {
    cursor: pointer;
  }
`;

const DeathChart = ({ divWidth }) => {
  const data = [
    { index: 0, value: 0, date: "02월 01일" },
    { index: 1, value: 5, date: "02월 02일" },
    { index: 2, value: 55, date: "02월 03일" },
    { index: 3, value: 25, date: "02월 04일" },
    { index: 4, value: 35, date: "02월 05일" },
    { index: 5, value: 10, date: "02월 06일" },
    { index: 6, value: 85, date: "02월 07일" },
  ];

  const [testData, setTestData] = useState(data);

  const svgRef = useRef(null);

  const chartSize = {
    w: divWidth,
    h: 300,
  };

  // 첫 랜더때 state가 결정되어있다
  // null값을내려주는데
  //추후 부모쪽에서 props를 내려주는데도 초기화가안된다
  // props변경시 useState는 어떻게 작동하는지 알아봐야한다.
  // const [chartSize, setChartSize] = useState({
  //   w: divWidth,
  //   h: 500,
  // });

  const render = (data) => {
    const svgLine = d3.select(svgRef.current);

    //x축 크기
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, chartSize.w]);
    const xAxis = d3
      .axisBottom(xScale)
      // .tickSize(h)
      .ticks(data.length)
      //tickFormat에 들어오는 index는 ticks에서 넣어준 인자 값이다.
      .tickFormat((index) => data[index].date)
      .tickPadding(10);
    svgLine.select(".x-axis").style("transform", `translateY(${chartSize.h}px)`).call(xAxis);

    //domain 실제 값 범위
    //range 변환하고 싶은 비율
    //y축 크기

    // y축으로 표시 될 데이터 min,max를 구 해 준다
    // const Ydamain = d3.extent(data, (item) => item.value);
    // const yScale = d3.scaleLinear().domain(Ydamain).range([h, 0]);
    const YdamainMax = d3.max(data, (item) => item.value);
    const yScale = d3
      .scaleLinear()
      // 50을 추가해주는 이유는 그래프를 편히 보여주기 위해서이다.
      .domain([0, YdamainMax + 50])
      .range([chartSize.h, 0]);
    // const yAxis = d3.axisLeft(yScale).tickSize(-w).tickPadding(20);
    const yAxis = d3
      .axisRight(yScale)
      // .tickSize(w)
      .tickPadding(10)
      //데이터를 더 세분화해서 보여주기위해
      .ticks(YdamainMax / 2);
    // y축 데이터 표현 갯수
    svgLine.select(".y-axis").style("transform", `translateX(${chartSize.w}px)`).call(yAxis);

    //path태그 d속성 계산
    const myLine = d3
      .line()
      .x((d) => xScale(d.index))
      .y((d) => yScale(d.value));

    svgLine
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", (d) => myLine(d))
      .attr("fill", "none")
      .attr("stroke", "blue");

    //================================ circles =============================//
    const groups = svgLine.selectAll(".point").data(data);
    // g태그 > circle , text

    //update 패턴쪽에서 append하는 실수 하지말자
    const updateCircle = groups.select(".point-circle");
    const updateText = groups.select(".textValue");

    updateCircle
      .attr("class", "point-circle")
      .attr("r", "4")
      .attr("cx", (d) => xScale(d.index))
      .attr("cy", (d) => yScale(d.value))
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .on("mouseover", (event, date) => {
        const { target } = event;
        d3.select(target.nextSibling)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .style("font-weight", "bold")
          .attr("y", (d) => yScale(d.value) - 15);
        d3.select(target).transition().duration(100).attr("r", 8).attr("fill", "#fff");
      })
      .on("mouseleave", (event, date) => {
        const { target } = event;
        d3.select(target.nextSibling)
          .transition()
          .duration(200)
          .style("opacity", 0)
          .attr("y", (d) => yScale(d.value) - 20);
        d3.select(target).transition().duration(100).attr("r", 4).attr("fill", "#fff");
      });

    updateText
      .text((d) => d.value)
      .attr("x", (d) => xScale(d.index))
      .attr("class", "textValue")
      .attr("y", (d) => yScale(d.value) - 10)
      .style("color", "#222")
      .style("font-size", "0.85em")
      .attr("text-anchor", "middle");
    //새로운 g태그 생성 시

    // =========================== g태그 insert ============================//
    const enter = groups.enter().append("g").attr("class", "point");

    enter
      .append("circle")
      .attr("class", "point-circle")
      .attr("r", "4")
      .attr("cx", (d) => xScale(d.index))
      .attr("cy", (d) => yScale(d.value))
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .on("mouseover", (event, date) => {
        const { target } = event;
        d3.select(target.nextSibling)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .style("font-weight", "bold")
          .attr("y", (d) => yScale(d.value) - 15);
        d3.select(target).transition().duration(100).attr("r", 8).attr("fill", "#fff");
      })
      .on("mouseleave", (event, date) => {
        const { target } = event;
        d3.select(target.nextSibling)
          .transition()
          .duration(200)
          .style("opacity", 0)
          .attr("y", (d) => yScale(d.value) - 20);
        d3.select(target).transition().duration(100).attr("r", 4).attr("fill", "#fff");
      });

    enter
      .append("text")
      .text((d) => d.value)
      .attr("class", "textValue")
      .attr("x", (d) => xScale(d.index))
      .attr("y", (d) => yScale(d.value) - 20)
      .style("color", "#222")
      .style("font-size", "0.85em")
      .style("opacity", 0)
      .attr("text-anchor", "middle");

    // =========================== g태그 insert ============================//

    // ============================== exit ================================//
    groups.exit().remove();
    // ============================== exit ================================//

    //================================ circles =============================//

    svgLine
      .select(".yyyy")
      .datum("날짜 : 2021년")
      .text((d) => d)
      .attr("y", "-10")
      .attr("font-weight", "bold");

    // new Date형식 바꿔준다.
    // const parseDate = d3.timeFormat("%Y-%m-%d");

    // g태그 안쓸때
    // const circles = svgLine.selectAll(".point").data(data);

    // circles.exit().remove();
    // //update 패턴쪽에서 append하는 실수 하지말자
    // circles
    //   .attr("class", "point")
    //   .attr("r", "4")
    //   .attr("cx", (d) => xScale(d.index))
    //   .attr("cy", (d) => yScale(d.value))
    //   .attr("fill", "#ccc")
    //   .attr("stroke", "#000")
    //   .attr("stroke-width", 2);

    // circles
    //   .enter()
    //   .append("g")
    //   .append("circle")
    //   .attr("class", "point")
    //   .attr("r", "4")
    //   .attr("cx", (d) => xScale(d.index))
    //   .attr("cy", (d) => yScale(d.value))
    //   .attr("fill", "#ccc")
    //   .attr("stroke", "#000")
    //   .attr("stroke-width", 2);
  };

  useEffect(() => {
    render(testData);
  });

  return (
    <>
      <LineSvg ref={svgRef} width={chartSize.w} height={chartSize.h}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
        <text className="yyyy" />
      </LineSvg>

      <div style={{ marginTop: "50px" }}>
        <button
          onClick={() => {
            setTestData([
              { index: 0, value: 22, date: "02월 01일" },
              { index: 1, value: 5, date: "02월 02일" },
              { index: 2, value: 34, date: "02월 03일" },
              { index: 3, value: 66, date: "02월 04일" },
              { index: 4, value: 5, date: "02월 05일" },
              { index: 5, value: 5, date: "02월 07일" },
              { index: 6, value: 4, date: "02월 08일" },
              { index: 7, value: 0, date: "02월 09일" },
              { index: 8, value: 0, date: "02월 10일" },
            ]);
          }}
        >
          데이터1
        </button>
        <button
          onClick={() => {
            setTestData([
              { index: 0, value: 22, date: "02월 01일" },
              { index: 1, value: 52, date: "02월 02일" },
              { index: 2, value: 52, date: "02월 03일" },
              { index: 3, value: 52, date: "02월 03일" },
            ]);
          }}
        >
          데이터2
        </button>
      </div>
    </>
  );
};

export default DeathChart;

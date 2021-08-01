import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import * as d3 from "d3";
import { ticks } from "d3";

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

// 테스트 데이터
const _apiData = [
  {
    createDt: "2021-07-29 09:37:41.356",
    deathCnt: 2085,
  },
  {
    createDt: "2021-07-30 09:37:41.356",
    deathCnt: 2085,
  },
  {
    createDt: "2021-07-31 09:37:41.356",
    deathCnt: 2085,
  },
  {
    createDt: "2021-08-01 09:37:41.356",
    deathCnt: 2085,
  },
  {
    createDt: "2021-08-02 09:37:41.356",
    deathCnt: 2095,
  },
  {
    createDt: "2021-08-03 09:37:41.356",
    deathCnt: 2025,
  },
];

// const _apiData = [
//   {
//     createDt: "2021-07-29 09:37:41.356",
//     deathCnt: 2085,
//   },
//   {
//     createDt: "2021-08-03 09:37:41.356",
//     deathCnt: 2025,
//   },
//   {
//     createDt: "2021-08-05 09:37:41.356",
//     deathCnt: 2025,
//   },
// ];

const DeathChart = ({ divWidth, items }) => {
  const [apiData, setApiData] = useState(items);
  const svgRef = useRef(null);
  const deathChartSize = {
    w: divWidth,
    h: 300,
  };

  const render = (data) => {
    const svgLine = d3.select(svgRef.current);
    //x축 크기
    const pars = d3.timeFormat("%m월 %d일");

    const ticksAndDomainMaxLenhth = data.length - 1;
    const xScale = d3
      .scaleLinear()
      //domain 실제 값 범위
      .domain([0, ticksAndDomainMaxLenhth])
      //range 변환하고 싶은 비율
      .range([0, deathChartSize.w]);
    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(-deathChartSize.h)
      //tickFormat에 들어오는 index는 ticks에서 넣어준 인자 값이다.

      // 0이 들어오면 text를 안쓴다
      .ticks(ticksAndDomainMaxLenhth === 0 ? 1 : ticksAndDomainMaxLenhth)
      .tickFormat((index) => pars(new Date(data[index].date)))
      .tickPadding(10);

    svgLine.select(".x-axis").style("transform", `translateY(${deathChartSize.h}px)`).call(xAxis);

    //y축 크기
    // y축으로 표시 될 데이터 min,max를 구 해 준다
    // const Ydamain = d3.extent(data, (item) => item.value);
    // const yScale = d3.scaleLinear().domain(Ydamain).range([h, 0]);
    const YdamainMax = d3.max(data, (item) => item.value);
    const YdamainMin = d3.min(data, (item) => item.value);
    const yScale = d3
      .scaleLinear()
      // 50을 추가해주는 이유는 그래프를 편히 보여주기 위해서이다.
      // .domain([YdamainMin - 50, YdamainMax + 50])
      .domain([YdamainMin - 50, YdamainMax + 50])
      .range([deathChartSize.h, 0]);
    // const yAxis = d3.axisLeft(yScale).tickSize(-w).tickPadding(20);
    const yAxis = d3
      .axisRight(yScale)
      // .tickSize(w)
      .tickPadding(10);
    //데이터를 더 세분화해서 보여주기위해
    // .ticks(YdamainMax / 2);
    ticks(10);
    // y축 데이터 표현 갯수
    svgLine.select(".y-axis").style("transform", `translateX(${deathChartSize.w}px)`).call(yAxis);

    //path태그 d속성 계산
    const myLine = d3
      .line()
      .x((d) => xScale(d.index))
      .y((d) => yScale(d.value));

    const pathDrawTime = 2000;
    const pathDrawDelayTime = 200;
    // 트랜지션 생성
    const transitionPath = d3.transition().ease(d3.easeSin).duration(pathDrawTime).delay(pathDrawDelayTime);

    const path = svgLine
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", (d) => myLine(d))
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 3);
    const pathLength = path.node().getTotalLength();

    // 라인 그리는 트랜지션 추가
    //시작점을 0으로 만들어줘서 마치 선이 생성되는 애니메이션을 얻을 수 있다.
    path.attr("stroke-dashoffset", pathLength).attr("stroke-dasharray", pathLength).transition(transitionPath).attr("stroke-dashoffset", 0);
    //================================ circles =============================//

    // =========================== update 패턴 시작 ============================//
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
      .on("mouseover", (event) => {
        const { target } = event;
        d3.select(target.nextSibling)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .style("font-weight", "bold")
          .attr("y", (d) => yScale(d.value) - 15);
        d3.select(target).transition().duration(100).attr("r", 8).attr("fill", "#fff");
      })
      .on("mouseleave", (event) => {
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

    // // =========================== update 패턴 끝 ============================//

    // // =========================== enter 패턴 시작 ============================//
    const enter = groups.enter().append("g").attr("class", "point");

    // line 차트 서클 생성
    enter
      .append("circle")
      .attr("class", "point-circle")
      .attr("r", "4")
      .attr("cx", (d) => xScale(d.index))
      .attr("cy", (d) => yScale(d.value))
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .on("mouseover", (event) => {
        const { target } = event;
        d3.select(target.nextSibling)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .style("font-weight", "bold")
          .attr("y", (d) => yScale(d.value) - 15);
        d3.select(target).transition().duration(100).attr("r", 8).attr("fill", "#fff");
      })
      .on("mouseleave", (event) => {
        const { target } = event;
        d3.select(target.nextSibling)
          .transition()
          .duration(200)
          .style("opacity", 0)
          .attr("y", (d) => yScale(d.value) - 20);
        d3.select(target).transition().duration(100).attr("r", 4).attr("fill", "#fff");
      });

    // line 차트 텍스트 생성
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

    // // =========================== enter 패턴 끝 ============================//

    // // ============================== exit 패턴 시작 ================================//
    groups.exit().remove();
    // // ============================== exit 패턴 시작 끝 ================================//

    // //================================ circles 끝=============================//
    svgLine
      .select(".yyyy")
      .datum("날짜 : 2021년")
      .text((d) => d)
      .attr("y", "-10")
      .attr("font-weight", "bold");

    svgLine
      .select(".title")
      .datum("코로나 사망자 현황")
      .text((d) => d)
      .attr("y", "-20")
      .attr("x", `${deathChartSize.w / 2 - 65}`)
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
    if (apiData.length !== 0) {
      const data = apiData
        .sort((a, b) => (new Date(a.createDt) > new Date(b.createDt) ? 1 : -1))
        .map((object, idx) => {
          return { index: idx, value: object.deathCnt, date: object.createDt };
        });
      render(data);
    }
  }, [apiData, divWidth]);

  useEffect(() => {
    setApiData(items);
  }, [items]);

  return (
    <>
      <LineSvg ref={svgRef} width={deathChartSize.w} height={deathChartSize.h}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
        <text className="yyyy" />
        <text className="title" />
      </LineSvg>
    </>
  );
};

export default DeathChart;

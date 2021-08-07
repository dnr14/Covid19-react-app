import React, { useEffect, useRef } from "react";
import { LineSvg } from "components/style/styled";
import * as d3 from "d3";

const LineChart = ({ divWidth, items, dataProperty, chartTitle, bottomText }) => {
  const svgRef = useRef(null);
  const lineChartSize = {
    width: divWidth,
    height: 300,
  };

  const render = (data) => {
    const yPreprocessing = data.map((object) => `${new Date(object.date).getFullYear()}년`);
    const mPreprocessing = data.map((object) => `${new Date(object.date).getMonth() + 1}월`);
    const monthArticle = new Set(mPreprocessing);
    const yearArticle = new Set(yPreprocessing);
    const colorBarColors = ["#e74c3c", "#2980b9"];

    const svgLine = d3.select(svgRef.current);
    //x축 크기
    const pars = d3.timeFormat("%d일");

    const ticksAndDomainMaxLength = data.length - 1;
    const xScale = d3
      .scaleLinear()
      //domain 실제 값 범위
      .domain([0, ticksAndDomainMaxLength])
      //range 변환하고 싶은 비율
      .range([0, lineChartSize.width]);

    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(-lineChartSize.height)
      //tickFormat에 들어오는 index는 ticks에서 넣어준 인자 값이다.
      // 0이 들어오면 text를 안쓴다
      .ticks(ticksAndDomainMaxLength === 0 ? 1 : ticksAndDomainMaxLength)
      .tickFormat((index) => pars(new Date(data[index].date)))
      .tickPadding(10);

    svgLine
      .select(".x-axis")
      .style("transform", `translateY(${lineChartSize.height - 1}px)`)
      .call(xAxis);

    //y축 크기
    // y축으로 표시 될 데이터 min,max를 구 해 준다
    // const Ydamain = d3.extent(data, (item) => item.value);
    // const yScale = d3.scaleLinear().domain(Ydamain).range([h, 0]);
    const YdamainMax = d3.max(data, (item) => item.value);
    const YdamainMin = d3.min(data, (item) => item.value);
    const nanum = 45;

    const yScale = d3
      .scaleLinear()
      // 50을 추가해주는 이유는 그래프를 편히 보여주기 위해서이다.
      // 더하고 빼기 과정을 안해주면 그래프 위 아래로 딱 붙어버린다.
      .domain([YdamainMin - YdamainMin / nanum, YdamainMax + YdamainMax / nanum])
      .range([lineChartSize.height, 0]);

    const yAxis = d3
      .axisRight(yScale)
      .tickSize(-lineChartSize.width)
      .tickPadding(10)
      .tickFormat((d) => `${d}명`)
      //데이터를 더 세분화해서 보여주기위해
      .ticks(7);
    // y축 데이터 표현 갯수
    svgLine
      .select(".y-axis")
      .style("transform", `translateX(${lineChartSize.width - 1}px)`)
      .call(yAxis);

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
      .attr("stroke", "#1abc9c")
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

    let before;
    const setCircleColor = (d, idx) => {
      if (idx === 0) {
        before = `${new Date(d.date).getMonth() + 1}월`;
        return colorBarColors[0];
      }
      const currentColor = before === `${new Date(d.date).getMonth() + 1}월` ? colorBarColors[0] : colorBarColors[1];
      return currentColor;
    };

    updateCircle
      .attr("class", "point-circle")
      .attr("r", "5")
      .attr("cx", (d) => xScale(d.index))
      .attr("cy", (d) => yScale(d.value))
      .attr("fill", "#fff")
      .attr("stroke", setCircleColor)
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
      .text((d) => `${d.value}명`)
      .attr("x", (d) => xScale(d.index))
      .attr("class", (d) => `textValue`)
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
      .attr("r", "5")
      .attr("cx", (d) => xScale(d.index))
      .attr("cy", (d) => yScale(d.value))
      .attr("fill", "#fff")
      .attr("stroke", setCircleColor)
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
      .text((d) => `${d.value}명`)
      .attr("class", (d) => `textValue`)
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

    const textGroup = svgLine.select(".dayGroup").style("transform", `translate(${lineChartSize.width / 2 - 125}px,${lineChartSize.height + 65}px)`);
    const yyyys = textGroup.selectAll(".yyyy").data(yearArticle);

    const CommonMargin = 25;

    const yyyysY = (d, idx) => idx * CommonMargin - 10;

    // 년 표시
    yyyys.text((d) => d).attr("y", yyyysY);

    yyyys
      .enter()
      .append("text")
      .text((d) => d)
      .attr("class", "yyyy")
      .attr("y", yyyysY)
      .attr("font-weight", "bold");

    yyyys.exit().remove();

    // 월 표시
    const mms = textGroup.selectAll(".mm").data(monthArticle);
    const mmsX = 90;
    const mmsY = (d, idx) => idx * CommonMargin + -10;

    mms
      .text((d) => `${d} ${bottomText}`)
      .attr("x", mmsX)
      .attr("y", mmsY);

    mms
      .enter()
      .append("text")
      .text((d) => `${d} ${bottomText}`)
      .attr("class", "mm")
      .attr("x", mmsX)
      .attr("y", mmsY)
      .attr("font-weight", "bold");

    mms.exit().remove();

    // 월 표시 컬러
    const colorBars = textGroup.selectAll(".colorBar").data(monthArticle);
    const colorBarsCx = 70;
    const colorBarsCy = (d, idx) => idx * CommonMargin + -15;

    colorBars
      .attr("fill", "#fff")
      .attr("stroke", (d, idx) => colorBarColors[idx])
      .attr("stroke-width", 2)
      .attr("cy", colorBarsCy)
      .attr("cx", colorBarsCx);

    colorBars
      .enter()
      .append("circle")
      .attr("class", "colorBar")
      .attr("r", "5")
      .attr("cy", colorBarsCy)
      .attr("cx", colorBarsCx)
      .attr("fill", "#fff")
      .attr("stroke", (d, idx) => colorBarColors[idx])
      .attr("stroke-width", 2);

    colorBars.exit().remove();

    svgLine
      .select(".title")
      .datum(chartTitle)
      .text((d) => d)
      .attr("y", "-15")
      .attr("x", `${lineChartSize.width / 2 - 65}`)
      .attr("font-weight", "bold");

    // new Date형식 바꿔준다.
    // const parseDate = d3.timeFormat("%Y-%m-%d");
  };

  useEffect(() => {
    if (items.length !== 0) {
      const datas = items
        .sort((x, y) => (new Date(x.createDt) > new Date(y.createDt) ? 1 : -1))
        .map((object, idx) => ({ index: idx, value: object[`${dataProperty}`], date: object.createDt }));
      render(datas);
    }
  }, [items, divWidth]);

  return (
    <>
      <LineSvg ref={svgRef} width={lineChartSize.width} height={lineChartSize.height}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
        <g className="textGroup">
          <text className="title" />
        </g>
        <g className="dayGroup" />
      </LineSvg>
    </>
  );
};

export default LineChart;

import React, { memo, useEffect, useRef } from "react";
import { BarSvg } from "components/style/styled";
import { select, scaleBand, easeLinear, timeFormat, scaleLinear, max, axisRight, axisBottom, transition } from "d3";
import { groupBy } from "util/DateUtil";

const onMouseOver = (yScale) => (e, data) => {
  select(`.textValue.textValue-${data.index}`)
    .style("opacity", 1)
    .style("font-weight", "bold")
    .attr("y", (d) => yScale(d.value) - 10)
    .transition()
    .duration(200)
    .attr("y", (d) => yScale(d.value) - 5);
};

const onMouseOut = (e, data) => {
  select(`.textValue.textValue-${data.index}`).style("font-weight", "bold").transition().duration(200).style("opacity", 0);
};

const BarChart = ({ divWidth, items, dataProperty, chartTitle, bottomText }) => {
  const svgRef = useRef(null);

  const barChartSize = {
    width: divWidth,
    height: 400,
    margin: 150,
  };

  useEffect(() => {
    const svg = select(svgRef.current);
    const width = svg.attr("width") - barChartSize.margin;
    const height = svg.attr("height") - barChartSize.margin;
    const xScale = scaleBand().range([0, width]).padding(0.5);
    const yScale = scaleLinear().range([height, 0]);
    const gragh = svg.select(".graph").attr("transform", `translate(${barChartSize.margin / 3},${barChartSize.margin / 3})`);
    const colorBarColors = ["#e74c3c", "#2980b9"];
    const pars = timeFormat("%m월");

    const render = (data) => {
      const yDomain = max(data, (d) => d.value);
      xScale.domain(data.map((d) => d.date));
      yScale.domain([0, yDomain + yDomain / 3]);

      const xAxis = axisBottom(xScale)
        .tickFormat((d) => pars(new Date(d)))
        .tickPadding(10);
      const yAxis = axisRight(yScale)
        .tickFormat((d) => `${d}명`)
        .ticks(5)
        .tickPadding(10);

      gragh
        .select(".x-axis")
        .attr("transform", `translate(0,${height - 1})`)
        .call(xAxis);

      gragh
        .select(".y-axis")
        .attr("transform", `translate(${width - 1},0)`)
        .call(yAxis);

      const textGroup = svg.select(".dayGroup").style("transform", `translate(${barChartSize.width / 2 - 165}px,${barChartSize.height - 85}px)`);
      const commonMargin = 25;

      const yearPreprocessing = data.map((object) => `${new Date(object.date).getFullYear()}년`);
      const monthPreprocessing = data.map((object) => `${new Date(object.date).getMonth() + 1}월`);
      const monthArticle = new Set(monthPreprocessing);
      const yearArticle = new Set(yearPreprocessing);

      const barsEnterUpdateExit = () => {
        const bars = gragh.selectAll(".bar").data(data);
        const barsMaginbottom = 1;
        const barsSetHeight = (d) => height - yScale(d.value);
        const barsX = (d) => xScale(d.date);
        const barsY = (d) => yScale(d.value) - barsMaginbottom;
        const transitionPath = transition().ease(easeLinear).duration(1000).delay(0);

        let before;
        const setCircleColor = () => (d, idx) => {
          if (idx === 0) {
            before = `${new Date(d.date).getMonth() + 1}월`;
            return colorBarColors[0];
          }
          return before === `${new Date(d.date).getMonth() + 1}월` ? colorBarColors[0] : colorBarColors[1];
        };

        bars
          .attr("x", barsX)
          .attr("y", barsY)
          .attr("height", barsSetHeight)
          .attr("fill", setCircleColor())
          .on("mouseover", onMouseOver(yScale))
          .on("mouseout", onMouseOut)
          .transition(transitionPath)
          .attr("width", xScale.bandwidth());

        bars
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("x", barsX)
          .attr("y", barsY)
          .attr("height", barsSetHeight)
          .attr("width", 0)
          .attr("fill", setCircleColor())
          .on("mouseover", onMouseOver(yScale))
          .on("mouseout", onMouseOut)
          .transition(transitionPath)
          .attr("width", xScale.bandwidth());
        // exit
        bars.exit().remove();
      };
      const YearsEnterUpdateExit = () => {
        const yyyys = textGroup.selectAll(".yyyy").data(yearArticle);
        // 년 표시
        yyyys.text((d) => d).attr("y", (d, idx) => idx * commonMargin - 10);

        yyyys
          .enter()
          .append("text")
          .text((d) => d)
          .attr("class", "yyyy")
          .attr("y", (d, idx) => idx * commonMargin - 10)
          .attr("font-weight", "bold");

        yyyys.exit().remove();
      };
      const MonthsEnterUpdateExit = () => {
        // 월 표시
        const mms = textGroup.selectAll(".mm").data(monthArticle);
        const mmsY = (d, idx) => idx * commonMargin + -10;
        const mmsX = 100;
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
      };
      const colorBarsEnterUpdateExit = () => {
        // // 월 표시 컬러
        const colorBars = textGroup.selectAll(".colorBar").data(monthArticle);
        const colorBarsY = (d, idx) => idx * commonMargin - 22;
        const colorBarsX = 60;
        const colorBarsFill = (d, idx) => colorBarColors[idx];
        const colorBarWidth = 30;
        const colorBarHeight = 10;

        colorBars.attr("y", colorBarsY).attr("x", colorBarsX).attr("width", colorBarWidth).attr("height", colorBarHeight).attr("fill", colorBarsFill);

        colorBars
          .enter()
          .append("rect")
          .attr("class", "colorBar")
          .attr("y", colorBarsY)
          .attr("x", colorBarsX)
          .attr("width", colorBarWidth)
          .attr("height", colorBarHeight)
          .attr("fill", colorBarsFill);

        colorBars.exit().remove();
      };
      const chartTitleEnter = () => {
        select(".graph")
          .select(".title")
          .datum(chartTitle)
          .text((d) => d)
          .attr("y", "-15")
          .attr("x", `${width / 2 - 60}`)
          .attr("font-weight", "bold");
      };
      const barChartTextValue = () => {
        gragh.selectAll(".bar");
        const textGroups = gragh.selectAll(".textGroup").data(data);

        const enter = textGroups.enter().append("g").attr("class", "textGroup");
        const update = textGroups.select(".textValue");

        const textValueX = (d) => xScale(d.date) + xScale.bandwidth() / 2;
        const textValueY = (d) => yScale(d.value) - 5;
        update
          .text((d) => `${d.value}명`)
          .attr("x", textValueX)
          .attr("y", textValueY);

        enter
          .append("text")
          .attr("class", (d, idx) => `textValue textValue-${idx}`)
          .text((d) => `${d.value}명`)
          .attr("x", textValueX)
          .attr("y", textValueY)
          .style("color", "#222")
          .style("font-size", "0.85em")
          .style("opacity", 0)
          .attr("text-anchor", "middle");
        textGroups.exit().remove();
      };

      barsEnterUpdateExit();
      YearsEnterUpdateExit();
      MonthsEnterUpdateExit();
      colorBarsEnterUpdateExit();
      chartTitleEnter();
      barChartTextValue();
    };

    if (items.length !== 0) {
      const group = groupBy(items, "createDt");
      const newData = [];
      let idx = 0;
      for (const key in group) {
        let total = 0;
        group[key].reduce((acc, cur) => {
          total += Math.abs(cur[`${dataProperty}`] - acc[`${dataProperty}`]);
          return cur;
        });
        newData.push({ index: idx, date: key, value: total });
        idx++;
      }
      newData.sort((x, y) => (x.date > y.date ? 1 : -1));
      render(newData);
    }
  });

  return (
    <>
      <BarSvg ref={svgRef} width={barChartSize.width} height={barChartSize.height}>
        <g className="graph">
          <g className="x-axis" />
          <g className="y-axis" />
          <text className="title" />
          <g className="dayGroup" />
        </g>
      </BarSvg>
    </>
  );
};

// 해야될일
// 월별 검색 달력

export default memo(BarChart);

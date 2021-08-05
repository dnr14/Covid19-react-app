import React, { useEffect, useRef, useState } from "react";
import { BarSvg } from "components/style/styled";
import { select, scaleBand, easeLinear, timeFormat, scaleLinear, max, axisRight, axisBottom, selectAll } from "d3";
import { getMonthStr } from "util/DateUtil";

const onMouseOver = (xScale, yScale, height, barsMaginbottom) => (e) => {
  const { target } = e;
  const getDatum = () => select(target).data();
  const [data] = getDatum();
  select(target)
    .transition()
    .duration(400)
    .attr("width", xScale.bandwidth() + 5)
    .attr("y", (d) => yScale(d.value) - 10 - barsMaginbottom)
    .attr("height", (d) => height - yScale(d.value) + 10);

  select(".graph")
    .datum(data)
    .append("text")
    .attr("class", "barTextValue")
    .attr("x", (d) => xScale(d.date) + 20)
    .attr("y", (d) => yScale(d.value) + 20)
    .attr("font-weight", "bold")
    .text((d) => `${d.value}명`);
};

const onMouseOut = (xScale, yScale, height, barsMaginbottom) => (e) => {
  const { target } = e;
  select(target)
    .transition()
    .duration(400)
    .attr("width", xScale.bandwidth())
    .attr("y", (d) => yScale(d.value) - barsMaginbottom)
    .attr("height", (d) => height - yScale(d.value));

  selectAll(".barTextValue").remove();
};

const getDummyDate = () => {
  const array = [];
  let day = 1;
  let Month = 6;
  for (let i = 0; i < 61; i++) {
    array.push({
      deathCnt: 11168 + i * 200,
      createDt: `2021-${String(Month).padStart(2, "0")}-${String(day).padStart(2, "0")} 09:37:41.356`,
    });

    if (i === 29) {
      day = 1;
      Month++;
    } else {
      day++;
    }
  }
  return array;
};

const BarChart = ({ divWidth, items, dataProperty, chartTitle }) => {
  const svgRef = useRef(null);
  const [TestDate] = useState(getDummyDate());

  const barChartSize = {
    width: divWidth,
    height: 600,
  };

  useEffect(() => {
    const svg = select(svgRef.current);
    const maring = 150;
    const width = svg.attr("width") - maring;
    const height = svg.attr("height") - maring;
    const xScale = scaleBand().range([0, width]).padding(0.2);
    const yScale = scaleLinear().range([height, 0]);
    const gragh = svg.select(".graph").attr("transform", `translate(${maring / 3},${maring / 2})`);
    const pars = timeFormat("%m월");

    const render = (data) => {
      xScale.domain(data.map((d) => d.date));
      yScale.domain([0, max(data, (d) => d.value) + 100]);

      const xAxis = axisBottom(xScale).tickFormat((d) => pars(new Date(d)));
      const yAxis = axisRight(yScale).tickFormat((d) => `${d}명`);

      gragh
        .select(".x-axis")
        .attr("transform", `translate(0,${height - 1})`)
        .call(xAxis);

      gragh
        .select(".y-axis")
        .attr("transform", `translate(${width - 1},0)`)
        .call(yAxis);

      const bars = gragh.selectAll(".bar").data(data);

      const barsMaginbottom = 1;

      bars
        .attr("x", (d) => xScale(d.date))
        .attr("y", (d) => yScale(d.value) - barsMaginbottom)
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.value))
        .on("mouseover", onMouseOver(xScale, yScale, height, barsMaginbottom))
        .on("mouseout", onMouseOut(xScale, yScale, height, barsMaginbottom));

      bars
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.date))
        .attr("y", (d) => yScale(d.value) - barsMaginbottom)
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.value))
        .attr("fill", "orange")
        .on("mouseover", onMouseOver(xScale, yScale, height, barsMaginbottom))
        .on("mouseout", onMouseOut(xScale, yScale, height, barsMaginbottom))
        .transition()
        .ease(easeLinear)
        .duration(400)
        .delay((d, i) => i * 50);
      // exit
      bars.exit().remove();

      select(".graph")
        .select(".title")
        .datum(chartTitle)
        .text((d) => d)
        .attr("y", `-${30}`)
        .attr("x", `${width / 2 - 65}`)
        .attr("font-weight", "bold");
    };

    const reducer = (acc, cur) => {
      const month = cur.createDt.split("-")[1];
      return {
        ...acc,
        [month]: cur.deathCnt + (acc[month] || 0),
      };
    };

    // 갓다와서 배열=> 객체로 쪼개보자
    const tt = TestDate.reduce(reducer, {});
    console.log(tt);
  });
  return (
    <>
      <BarSvg ref={svgRef} width={barChartSize.width} height={barChartSize.height}>
        <g className="graph">
          <g className="x-axis"></g>
          <g className="y-axis"></g>
          <text className="title"></text>
        </g>
      </BarSvg>
    </>
  );
};

export default BarChart;

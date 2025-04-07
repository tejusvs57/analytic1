import React from "react";
import ReactECharts from "echarts-for-react";

const ScatterPlotComponent = ({ data, xKey, yKey, title }) => {
  const seriesData = data.map((item) => [item[xKey], item[yKey]]);

  const option = {
    title: {
      text: title || `${xKey} vs ${yKey}`,
      left: "center",
      textStyle: {
        color: "#66d9ff",
        fontWeight: "bold",
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: "item",
      formatter: (params) =>
        `${xKey}: ${params.value[0]}<br/>${yKey}: ${params.value[1]}`,
    },
    xAxis: {
      name: xKey,
      nameTextStyle: { color: "#66d9ff" },
      axisLabel: { color: "#99e6ff" },
      axisLine: { lineStyle: { color: "#66d9ff" } },
    },
    yAxis: {
      name: yKey,
      nameTextStyle: { color: "#66d9ff" },
      axisLabel: { color: "#99e6ff" },
      axisLine: { lineStyle: { color: "#66d9ff" } },
    },
    series: [
      {
        symbolSize: 12,
        data: seriesData,
        type: "scatter",
        itemStyle: {
          color: "rgba(0, 204, 255, 0.8)",
        },
      },
    ],
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
    </div>
  );
};

export default ScatterPlotComponent;

import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

export default function AnimatedEventCharts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      const events = ["Event A", "Event B", "Event C", "Event D", "Event E", "Event F", "Event G", "Event H", "Event I", "Event J"];
      let tempData = events.map(event => ({
        name: event,
        value: Math.floor(Math.random() * 100),
      }));
      return tempData;
    };

    setData(generateData());
  }, []);

  // Bar Chart options with cool gradient colors for bars
  const barChartOption = {
    backgroundColor: "#080A1E",
    title: {
      text: "🔥 Event Frequency - Bar Chart",
      left: "center",
      textStyle: { color: "#4db8ff", fontSize: 22, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(50, 50, 50, 0.7)",
      borderColor: "#4db8ff",
      textStyle: { color: "#ffffff" },
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.name),
      axisLabel: { color: "#4db8ff" ,rotate: 30,interval: 0},
      axisLine: { lineStyle: { color: "#4db8ff" } },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      name: "Frequency",
      nameTextStyle: { color: "#4db8ff" },
      axisLabel: { color: "#4db8ff" },
      axisLine: { lineStyle: { color: "#4db8ff" } },
      splitLine: { lineStyle: { color: "rgba(77, 184, 255, 0.2)" } },
    },
    series: [
      {
        name: "Event Frequency",
        type: "bar",
        data: data.map((item) => item.value),
        itemStyle: {
          // Creating a cool gradient color effect for each bar
          color: (params) => {
            const colorList = [
              "rgba(255, 87, 34, 0.8)", // Neon Orange
              "rgba(33, 150, 243, 0.8)", // Neon Blue
              "rgba(0, 204, 255, 0.8)",  // Neon Cyan
              "rgba(255, 193, 7, 0.8)",  // Neon Yellow
              "rgba(76, 175, 80, 0.8)",  // Neon Green
              "rgba(156, 39, 176, 0.8)", // Neon Purple
              "rgba(233, 30, 99, 0.8)",  // Neon Pink
              "rgba(255, 152, 0, 0.8)",  // Neon Amber
              "rgba(0, 188, 212, 0.8)",  // Neon Teal
              "rgba(0, 0, 0, 0.8)",      // Black (for contrast)
            ];
            return colorList[params.dataIndex % colorList.length]; // Cycle through the colors
          },
          shadowBlur: 10,
          shadowColor: "rgba(0, 204, 255, 0.8)",
        },
        animationDuration: 1500,
        animationEasing: "elasticOut",
      },
    ],
  };

  // Pie Chart options with cool random colors
  const pieChartOption = {
    backgroundColor: "#080A1E",
    title: {
      text: "🔥 Event Distribution - Pie Chart",
      left: "center",
      textStyle: { color: "#4db8ff", fontSize: 22, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(50, 50, 50, 0.7)",
      borderColor: "#4db8ff",
      textStyle: { color: "#ffffff" },
    },
    series: [
      {
        name: "Event Distribution",
        type: "pie",
        radius: "55%",
        data: data.map((item) => ({
          name: item.name,
          value: item.value,
        })),
        itemStyle: {
          color: (params) => {
            const colorList = [
              "rgba(255, 87, 34, 0.8)", // Neon Orange
              "rgba(33, 150, 243, 0.8)", // Neon Blue
              "rgba(0, 204, 255, 0.8)",  // Neon Cyan
              "rgba(255, 193, 7, 0.8)",  // Neon Yellow
              "rgba(76, 175, 80, 0.8)",  // Neon Green
              "rgba(156, 39, 176, 0.8)", // Neon Purple
              "rgba(233, 30, 99, 0.8)",  // Neon Pink
              "rgba(255, 152, 0, 0.8)",  // Neon Amber
              "rgba(0, 188, 212, 0.8)",  // Neon Teal
              "rgba(0, 0, 0, 0.8)",      // Black (for contrast)
            ];
            return colorList[params.dataIndex % colorList.length]; // Cycle through the colors
          },
          shadowBlur: 10,
          shadowColor: "rgba(0, 204, 255, 0.8)",
        },
        label: {
          color: "#ffffff",
        },
        animationDuration: 1500,
        animationEasing: "elasticOut",
      },
    ],
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around", height: "600px" }}>
      {/* Bar Chart */}
      <div style={{ width: "45%", height: "100%" }}>
        <ReactECharts option={barChartOption} style={{ height: "100%" }} />
      </div>
      {/* Pie Chart */}
      <div style={{ width: "45%", height: "100%" }}>
        <ReactECharts option={pieChartOption} style={{ height: "100%" }} />
      </div>
    </div>
  );
}

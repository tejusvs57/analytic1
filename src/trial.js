import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

export default function AnimatedGamingGraph() {
  const [data, setData] = useState([]);
  const updateInterval = 1500000; // Update every 1.5 seconds for sharper animation

  const onDataZoom = (event) => {
      const newStartTime = event.batch[0].startValue;
      const newEndTime = event.batch[0].endValue;
  
       console.log(newStartTime);
       console.log(newEndTime);
    };

  useEffect(() => {
    const generateData = () => {
      let tempData = [];
      let now = new Date();
      for (let i = 0; i < 200; i++) {
        let timestamp = new Date(now.getTime() - i * 60000);
        let value = Math.floor(Math.random() * 100);
        tempData.push([timestamp, value]);
      }
      return tempData.reverse();
    };

    setData(generateData());

    const interval = setInterval(() => {
      setData((prevData) => {
        let newPoint = [new Date(), Math.floor(Math.random() * 100)];
        return [...prevData.slice(1), newPoint]; // Slide forward with new point
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  const option = {
    backgroundColor: "#080A1E",
    title: {
      text: "🔥 Gaming Analytics - Sharp Pulse Effect",
      left: "center",
      textStyle: { color: "#4db8ff", fontSize: 22, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(50, 50, 50, 0.8)",
      borderColor: "#4db8ff",
      textStyle: { color: "#ffffff" },
    },
    xAxis: {
      type: "time",
      axisLabel: { formatter: "{HH}:{mm}", color: "#4db8ff" },
      axisLine: { lineStyle: { color: "#4db8ff" } },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      name: "Event Count",
      nameTextStyle: { color: "#4db8ff" },
      axisLabel: { color: "#4db8ff" },
      axisLine: { lineStyle: { color: "#4db8ff" } },
      splitLine: { lineStyle: { color: "rgba(77, 184, 255, 0.2)" } },
    },
    series: [
      {
        name: "Events",
        type: "line",
        data: data,
        smooth: false, // Make the line less smooth for sharper animation
        showSymbol: false, // Hide symbols except the latest point
        animationDurationUpdate: 800, // Faster update duration (Sharper)
        animationEasingUpdate: "linear", // Use linear easing for quicker updates
        lineStyle: {
          width: 3,
          color: "#00ccff",
          shadowBlur: 10,
          shadowColor: "rgba(0, 204, 255, 0.8)",
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(0, 204, 255, 0.7)" },
              { offset: 1, color: "rgba(0, 0, 0, 0)" },
            ],
          },
          opacity: 0.8,
        },
        // Slight emphasis on the latest point
        markPoint: {
          symbol: "circle",
          symbolSize: 10,
          data: [{ coord: data[data.length - 1], name: "Latest" }],
          itemStyle: {
            color: "#ffffff",
            borderColor: "#00ccff",
            borderWidth: 4,
            shadowBlur: 15,
            shadowColor: "rgba(0, 204, 255, 0.8)",
          },
        },
      },
    ],
    dataZoom: [
      { 
            type: "slider",  // This adds the zoom slider below the graph
            start: 50,        // Default start percentage for slider
            end: 100,        // Default end percentage for slider
            handleSize: "100%", // Full width of the handle
            handleStyle: { color: "#4db8ff" },
            backgroundColor: "#1e1e30", // Background color for the slider
            borderColor: "#4db8ff",
            onZoom: onDataZoom,
          },
      { type: "inside", onZoom: onDataZoom, }, // Allows smooth zoom without UI slider
    ],
  };

  return <ReactECharts option={option} style={{ height: "450px" }} />;
}

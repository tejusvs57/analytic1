import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

export default function StackedChart() {
      const data = [
            { name: "Event 1", morning: 30, afternoon: 20, evening: 50 },
            { name: "Event 2", morning: 40, afternoon: 35, evening: 25 },
            { name: "Event 3", morning: 20, afternoon: 50, evening: 30 },
            { name: "Event 4", morning: 60, afternoon: 40, evening: 20 },
        ];
        



const barChartOption = {
      backgroundColor: "#080A1E",
      title: {
          text: "🔥 Event Frequency - Stacked Bar Chart",
          left: "center",
          textStyle: { color: "#4db8ff", fontSize: 22, fontWeight: "bold" },
      },
      tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(50, 50, 50, 0.7)",
          borderColor: "#4db8ff",
          textStyle: { color: "#ffffff" },
          axisPointer: { type: "shadow" }, // Highlights stacked sections
      },
      legend: {
          data: ["Morning", "Afternoon", "Evening"],
          textStyle: { color: "#4db8ff" },
          top: "10%", // Adjust legend position
      },
      xAxis: {
          type: "category",
          data: data.map((item) => item.name),
          axisLabel: {
              color: "#4db8ff",
              rotate: 30, // Rotates text to prevent overlap
              interval: 0, // Show all labels
              fontSize: 12,
          },
          axisLine: { lineStyle: { color: "#4db8ff" } },
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
              name: "Morning",
              type: "bar",
              stack: "total", // Stacks bars
              data: data.map((item) => item.morning),
              itemStyle: { color: "rgba(255, 87, 34, 0.8)" }, // Neon Orange
          },
          {
              name: "Afternoon",
              type: "bar",
              stack: "total",
              data: data.map((item) => item.afternoon),
              itemStyle: { color: "rgba(33, 150, 243, 0.8)" }, // Neon Blue
          },
          {
              name: "Evening",
              type: "bar",
              stack: "total",
              data: data.map((item) => item.evening),
              itemStyle: { color: "rgba(76, 175, 80, 0.8)" }, // Neon Green
          },
      ],
  };
  
  return (
      <div style={{ width: "50%", height: "500px" }}>
      <ReactECharts option={barChartOption} style={{ height: "100%" }} />
    </div>
  )
}
import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

export default function AnimatedEventCharts({from,to}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
   
    const fetchData = async () => {
     
      setIsLoading(true);

      console.log('bar graph');
      console.log(from);
      console.log(to);

      setIsLoading(true); // Start loading

      // Fetch data from your API based on the time range
      try {
        const response = await fetch(`https://59.145.153.101:5010/general/stats1?from=${from}&to=${to}`);
       const gdata = await response.json();


       console.log(gdata);
       console.log(gdata.graph1);

       const data = gdata.graph1;
       
        setData(data); // Update the chart data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();

  }, [from,to]);

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
    dataZoom: [
      {
        type: "slider",
        show: true,
        start: 0,
        end: 100,
        height: 20,
        bottom: 0,
        handleStyle: {
          color: "#4db8ff",
        },
        textStyle: {
          color: "#fff",
        },
        backgroundColor: "#1e1e30",
        borderColor: "#4db8ff",
      },
      {
        type: "inside", // Zoom via scroll
      },
    ],
    xAxis: {
      type: "category",
      data: data.map(item => `Event ${item.event}`),
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
        data:  data.map(item => Number(item.frequency)),
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
        emphasis: {
        itemStyle: {
          color: "#4db8ff",
        } , },
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
          name: item.event,
          value: item.frequency,
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
          formatter: '{b}: {d}%',
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

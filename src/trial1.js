import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

// Loading Spinner Component
const LoadingSpinner = () => (
  <div style={{
    position: "absolute", 
    top: "50%", 
    left: "50%", 
    transform: "translate(-50%, -50%)",
    color: "#4db8ff",
    fontSize: "24px"
  }}>
    Loading...
  </div>
);

export default function AnimatedGamingGraph() {
  const [data, setData] = useState([]);
  const [currentTimeRange, setCurrentTimeRange] = useState([new Date().getTime() - 3600000, new Date().getTime()]);
  const [isLoading, setIsLoading] = useState(false); // State for loading

  useEffect(() => {
    const fetchData = async () => {
      const startTime = currentTimeRange[0];
      const endTime = currentTimeRange[1];

      setIsLoading(true); // Start loading

      // Fetch data from your API based on the time range
      try {
        const response = await fetch(`/api/data?start=${startTime}&end=${endTime}`);
        const data = await response.json();
        setData(data); // Update the chart data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData(); // Initial data load when component mounts

    // Simulate real-time updates every 2 seconds (optional)
    const interval = setInterval(() => {
      setData((prevData) => {
        let newPoint = [new Date(), Math.floor(Math.random() * 100)];
        return [...prevData.slice(1), newPoint]; // Slide forward
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [currentTimeRange]);

  const onDataZoom = (event) => {
    const newStartTime = event.batch[0].startValue;
    const newEndTime = event.batch[0].endValue;

    if (newStartTime < currentTimeRange[0] || newEndTime > currentTimeRange[1]) {
      setCurrentTimeRange([newStartTime, newEndTime]);
    }
  };

  const option = {
    backgroundColor: "#080A1E",
    title: {
      text: "🔥 Gaming Analytics - Smooth Update",
      left: "center",
      textStyle: { color: "#4db8ff", fontSize: 22, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(50, 50, 50, 0.7)",
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
        smooth: true,
        showSymbol: true,
        lineStyle: { width: 3, color: "#00ccff" },
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
        symbolSize: (val, params) => (params.dataIndex === data.length - 1 ? 10 : 5),
        itemStyle: {
          color: "#00ccff",
          shadowBlur: 10,
          shadowColor: "rgba(0, 204, 255, 0.7)",
        },
        emphasis: {
          itemStyle: {
            color: "#ffffff",
            borderColor: "#00ccff",
            borderWidth: 2,
          },
        },
      },
    ],
    dataZoom: [
      { type: "slider", backgroundColor: "#1e1e30", borderColor: "#4db8ff" },
      { type: "inside" },
    ],
    dataZoom: [
      {
        type: "slider",
        handleSize: "100%",
        handleStyle: { color: "#4db8ff" },
        onZoom: onDataZoom,
      },
      {
        type: "inside",
        onZoom: onDataZoom,
      },
    ],
  };

  return (
    <div style={{ position: "relative", height: "450px" }}>
      {isLoading && <LoadingSpinner />} {/* Show loading spinner if data is loading */}
      <ReactECharts option={option} style={{ height: "100%" }} />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import { PuffLoader } from "react-spinners";

export default function AnimatedGamingGraph({from,to}) {
  const [data, setData] = useState([]);
  const updateInterval = 1500000; // Update every 1.5 seconds for sharper animation
  const [isLoading, setIsLoading] = useState(false);

  const onDataZoom = (event) => {
      const newStartTime = event.batch[0].startValue;
      const newEndTime = event.batch[0].endValue;
  
       console.log(newStartTime);
       console.log(newEndTime);
    };

 
 
useEffect(() => {

    const fetchData = async () => {
      // const startTime = currentTimeRange[0];
      // const endTime = currentTimeRange[1];
      setIsLoading(true);

      console.log('timeseries');
      console.log(from);
      console.log(to);

      setIsLoading(true); // Start loading

      // Fetch data from your API based on the time range
      try {
        const response = await fetch(`https://59.145.153.101:5010/general/stats3?from=${from}&to=${to}`);
       const gdata = await response.json();


       console.log(gdata);
       console.log(gdata.graph3);

       const data = gdata.graph3.map((point) => [point.time, point.value]);
       
        setData(data); // Update the chart data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();

  }, [from,to]);

  const option = {
    backgroundColor: "#080A1E",
    title: {
      text: " Analytics - Sharp Pulse Effect",
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
      axisLabel: { formatter: "{yyyy}-{MM}-{dd} {hh}:{mm}", color: "#4db8ff" },
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

  // return <ReactECharts option={option} style={{ height: "450px" }} />;
  return (
    <div style={{ position: "relative", height: "450px" }}>
      {isLoading && (
        <div style={{
          position: "absolute",
          zIndex: 10,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}>
          <PuffLoader color="#4db8ff" size={80} />
        </div>
      )}
      <ReactECharts option={option} style={{ height: "100%" }} />
    </div>
  );
}

import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import html2canvas from "html2canvas";
import Papa from "papaparse";
import { saveAs } from "file-saver";

// Sample data
const sampleData = [
  { name: "Alice", age: 25, score: 88, height: 165, weight: 60, income: 50000 },
  { name: "Bob", age: 30, score: 76, height: 170, weight: 75, income: 60000 },
  { name: "Charlie", age: 22, score: 90, height: 160, weight: 55, income: 55000 },
  { name: "David", age: 28, score: 85, height: 175, weight: 70, income: 65000 },
  { name: "Eve", age: 35, score: 82, height: 168, weight: 65, income: 62000 },
];

// Individual Scatter Graph Component
const ScatterGraph = ({ id, data, onDelete }) => {
  const keys = Object.keys(data[0] || {});
  const [xKey, setXKey] = useState(keys[1]);
  const [yKey, setYKey] = useState(keys[2]);
  const [nameFilter, setNameFilter] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [color, setColor] = useState("#00ccff");


  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      item[yKey] >= min &&
      item[yKey] <= max
  );

  const chartData = filtered.map((item) => [item[xKey], item[yKey]]);

  const option = {
    backgroundColor: "#080A1E",
    title: {
      text: `Graph ${id} (${xKey} vs ${yKey})`,
      textStyle: { color: "#4db8ff", fontSize: 18 },
    },
    
    tooltip: {
       trigger: "item",
       formatter: (params) => {
        const [x, y] = params.data;
       const point = filtered[params.dataIndex];
       return `Name: ${point.name || "N/A"}<br>${xKey}: ${x}<br>${yKey}: ${y}`;
        }
      },
      dataZoom: [
        { type: "inside", xAxisIndex: 0 },
       { type: "inside", yAxisIndex: 0 }
            ],

    xAxis: {
      name: xKey,
      axisLabel: { color: "#4db8ff" },
      axisLine: { lineStyle: { color: "#4db8ff" } },
    },
    yAxis: {
      name: yKey,
      axisLabel: { color: "#4db8ff" },
      axisLine: { lineStyle: { color: "#4db8ff" } },
    },
    series: [
      {
        type: "scatter",
        data: chartData,
        symbolSize: 12,
        itemStyle: { color },
      },
    ],
  };

  const exportPNG = async () => {
    const element = document.getElementById(`chart-${id}`);
    const canvas = await html2canvas(element);
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `scatter-${id}.png`;
    a.click();
  };

  const exportCSV = () => {
      const csvContent = [xKey + "," + yKey]
        .concat(chartData.map(([x, y]) => `${x},${y}`))
        .join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `graph-${id}.csv`);
    };


    

  return (
    <div style={{
      background: "#0b112d",
      color: "white",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 0 20px rgba(0,0,0,0.4)"
    }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
        <select value={xKey} onChange={(e) => setXKey(e.target.value)}>
          {keys.map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <select value={yKey} onChange={(e) => setYKey(e.target.value)}>
          {keys.map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
        <input value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} placeholder="Name Filter" />
        <input type="number" value={min} onChange={(e) => setMin(+e.target.value)} placeholder="Min Y" />
        <input type="number" value={max} onChange={(e) => setMax(+e.target.value)} placeholder="Max Y" />
        <button onClick={exportPNG}>📷 Export PNG</button>
        <button onClick={exportCSV}>⬇️ CSV</button>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

        <button onClick={() => onDelete(id)} style={{ backgroundColor: "#ff4444", color: "white" }}>❌ Delete</button>
      </div>
      <div id={`chart-${id}`} style={{ height: "400px" }}>
        <ReactECharts option={option} style={{ height: "100%" }} />
      </div>
    </div>
  );
};

// Main Builder Component
const ScatterGraphBuilder = () => {
      const [graphs, setGraphs] = useState([{ id: 1 }]);
      const [nextId, setNextId] = useState(2);
      const [data, setData] = useState(sampleData);
    
      const addGraph = () => {
        setGraphs([...graphs, { id: nextId }]);
        setNextId(nextId + 1);
      };
    
      const removeGraph = (id) => {
        setGraphs(graphs.filter((g) => g.id !== id));
      };
    
      const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            setData(results.data.filter(row => Object.values(row).some(val => val !== null)));
          },
        });
      };
    
      return (
        <div style={{ padding: "30px", backgroundColor: "#060814", minHeight: "100vh", color: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h1 style={{ fontSize: "28px", color: "#4db8ff" }}>📊 Scatter Graph Builder</h1>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <input type="file" accept=".csv" onChange={handleFileUpload} />
              <button onClick={addGraph} style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold"
              }}>+ Add Graph</button>
            </div>
          </div>
    
          {graphs.map(({ id }) => (
            <ScatterGraph key={id} id={id} data={data} onDelete={removeGraph} />
          ))}
        </div>
      );
    };
    

export default ScatterGraphBuilder;

import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import './newtrial.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSVLink } from 'react-csv';

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)));
  const [endDate, setEndDate] = useState(new Date());

  const generateTimeSeriesData = () => {
    const data = [];
    const baseTime = new Date().getTime();
    for (let i = 0; i < 20; i++) {
      const time = new Date(baseTime + i * 3600 * 1000).toISOString();
      const value = Math.round(Math.random() * 1000);
      data.push({ value: [time, value] });
    }
    return data;
  };

  const timeSeriesData = generateTimeSeriesData();
  const csvData = timeSeriesData.map((item) => ({ timestamp: item.value[0], value: item.value[1] }));

  const timeSeriesOption = {
    title: { text: 'Time Series (Zoomable)', textStyle: { color: '#0ef' } },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'time',
      axisLine: { lineStyle: { color: '#ccc' } },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#ccc' } },
    },
    dataZoom: [
      { type: 'slider', start: 0, end: 100 },
      { type: 'inside', start: 0, end: 100 },
    ],
    series: [
      {
        name: 'Value',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          color: 'rgba(0, 255, 255, 0.1)',
        },
        lineStyle: {
          color: '#0ef',
        },
        data: timeSeriesData,
      },
    ],
  };

  const barData = [5, 20, 36, 10, 10];
  const barColors = barData.map(value => value > 30 ? '#3faeff' : '#8bdc65');

  const barOption = {
    title: { text: 'Bar Graph', textStyle: { color: '#0ef' } },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E'],
      axisLine: { lineStyle: { color: '#ccc' } },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#ccc' } },
    },
    series: [
      {
        data: barData,
        type: 'bar',
        itemStyle: {
          color: (params) => barColors[params.dataIndex],
        },
        label: {
          show: true,
          position: 'top',
          color: '#fff',
        },
      },
    ],
  };

  const pieOption = {
    title: {
      text: 'Pie Chart',
      left: 'center',
      textStyle: { color: '#0ef' },
    },
    tooltip: { trigger: 'item' },
    series: [
      {
        name: 'Access Source',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  const stackedOption = {
    title: { text: 'Stacked Bar', textStyle: { color: '#0ef' } },
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['Email', 'Union Ads', 'Video Ads'],
      textStyle: { color: '#aaa' },
    },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Email',
        type: 'bar',
        stack: 'Total',
        data: [120, 132, 101, 134, 90],
      },
      {
        name: 'Union Ads',
        type: 'bar',
        stack: 'Total',
        data: [220, 182, 191, 234, 290],
      },
      {
        name: 'Video Ads',
        type: 'bar',
        stack: 'Total',
        data: [150, 232, 201, 154, 190],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h1>📊 Analytics Dashboard</h1>

      <div className="datepicker-range">
        <div className="picker-group">
          <label>From:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="picker-group">
          <label>To:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <CSVLink data={csvData} filename="timeseries-data.csv" className="export-btn">
          📥 Export CSV
        </CSVLink>
      </div>

      <div className="charts-grid">
        <ReactECharts option={timeSeriesOption} className="chart" />
        <ReactECharts option={barOption} className="chart" />
        <ReactECharts option={pieOption} className="chart" />
        <ReactECharts option={stackedOption} className="chart" />
      </div>
    </div>
  );
};

export default Dashboard;

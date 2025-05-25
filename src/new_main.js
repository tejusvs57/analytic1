// Dashboard.jsx
import React from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './new_main.css';

import TimeSeriesChart from './charts/TimeSeriesChart';
// import BarChart from './charts/BarChart';
// import PieChart from './charts/PieChart';
// import StackedBarChart from './charts/StackedBarChart';

const layout = [
  { i: 'ts', x: 0, y: 0, w: 6, h: 4 },
  { i: 'bar', x: 6, y: 0, w: 6, h: 4 },
  { i: 'pie', x: 0, y: 4, w: 6, h: 4 },
  { i: 'stacked', x: 6, y: 4, w: 6, h: 4 }
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={1200}
        draggableHandle=".draggable-header"
        isResizable={true}
        isDraggable={true}
      >
        <div key="ts" className="graph-container">
          <div className="draggable-header">Time Series Graph</div>
          <TimeSeriesChart />
        </div>
        <div key="bar" className="graph-container">
          <div className="draggable-header">Bar Graph</div>
          {/* <BarChart /> */}
        </div>
        <div key="pie" className="graph-container">
          <div className="draggable-header">Pie Graph</div>
          {/* <PieChart /> */}
        </div>
        <div key="stacked" className="graph-container">
          <div className="draggable-header">Stacked Bar Graph</div>
          {/* <StackedBarChart /> */}
        </div>
      </GridLayout>
    </div>
  );
};

export default Dashboard;

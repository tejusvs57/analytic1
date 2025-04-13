import React from 'react';
import GridLayout from 'react-grid-layout';
import TimeSeriesChart from './charts/TimeSeriesChart';
// import BarChart from './charts/BarChart';
// import PieChart from './charts/PieChart';
// import StackedBarChart from './charts/StackedBarChart';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const Dashboard = () => {
  const layout = [
    { i: 'time', x: 0, y: 0, w: 6, h: 4 },
    { i: 'bar', x: 6, y: 0, w: 6, h: 4 },
    { i: 'pie', x: 0, y: 4, w: 6, h: 4 },
    { i: 'stacked', x: 6, y: 4, w: 6, h: 4 },
  ];

  return (
    <div style={{ background: '#111', minHeight: '100vh', padding: '20px' }}>
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>📊 Interactive Dashboard</h2>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={1200}
        draggableHandle=".dragHandle"
      >
        <div key="time" className="dragHandle" style={{ background: '#1e1e1e', padding: '10px', borderRadius: '10px' }}>
          <TimeSeriesChart />
        </div>
        {/* <div key="bar" className="dragHandle" style={{ background: '#1e1e1e', padding: '10px', borderRadius: '10px' }}>
          <BarChart />
        </div>
        <div key="pie" className="dragHandle" style={{ background: '#1e1e1e', padding: '10px', borderRadius: '10px' }}>
          <PieChart />
        </div>
        <div key="stacked" className="dragHandle" style={{ background: '#1e1e1e', padding: '10px', borderRadius: '10px' }}>
          <StackedBarChart />
        </div> */}
      </GridLayout>
    </div>
  );
};

export default Dashboard;

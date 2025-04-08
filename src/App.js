import './App.css';
import AnimatedEventCharts from './bartrial';
import CoolDataGrid from './grid';
import NavbarSidebar from './navsidebar';
import StackedChart from './stackedbar';
//import TimeRange from './time';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Time.css"; // Import the CSS for neon styles
import TimeSeriesChart from './trial';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { format } from 'date-fns';

import ScatterGraphBuilder from "./ScatterGraphBuilder";
import AuthForm from './login';
import WebSocketNotification from './notification';
import DeviceDashboard from './DeviceDashboard';


//export default MyChart;


function App() {

  const [startDate, setStartDate] = useState(() => {
    const oneDayBack = new Date();
    oneDayBack.setDate(oneDayBack.getDate() - 1);
    return oneDayBack;
  });

  const sampleData = [
    {
      name: "Alpha",
      age: 25,
      score: 87,
      height: 175,
      weight: 68,
      hoursSpent: 5,
      efficiency: 78,
      accuracy: 92,
      experience: 2,
      projects: 3,
    },
    {
      name: "Bravo",
      age: 30,
      score: 74,
      height: 168,
      weight: 72,
      hoursSpent: 6,
      efficiency: 81,
      accuracy: 88,
      experience: 5,
      projects: 6,
    },
    {
      name: "Charlie",
      age: 28,
      score: 93,
      height: 182,
      weight: 70,
      hoursSpent: 4,
      efficiency: 85,
      accuracy: 96,
      experience: 3,
      projects: 4,
    },
    {
      name: "Delta",
      age: 22,
      score: 65,
      height: 170,
      weight: 65,
      hoursSpent: 3,
      efficiency: 72,
      accuracy: 82,
      experience: 1,
      projects: 2,
    },
    {
      name: "Echo",
      age: 35,
      score: 88,
      height: 178,
      weight: 80,
      hoursSpent: 7,
      efficiency: 90,
      accuracy: 94,
      experience: 7,
      projects: 9,
    },
  ];
  
  
  const [endDate, setEndDate] = useState(new Date());

  const formattedStart = format(startDate, 'yyyy-MM-dd HH:mm:ss');
  const formattedEnd = format(endDate, 'yyyy-MM-dd HH:mm:ss');
  

  const TimeRange = () => {
    
    return (
      <div className="timerange-container">
        <label className="timerange-label">Select Time Range</label>
        <div className="timerange-inputs">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            className="timerange-input"
          />
          <span className="to-text">to</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            className="timerange-input"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="App" >
    <Router>
      <Routes>
        {/* Public Login/Register Route */}
        <Route path="/home" element={<DeviceDashboard />} />
        <Route path="/login" element={<AuthForm />} />

        {/* Protected Route */}

        {/* Add more protected pages similarly */}
      </Routes>
    </Router>

    {/* <NavbarSidebar />
    <div style={{marginLeft:'50px'}}>
    <WebSocketNotification/>
    <TimeRange style={{marginTop:'30px'}} /> */}
   
   
    {/* <MyChart />
    <Line data={data} options={options} />; */}
    {/* <TimeSeriesChart from={formattedStart} to={formattedEnd}/>
    <AnimatedEventCharts from={formattedStart} to={formattedEnd} />
    <StackedChart />

    <CoolDataGrid from={formattedStart} to={formattedEnd} style={{marginTop:'30px'}} />

    <div>
    <h1 style={{ textAlign: "center", color: "#66d9ff" }}>📊 Dynamic Scatter Graphs</h1>
    <ScatterGraphBuilder  />
    </div>

   
    </div> */}

   
    
    </div>
  );
}

export default App;

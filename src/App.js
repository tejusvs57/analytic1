import './App.css';
import AnimatedEventCharts from './bartrial';
import CoolDataGrid from './grid';
import NavbarSidebar from './navsidebar';
import StackedChart from './stackedbar';
import TimeRange from './time';
import TimeSeriesChart from './trial';
import React, { useState, useEffect } from "react";


//export default MyChart;


function App() {

  
  return (
    <div className="App" >
    <NavbarSidebar />
    <div style={{marginLeft:'50px'}}>
    <TimeRange style={{marginTop:'30px'}} />
    {/* <MyChart />
    <Line data={data} options={options} />; */}
    <TimeSeriesChart/>
    <AnimatedEventCharts />
    <StackedChart />

    <CoolDataGrid style={{marginTop:'30px'}} />
    </div>
    
    </div>
  );
}

export default App;

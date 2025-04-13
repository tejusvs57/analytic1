import React, { useState } from 'react';
import { FaChartBar, FaChartPie, FaBars, FaTimes, FaHome } from 'react-icons/fa';
import './NavbarSidebar.css';
// import Dashboard from './Dashboard';
import { Route, Switch } from 'react-router-dom';

const NavbarSidebarLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="layout">
      <nav className="navbar no-glow">
        <div className="nav-left">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="toggle-btn">
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="logo">📊 My Analytics</h1>
        </div>
      </nav>

      <div className="main-section">
        <aside className={`sidebar clean-style ${sidebarOpen ? 'open' : ''}`}>
          <ul>
            <li><FaHome /> Home</li>
            <li><FaChartBar /> Bar Graph</li>
            <li><FaChartPie /> Pie Chart</li>
            <li><FaChartBar /> Time Series</li>
          </ul>
        </aside>

        {/* <main className="content">
          <Switch> */}
            {/* <Route path="/" exact component={Dashboard} /> */}
            {/* Add other routes if necessary */}
          {/* </Switch>
        </main> */}
      </div>
    </div>
  );
};

export default NavbarSidebarLayout;

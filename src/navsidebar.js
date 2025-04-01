import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Home, Dashboard, Settings, Menu as MenuIcon } from '@mui/icons-material';

const NavbarSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: sidebarOpen ? '250px' : '60px', // Conditionally change width based on sidebarOpen state
          backgroundColor: '#0e112d',
          boxShadow: '4px 0 20px rgba(0, 204, 255, 0.5)',
          transition: 'width 0.3s ease',
          zIndex: 1000,
          overflowX: 'hidden',
          paddingTop: '50px',
        }}
      >
        <List sx={{ width: '100%', padding: 0 }}>
          {/* Home Icon and Text */}
          <ListItem sx={sidebarListItemStyle}>
            <Home sx={sidebarIconStyle} />
            {sidebarOpen && (
              <ListItemText
                primary="Home"
                sx={sidebarTextStyle}
              />
            )}
          </ListItem>
          
          {/* Dashboard Icon and Text */}
          <ListItem sx={sidebarListItemStyle}>
            <Dashboard sx={sidebarIconStyle} />
            {sidebarOpen && (
              <ListItemText
                primary="Dashboard"
                sx={sidebarTextStyle}
              />
            )}
          </ListItem>
          
          {/* Settings Icon and Text */}
          <ListItem sx={sidebarListItemStyle}>
            <Settings sx={sidebarIconStyle} />
            {sidebarOpen && (
              <ListItemText
                primary="Settings"
                sx={sidebarTextStyle}
              />
            )}
          </ListItem>
        </List>
      </Box>

      {/* Navbar */}
      <Box sx={navbarStyle}>
        <Typography sx={navbarTextStyle}>🚀 CoolApp</Typography>
        <IconButton sx={menuButtonStyle} onClick={toggleSidebar}>
          <MenuIcon sx={{ color: '#66d9ff' }} />
        </IconButton>
      </Box>

      {/* Main content area */}
    </Box>
  );
};

const navbarStyle = {
  backgroundColor: '#080A1E',
  padding: '15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0px 2px 10px rgba(0, 204, 255, 0.5)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 999, // Navbar is always above other content
};

const navbarTextStyle = {
  color: '#66d9ff',
  fontWeight: 'bold',
  fontSize: '24px',
  textShadow: '0px 0px 8px rgba(0, 204, 255, 0.7)',
};

const menuButtonStyle = {
  color: '#66d9ff',
};

const sidebarListItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px 20px',
  '&:hover': {
    backgroundColor: 'rgba(0, 204, 255, 0.3)',
    cursor: 'pointer',
  },
};

const sidebarIconStyle = {
  color: '#66d9ff',
  fontSize: '24px',
  marginRight: '15px',
};

const sidebarTextStyle = {
  color: '#66d9ff',
  fontSize: '18px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  textShadow: '0px 0px 8px rgba(0, 204, 255, 0.7)',
};

export default NavbarSidebar;

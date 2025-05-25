import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { CSVLink } from 'react-csv';
import {
  Box,
  Typography,
  Button,
  TextField,
  createTheme,
  ThemeProvider,
} from '@mui/material';

const darkTheme = createTheme({
  palette: { mode: 'dark' },
});

const customSelectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#333',
    borderColor: '#555',
    color: '#fff',
    zIndex: 2,
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#222',
    zIndex: 5,
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused ? '#444' : isSelected ? '#555' : '#222',
    color: 'white',
  }),
  singleValue: (styles) => ({ ...styles, color: 'white' }),
  multiValue: (styles) => ({ ...styles, backgroundColor: '#555' }),
  multiValueLabel: (styles) => ({ ...styles, color: 'white' }),
};

const DataFetcherMUI = () => {
  const [events, setEvents] = useState([]);
  const [devices, setDevices] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [csvReady, setCsvReady] = useState(false);

  useEffect(() => {
    const sampleEvents = [
      { label: 'All event', value: 'ALL' },
      { label: 'Login', value: 'Login' },
      { label: 'Logout', value: 'Logout' },
      { label: 'AccessDenied', value: 'AccessDenied' },
    ];
    const sampleDevices = [
      { label: 'All device', value: 'ALL' },
      { label: 'Sensor-A', value: 'Sensor-A' },
      { label: 'Sensor-B', value: 'Sensor-B' },
      { label: 'Camera-X', value: 'Camera-X' },
    ];
    const sampleParameters = [
      { label: 'All param', value: 'ALL' },
      { label: 'Temperature', value: 'Temperature' },
      { label: 'Humidity', value: 'Humidity' },
      { label: 'Pressure', value: 'Pressure' },
      { label: 'Voltage', value: 'Voltage' },
    ];

    setEvents(sampleEvents);
    setDevices(sampleDevices);
    setParameters(sampleParameters);
  }, []);

  const handleSubmit = async () => {
    if (!selectedEvent || !selectedDevice || selectedParameters.length === 0 || !fromTime || !toTime) {
      alert('Please fill all fields');
      return;
    }

    const response = await axios.post('http://localhost:5000/api/data/fetch', {
      event: selectedEvent.value,
      device: selectedDevice.value,
      parameters: selectedParameters.map((p) => p.value),
      fromTime,
      toTime,
    });

    setFetchedData(response.data);
    setCsvReady(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ p: 4, bgcolor: '#121212', color: 'white' }}>
        <Typography variant="h4" gutterBottom>Data Fetcher Tool</Typography>

        <Box mb={2}>
          <Typography>Event</Typography>
          <Select
            options={events}
            onChange={setSelectedEvent}
            styles={customSelectStyles}
            placeholder="Select event"
            menuPortalTarget={document.body}
          />
        </Box>

        <Box mb={2}>
          <Typography>Device</Typography>
          <Select
            options={devices}
            onChange={setSelectedDevice}
            styles={customSelectStyles}
            placeholder="Select device"
            menuPortalTarget={document.body}
          />
        </Box>

        <Box mb={2} sx={{ width: '100%' }}>
          <Typography>Parameters</Typography>
          <Select
            isMulti
            options={parameters}
            onChange={setSelectedParameters}
            styles={customSelectStyles}
            placeholder="Select parameters"
            menuPortalTarget={document.body}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            label="From Time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            sx={{ input: { color: 'white' }, flex: 1, minWidth: '200px' }}
          />
          <TextField
            label="To Time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            sx={{ input: { color: 'white' }, flex: 1, minWidth: '200px' }}
          />
        </Box>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Fetch Data
        </Button>

        {csvReady && fetchedData.length > 0 && (
          <Box mt={3}>
            <CSVLink data={fetchedData} filename="data.csv" style={{ textDecoration: 'none' }}>
              <Button variant="outlined" color="secondary">Download CSV</Button>
            </CSVLink>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default DataFetcherMUI;

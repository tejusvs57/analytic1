import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
} from '@mui/material';
import Select from 'react-select';
import axios from 'axios';
import { DateTimePicker } from '@mui/x-date-pickers';

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#121212',
    color: '#fff',
    borderColor: '#444',
    minHeight: 40,
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#1e1e1e',
    color: '#fff',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#333' : '#1e1e1e',
    color: '#fff',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#444',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff',
  }),
};

const DataFetcherMUI = () => {
  const [events, setEvents] = useState([]);
  const [devices, setDevices] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);

  useEffect(() => {
    // Sample data
    setEvents([
      { label: 'All Events', value: 'ALL' },
      { label: 'Login', value: 'Login' },
      { label: 'Logout', value: 'Logout' },
      { label: 'AccessDenied', value: 'AccessDenied' },
    ]);

    setDevices([
      { label: 'All Devices', value: 'ALL' },
      { label: 'Sensor-A', value: 'Sensor-A' },
      { label: 'Sensor-B', value: 'Sensor-B' },
      { label: 'Camera-X', value: 'Camera-X' },
    ]);

    setParameters([
      { label: 'All Parameters', value: 'ALL' },
      { label: 'Temperature', value: 'Temperature' },
      { label: 'Humidity', value: 'Humidity' },
      { label: 'Pressure', value: 'Pressure' },
      { label: 'Voltage', value: 'Voltage' },
    ]);
  }, []);

  const handleFetchData = () => {
    console.log({
      selectedEvent,
      selectedDevice,
      selectedParameters,
      fromTime,
      toTime,
    });

    // axios.post('/api/data/fetch', { ... }) ← comment for future
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#000', color: '#fff' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Fetch Event Data
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4} md={3}>
          <Typography sx={{ mb: 1 }}>Event</Typography>
          <Select
            options={events}
            value={selectedEvent}
            onChange={setSelectedEvent}
            styles={customStyles}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <Typography sx={{ mb: 1 }}>Device</Typography>
          <Select
            options={devices}
            value={selectedDevice}
            onChange={setSelectedDevice}
            styles={customStyles}
          />
        </Grid>

        <Grid item xs={12} sm={8} md={6}>
          <Typography sx={{ mb: 1 }}>Parameters</Typography>
          <Select
            isMulti
            options={parameters}
            value={selectedParameters}
            onChange={setSelectedParameters}
            styles={customStyles}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography sx={{ mb: 1 }}>From</Typography>
          <DateTimePicker
            value={fromTime}
            onChange={setFromTime}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
                sx: { input: { color: '#fff' }, backgroundColor: '#1c1c1c' },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography sx={{ mb: 1 }}>To</Typography>
          <DateTimePicker
            value={toTime}
            onChange={setToTime}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
                sx: { input: { color: '#fff' }, backgroundColor: '#1c1c1c' },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchData}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Fetch Data
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataFetcherMUI;

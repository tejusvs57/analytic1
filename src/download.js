// Working example with MUI v5+, dark mode, smaller dropdowns, and proper imports

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  TextField
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

// Sample options
const sampleEvents = ['All Events', 'Login', 'Logout', 'Error'];
const sampleDevices = ['All Devices', 'Device A', 'Device B'];
const sampleParameters = ['Temperature', 'Voltage', 'Current', 'Humidity'];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const SmallSelect = styled(Select)(({ theme }) => ({
  minWidth: 140,
  backgroundColor: theme.palette.background.paper,
}));

const ParameterSelect = styled(Select)(({ theme }) => ({
  minWidth: 200,
  backgroundColor: theme.palette.background.paper,
}));

export default function EventDeviceParameterSelector() {
  const [event, setEvent] = useState('All Events');
  const [device, setDevice] = useState('All Devices');
  const [parameter, setParameter] = useState('Temperature');
  const [fromTime, setFromTime] = useState(dayjs());
  const [toTime, setToTime] = useState(dayjs());

  const handleSubmit = () => {
    const payload = {
      event,
      device,
      parameter,
      from: fromTime.toISOString(),
      to: toTime.toISOString(),
    };
    console.log('Submit Payload:', payload);
    // TODO: Send this payload to backend
    // fetch('/api/download-data', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box p={3} bgcolor="background.default" color="text.primary">
        <Typography variant="h5" mb={3}>Event & Device Data Fetcher</Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FormControl>
              <InputLabel>Event</InputLabel>
              <SmallSelect
                value={event}
                label="Event"
                onChange={(e) => setEvent(e.target.value)}
              >
                {sampleEvents.map((evt, i) => (
                  <MenuItem key={i} value={evt}>{evt}</MenuItem>
                ))}
              </SmallSelect>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl>
              <InputLabel>Device</InputLabel>
              <SmallSelect
                value={device}
                label="Device"
                onChange={(e) => setDevice(e.target.value)}
              >
                {sampleDevices.map((dev, i) => (
                  <MenuItem key={i} value={dev}>{dev}</MenuItem>
                ))}
              </SmallSelect>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl>
              <InputLabel>Parameter</InputLabel>
              <ParameterSelect
                value={parameter}
                label="Parameter"
                onChange={(e) => setParameter(e.target.value)}
              >
                {sampleParameters.map((param, i) => (
                  <MenuItem key={i} value={param}>{param}</MenuItem>
                ))}
              </ParameterSelect>
            </FormControl>
          </Grid>

          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="From"
                value={fromTime}
                onChange={(newVal) => setFromTime(newVal)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="To"
                value={toTime}
                onChange={(newVal) => setToTime(newVal)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Download Data
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

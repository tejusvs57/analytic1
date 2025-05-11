import React, { useState, useEffect } from 'react';
import {
  Box, Button, MenuItem, Select, InputLabel, FormControl,
  Typography, CircularProgress, TextField
} from '@mui/material';
import Papa from 'papaparse';
import DownloadIcon from '@mui/icons-material/Download';
import { default as ReactSelect } from 'react-select';

const EventDeviceParameterSelector = () => {
  const [events, setEvents] = useState([]);
  const [devices, setDevices] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedParams, setSelectedParams] = useState([]);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEvents(['Flight Start', 'Engine Check', 'Battery Drain']);
    setDevices(['Device A', 'Device B', 'Device C']);
    setParameters(Array.from({ length: 500 }, (_, i) => ({
      label: `Param ${i + 1}`,
      value: `param_${i + 1}`
    })));
  }, []);

  const handleFetchData = async () => {
    if (!fromTime || !toTime) {
      alert('Please select both From and To time.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const fakeData = selectedParams.map((param, i) => ({
        event: selectedEvent,
        device: selectedDevice,
        parameter: param.value,
        value: Math.random().toFixed(3),
        timestamp: new Date().toISOString(),
      }));
      setData(fakeData);
      setLoading(false);
    }, 1000);
  };

  const handleDownload = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };

  return (
    <Box sx={{
      backgroundColor: '#121212',
      color: '#fff',
      p: 3,
      borderRadius: 2,
      maxWidth: 800,
      mx: 'auto',
    }}>
      <Typography variant="h5" gutterBottom>
        Select Event, Device, Time Range, and Parameters
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ color: '#ccc' }}>Event</InputLabel>
          <Select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            label="Event"
            sx={{ color: '#fff', background: '#1f1f1f' }}
          >
            {events.map((event) => (
              <MenuItem key={event} value={event}>{event}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel sx={{ color: '#ccc' }}>Device</InputLabel>
          <Select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            label="Device"
            sx={{ color: '#fff', background: '#1f1f1f' }}
          >
            {devices.map((device) => (
              <MenuItem key={device} value={device}>{device}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
        <TextField
          label="From Time"
          type="datetime-local"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          InputLabelProps={{ shrink: true, style: { color: '#ccc' } }}
          InputProps={{ style: { color: '#fff', background: '#1f1f1f' } }}
        />

        <TextField
          label="To Time"
          type="datetime-local"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          InputLabelProps={{ shrink: true, style: { color: '#ccc' } }}
          InputProps={{ style: { color: '#fff', background: '#1f1f1f' } }}
        />
      </Box>

      <ReactSelect
        isMulti
        name="parameters"
        options={parameters}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={setSelectedParams}
        placeholder="Select parameters..."
        styles={{
          control: (base) => ({ ...base, backgroundColor: '#1f1f1f', color: '#fff' }),
          menu: (base) => ({ ...base, backgroundColor: '#1f1f1f', color: '#fff' }),
          input: (base) => ({ ...base, color: '#fff' }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? '#333' : '#1f1f1f',
            color: '#fff',
          }),
          multiValue: (base) => ({ ...base, backgroundColor: '#333', color: '#fff' }),
          multiValueLabel: (base) => ({ ...base, color: '#fff' }),
        }}
      />

      <Box mt={2} display="flex" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchData}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Fetch Data'}
        </Button>

        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          disabled={!data.length}
          sx={{ color: '#fff', borderColor: '#888' }}
        >
          Download CSV
        </Button>
      </Box>

      {data.length > 0 && (
        <Box mt={3}>
          <Typography variant="h6">Fetched {data.length} Records</Typography>
        </Box>
      )}
    </Box>
  );
};

export default EventDeviceParameterSelector;

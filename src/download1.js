import React, { useState, useEffect } from 'react';
import {
  Box, Button, MenuItem, Select, InputLabel, FormControl,
  Typography, CircularProgress, TextField, Card, Divider
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import DevicesIcon from '@mui/icons-material/Devices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import { default as ReactSelect } from 'react-select';
import Papa from 'papaparse';

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
      const fakeData = selectedParams.map((param) => ({
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
    <Card sx={{
      backgroundColor: '#1a1a1a',
      color: '#fff',
      p: 4,
      maxWidth: 900,
      mx: 'auto',
      mt: 4,
      boxShadow: 5,
      borderRadius: 3,
    }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Event Data Selector
      </Typography>

      <Divider sx={{ my: 3, borderColor: '#444' }} />

      <Box display="flex" gap={3} flexWrap="wrap" mb={3}>
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel sx={{ color: '#ccc' }}>
            <EventIcon sx={{ mr: 1 }} /> Event
          </InputLabel>
          <Select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            label="Event"
            sx={{ color: '#fff', backgroundColor: '#2a2a2a' }}
          >
            {events.map((event) => (
              <MenuItem key={event} value={event}>{event}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel sx={{ color: '#ccc' }}>
            <DevicesIcon sx={{ mr: 1 }} /> Device
          </InputLabel>
          <Select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            label="Device"
            sx={{ color: '#fff', backgroundColor: '#2a2a2a' }}
          >
            {devices.map((device) => (
              <MenuItem key={device} value={device}>{device}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" gap={3} flexWrap="wrap" mb={3}>
        <TextField
          label="From Time"
          type="datetime-local"
          value={fromTime}
          onChange={(e) => setFromTime(e.target.value)}
          InputLabelProps={{ shrink: true, style: { color: '#ccc' } }}
          InputProps={{
            startAdornment: <AccessTimeIcon sx={{ mr: 1, color: '#ccc' }} />,
            style: { color: '#fff', backgroundColor: '#2a2a2a' },
          }}
          sx={{ width: 250 }}
        />

        <TextField
          label="To Time"
          type="datetime-local"
          value={toTime}
          onChange={(e) => setToTime(e.target.value)}
          InputLabelProps={{ shrink: true, style: { color: '#ccc' } }}
          InputProps={{
            startAdornment: <AccessTimeIcon sx={{ mr: 1, color: '#ccc' }} />,
            style: { color: '#fff', backgroundColor: '#2a2a2a' },
          }}
          sx={{ width: 250 }}
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
          control: (base) => ({ ...base, backgroundColor: '#2a2a2a', color: '#fff' }),
          menu: (base) => ({ ...base, backgroundColor: '#1a1a1a', color: '#fff' }),
          input: (base) => ({ ...base, color: '#fff' }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? '#333' : '#2a2a2a',
            color: '#fff',
          }),
          multiValue: (base) => ({ ...base, backgroundColor: '#444', color: '#fff' }),
          multiValueLabel: (base) => ({ ...base, color: '#fff' }),
        }}
      />

      <Box mt={4} display="flex" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetchData}
          disabled={loading}
          startIcon={<SearchIcon />}
          sx={{
            textTransform: 'none',
            '&:hover': { backgroundColor: '#2962ff' },
            px: 3,
            py: 1.5
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Fetch Data'}
        </Button>

        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          disabled={!data.length}
          sx={{
            color: '#fff',
            borderColor: '#888',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#bbb',
              backgroundColor: '#333'
            },
            px: 3,
            py: 1.5
          }}
        >
          Download CSV
        </Button>
      </Box>

      {data.length > 0 && (
        <Box mt={4}>
          <Typography variant="subtitle1" color="#ccc">
            ✅ Fetched {data.length} Records
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default EventDeviceParameterSelector;

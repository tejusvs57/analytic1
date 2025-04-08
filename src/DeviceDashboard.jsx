import React, { useState } from 'react';
import {
  Grid,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Pagination,
  Stack,
} from '@mui/material';
import DeviceCard from './DeviceCard';
import { motion, AnimatePresence } from 'framer-motion';

const DeviceDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [activeFilter, setActiveFilter] = useState('all');
  const [loggingFilter, setLoggingFilter] = useState('all');
  const [page, setPage] = useState(1);
  const devicesPerPage = 6;

  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'Device Alpha',
      logging: true,
      loggingType: 'event',
      lastAvailable: '2025-04-09T10:00:00',
      lastUploaded: '2025-04-09T09:50:00',
      isActive: true,
    },
    {
      id: 2,
      name: 'Device Beta',
      logging: false,
      loggingType: 'continuous',
      lastAvailable: '2025-04-09T09:30:00',
      lastUploaded: '2025-04-09T09:25:00',
      isActive: false,
    },
    {
      id: 3,
      name: 'Device Gamma',
      logging: true,
      loggingType: 'event',
      lastAvailable: '2025-04-08T21:20:00',
      lastUploaded: '2025-04-08T21:15:00',
      isActive: true,
    },
    {
      id: 4,
      name: 'Device Delta',
      logging: false,
      loggingType: 'continuous',
      lastAvailable: '2025-04-07T14:45:00',
      lastUploaded: '2025-04-07T14:40:00',
      isActive: true,
    },
    {
      id: 5,
      name: 'Device Epsilon',
      logging: true,
      loggingType: 'event',
      lastAvailable: '2025-04-07T12:00:00',
      lastUploaded: '2025-04-07T11:50:00',
      isActive: false,
    },
    {
      id: 6,
      name: 'Device Zeta',
      logging: true,
      loggingType: 'continuous',
      lastAvailable: '2025-04-06T10:15:00',
      lastUploaded: '2025-04-06T10:00:00',
      isActive: true,
    },
    {
      id: 7,
      name: 'Device Omega',
      logging: false,
      loggingType: 'event',
      lastAvailable: '2025-04-05T18:00:00',
      lastUploaded: '2025-04-05T17:50:00',
      isActive: true,
    },
  ]);

  const handleToggle = (id) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id ? { ...device, logging: !device.logging } : device
      )
    );
  };

  const handleTypeChange = (id, newType) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id ? { ...device, loggingType: newType } : device
      )
    );
  };

  // filtering
  let filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (activeFilter !== 'all') {
    filteredDevices = filteredDevices.filter(
      (device) => device.isActive === (activeFilter === 'active')
    );
  }

  if (loggingFilter !== 'all') {
    filteredDevices = filteredDevices.filter(
      (device) => device.logging === (loggingFilter === 'on')
    );
  }

  // sorting
  if (sortField) {
    filteredDevices.sort((a, b) => {
      const dateA = new Date(a[sortField]);
      const dateB = new Date(b[sortField]);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  // pagination
  const pageCount = Math.ceil(filteredDevices.length / devicesPerPage);
  const paginatedDevices = filteredDevices.slice(
    (page - 1) * devicesPerPage,
    page * devicesPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#00bcd4' }}>
        Device Monitor Dashboard
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search Devices"
            variant="outlined"
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="lastAvailable">Last Available</MenuItem>
              <MenuItem value="lastUploaded">Last Uploaded</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormControl fullWidth>
            <InputLabel>Order</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              label="Order"
            >
              <MenuItem value="desc">Newest</MenuItem>
              <MenuItem value="asc">Oldest</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormControl fullWidth>
            <InputLabel>Active</InputLabel>
            <Select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              label="Active"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <FormControl fullWidth>
            <InputLabel>Logging</InputLabel>
            <Select
              value={loggingFilter}
              onChange={(e) => setLoggingFilter(e.target.value)}
              label="Logging"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="on">On</MenuItem>
              <MenuItem value="off">Off</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Cards */}
      <Grid container spacing={3}>
        <AnimatePresence>
          {paginatedDevices.map((device) => (
            <Grid item key={device.id} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <DeviceCard
                  device={device}
                  handleToggle={handleToggle}
                  handleTypeChange={handleTypeChange}
                />
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {/* Pagination */}
      {pageCount > 1 && (
        <Stack spacing={2} alignItems="center" mt={4}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, val) => setPage(val)}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      )}
    </Box>
  );
};

export default DeviceDashboard;

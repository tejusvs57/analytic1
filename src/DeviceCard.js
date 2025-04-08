import React from 'react';
import {
  Card,
  Typography,
  Chip,
  Switch,
  Select,
  MenuItem,
  Box,
  Stack,
  Divider,
} from '@mui/material';

const DeviceCard = ({device, handleToggle, handleTypeChange  }) => {
  return (
    <Card
      sx={{
        width: 360,
        background: 'rgba(20, 24, 45, 0.8)',
        borderRadius: '20px',
        boxShadow: '0 8px 20px rgba(0, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        color: '#e0f7fa',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.01)',
          boxShadow: '0 12px 30px rgba(0, 255, 255, 0.25)',
        },
        padding: 3,
        margin: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold" color="#80deea">
          {device.name}
        </Typography>
        <Chip
          label={device.isActive ? 'Active' : 'Inactive'}
          size="small"
          sx={{
            backgroundColor: device.isActive ? '#004d40' : '#424242',
            color: device.isActive ? '#00e676' : '#ccc',
            fontWeight: 'bold',
            px: 1,
            borderRadius: '10px',
            fontSize: '0.75rem',
          }}
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="#b2ebf2">
            Logging:
          </Typography>
          <Switch
            checked={device.logging}
            onChange={() => handleToggle(device.id)}
            color="success"
          />
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="#b2ebf2">
            Logging Type:
          </Typography>
          <Select
            value={device.loggingType}
            onChange={(e) => handleTypeChange(device.id, e.target.value)}
            variant="standard"
            disableUnderline
            sx={{
              color: '#4dd0e1',
              fontWeight: 'bold',
              bgcolor: '#263238',
              px: 1,
              borderRadius: '6px',
              minWidth: '120px',
            }}
          >
            <MenuItem value="event">Event</MenuItem>
            <MenuItem value="continuous">Continuous</MenuItem>
          </Select>
        </Box>

        <Typography variant="body2" color="gray">
          Last Available: <span style={{ color: '#fff' }}>{device.lastAvailable}</span>
        </Typography>

        <Typography variant="body2" color="gray">
          Last Uploaded: <span style={{ color: '#fff' }}>{device.lastUploaded}</span>
        </Typography>
      </Stack>
    </Card>
  );
};

export default DeviceCard;

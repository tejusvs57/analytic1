import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Chip,
  Typography,
  Grid,
} from '@mui/material';


const isValidIp = (ip) => {
  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
  return ipRegex.test(ip);
};

const IpAddressCollector = () => {
  const [ip, setIp] = useState('');
  const [ipList, setIpList] = useState([]);
  const [error, setError] = useState('');

  const handleAddIp = () => {
    if (!ip) return;

    if (!isValidIp(ip)) {
      setError('Invalid IP address format.');
      return;
    }

    if (ipList.includes(ip)) {
      setError('IP already added.');
      return;
    }

    setIpList([...ipList, ip]);
    setIp('');
    setError('');
  };

  const handleDeleteIp = (deleteIp) => {
    setIpList(ipList.filter((item) => item !== deleteIp));
  };

  const handleSubmit = async () => {
    if (ipList.length === 0) {
      alert('No IPs to submit.');
      return;
    }

    try {
      // 🔁 Replace with your actual endpoint
     // await axios.post('/api/save-ips', { ips: ipList });
      alert('IPs submitted successfully!');
      setIpList([]);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting IPs.');
    }
  };

  return (
    <Box p={4} sx={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Typography variant="h6" mb={2}>IP Address Collector</Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Enter IP Address"
            variant="outlined"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{
              input: { color: '#fff' },
              label: { color: '#aaa' },
              '.MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#555' },
                '&:hover fieldset': { borderColor: '#999' },
              },
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={handleAddIp} fullWidth>
            + Add IP
          </Button>
        </Grid>
      </Grid>

      <Box mt={2}>
        {ipList.map((ip, index) => (
          <Chip
            key={index}
            label={ip}
            onDelete={() => handleDeleteIp(ip)}
            sx={{ m: 0.5, color: '#fff', backgroundColor: '#444' }}
          />
        ))}
      </Box>

      <Button
        variant="contained"
        color="success"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Submit to Server
      </Button>
    </Box>
  );
};

export default IpAddressCollector;

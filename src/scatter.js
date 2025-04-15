// ScatterGraphBuilder.jsx (Dark Theme)

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Autocomplete,
  TextField,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { SaveAlt, Delete } from '@mui/icons-material';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

const ScatterGraphBuilder = () => {
  const [columnNames, setColumnNames] = useState([]);
  const [xField, setXField] = useState('');
  const [yField, setYField] = useState('');
  const [graphs, setGraphs] = useState([]);

  useEffect(() => {
    setColumnNames(['age', 'height', 'weight', 'score', 'temperature']);
  }, []);

  const generateSampleData = (xKey, yKey) => {
    const sample = [];
    for (let i = 0; i < 20; i++) {
      sample.push({
        [xKey]: Math.floor(Math.random() * 100),
        [yKey]: Math.floor(Math.random() * 100),
      });
    }
    return sample;
  };

  const handleAddGraph = () => {
    if (!xField || !yField) return;

    const sampleData = generateSampleData(xField, yField);
    const scatterPoints = sampleData.map((d) => ({
      x: d[xField],
      y: d[yField],
    }));

    setGraphs([
      ...graphs,
      {
        id: Date.now(),
        xField,
        yField,
        data: {
          datasets: [
            {
              label: `${yField} vs ${xField}`,
              data: scatterPoints,
              backgroundColor: 'rgba(0, 200, 255, 0.8)',
            },
          ],
        },
      },
    ]);
  };

  const handleDeleteGraph = (id) => {
    setGraphs(graphs.filter((g) => g.id !== id));
  };

  const handleDownloadGraph = (id) => {
    const canvas = document.getElementById(`graph-${id}`);
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `scatter-graph-${id}.png`;
    link.href = url;
    link.click();
  };

  const handleClearAll = () => {
    setGraphs([]);
  };

  return (
    <Box p={4} sx={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
      <Typography variant="h5" gutterBottom color="white">
        Scatter Graph Builder
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Autocomplete
            options={columnNames}
            getOptionLabel={(option) => option}
            value={xField}
            onChange={(e, newVal) => setXField(newVal)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="X-Axis Column"
                variant="outlined"
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  ...params.InputProps,
                  style: { color: 'white', borderColor: 'white' },
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Autocomplete
            options={columnNames}
            getOptionLabel={(option) => option}
            value={yField}
            onChange={(e, newVal) => setYField(newVal)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Y-Axis Column"
                variant="outlined"
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  ...params.InputProps,
                  style: { color: 'white', borderColor: 'white' },
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddGraph}
            disabled={!xField || !yField}
          >
            Add Graph
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ ml: 2 }}
            onClick={handleClearAll}
            disabled={graphs.length === 0}
          >
            Clear All
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={3}>
        {graphs.map((graph, index) => (
          <Grid item xs={12} md={6} key={graph.id}>
            <Box
              sx={{
                border: '1px solid #555',
                borderRadius: 2,
                p: 2,
                backgroundColor: '#121212',
              }}
            >
              <Typography variant="subtitle1" mb={1} color="white">
                Graph {index + 1}: {graph.yField} vs {graph.xField}
              </Typography>

              <Scatter
                id={`graph-${graph.id}`}
                data={graph.data}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white',
                      },
                    },
                    title: {
                      display: true,
                      text: `${graph.yField} vs ${graph.xField}`,
                      color: 'white',
                    },
                  },
                  scales: {
                    x: {
                      title: { display: true, text: graph.xField, color: 'white' },
                      ticks: { color: 'white' },
                      grid: { color: '#444' },
                    },
                    y: {
                      title: { display: true, text: graph.yField, color: 'white' },
                      ticks: { color: 'white' },
                      grid: { color: '#444' },
                    },
                  },
                }}
              />

              <Box mt={2} display="flex" gap={2}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteGraph(graph.id)}
                >
                  Delete
                </Button>

                <IconButton
                  color="primary"
                  onClick={() => handleDownloadGraph(graph.id)}
                >
                  <SaveAlt />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ScatterGraphBuilder;

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const TimeSeriesChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const option = {
      title: {
        text: 'Time Series Data',
        textStyle: { color: '#fff' },
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'time',
        axisLine: { lineStyle: { color: '#888' } },
        splitLine: { show: false }
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#888' } },
        splitLine: { lineStyle: { color: '#333' } }
      },
      dataZoom: [
        {
          type: 'slider',
          start: 0,
          end: 100,
          bottom: 10
        },
        {
          type: 'inside'
        }
      ],
      toolbox: {
        feature: {
          dataZoom: { yAxisIndex: 'none' },
          restore: {},
          saveAsImage: {}
        },
        iconStyle: {
          borderColor: '#ccc'
        },
        top: 10,
        right: 10
      },
      series: [
        {
          name: 'Random Data',
          type: 'line',
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 255, 255, 0.5)' },
              { offset: 1, color: 'rgba(0, 255, 255, 0)' }
            ])
          },
          itemStyle: {
            color: '#00ffff'
          },
          data: generateRandomTimeSeries()
        }
      ]
    };

    chart.setOption(option);
    return () => chart.dispose();
  }, []);

  const generateRandomTimeSeries = () => {
    const baseTime = new Date().getTime();
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push([
        new Date(baseTime + i * 1000 * 60),
        Math.round(Math.random() * 100)
      ]);
    }
    return data;
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default TimeSeriesChart;

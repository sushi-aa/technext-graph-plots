import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';

function GraphApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch('https://testtechnext1-pearl118.b4a.run/search/api/phases/');
        const jsonResp = await resp.json();
        const formattedData = jsonResp.map((entry) => ({
          phase: formatPhase(entry.phase),
          count: entry.entries,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Fetching data...</div>;
  }

  const chartData = {
    labels: data.map((entry) => entry.phase),
    datasets: [
      {
        type: 'bar',
        label: 'Entries (Bar)',
        data: data.map((entry) => entry.count),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        type: 'line',
        label: 'Entries (Line)',
        data: data.map((entry) => entry.count),
        borderColor: 'rgba(100, 100, 100, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Bar and Line Graph</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default GraphApp;

function formatPhase(phase) {
  if (phase === null) {
    return 'Null';
  }
  const matches = phase.match(/\('(.*)',\)/);
  if (matches && matches.length > 1) {
    return matches[1];
  }
  return 'Null';
}

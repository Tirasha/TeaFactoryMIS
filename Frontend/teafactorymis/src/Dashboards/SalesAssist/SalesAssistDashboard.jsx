import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, CardHeader, IconButton, Modal } from '@mui/material';
import { BarChart, LocalCafe, EventNote } from '@mui/icons-material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesAssistDashboard = () => {
  const [salesData, setSalesData] = useState({
    weekSales: { 'Pekoe': 0, 'B.O.P': 0, 'B.O.P.F': 0 },
    monthSales: { 'Pekoe': 0, 'B.O.P': 0, 'B.O.P.F': 0 },
  });

  const [monthlySalesData, setMonthlySalesData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSalesData = async () => {
    try {
      const response = await fetch('http://localhost:8080/Sales/getsales');
      if (response.ok) {
        const data = await response.json();
        console.log("Sales Data from API:", data); // Log to inspect structure

        const currentDate = new Date();
        const weekAgo = new Date(currentDate);
        const monthAgo = new Date(currentDate);
        
        weekAgo.setDate(currentDate.getDate() - 7);
        monthAgo.setMonth(currentDate.getMonth() - 1);

        const salesByTeaType = data.reduce(
          (acc, sale) => {
            const saleDate = new Date(sale.date);

          
            if (saleDate >= weekAgo) {
              acc.weekSales[sale.teaType] = (acc.weekSales[sale.teaType] || 0) + sale.teaQuantity;
            }

            if (saleDate >= monthAgo) {
              acc.monthSales[sale.teaType] = (acc.monthSales[sale.teaType] || 0) + sale.teaQuantity;
            }

            return acc;
          },
          {
            weekSales: { 'Pekoe': 0, 'B.O.P': 0, 'B.O.P.F': 0 },
            monthSales: { 'Pekoe': 0, 'B.O.P': 0, 'B.O.P.F': 0 },
          }
        );
        setSalesData(salesByTeaType);
      }
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const fetchMonthlySalesData = async () => {
    try {
      if (!monthlySalesData) {
        const response = await fetch('http://localhost:8080/Sales/monthlySales');
        if (response.ok) {
          const data = await response.json();
          console.log("Monthly Sales Data from API:", data); // Log to inspect structure
          setMonthlySalesData(data);
        }
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching monthly sales data:', error);
    }
  };

  const getChartData = () => {
    if (!monthlySalesData) return { labels: [], datasets: [] };

    const months = Object.keys(monthlySalesData);
    const teaTypes = ['Pekoe', 'B.O.P', 'B.O.P.F'];
    const datasets = teaTypes.map((teaType) => ({
      label: teaType,
      backgroundColor: teaType === 'Pekoe' ? '#4caf50' : teaType === 'B.O.P' ? '#81c784' : '#388e3c',
      data: months.map((month) => monthlySalesData[month]?.[teaType] || 0), 
    }));

    return { labels: months, datasets };
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom color="#4CAF50">
        Sales Dashboard
      </Typography>

      <Grid container spacing={2}>
        {['Pekoe', 'B.O.P', 'B.O.P.F'].map((teaType) => (
          <Grid item xs={12} sm={4} key={teaType}>
            <Card
              sx={{
                minWidth: 240,
                maxWidth: 300,
                boxShadow: 5,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #4caf50 30%, #81c784 90%)',
                color: 'white',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '10px 10px 20px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardHeader
                title={`${teaType} Sales`}
                titleTypographyProps={{ variant: 'h7', color: 'white' }}
                avatar={<LocalCafe sx={{ color: 'white' }} />}
              />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: '#ffeb3b' }}>
                    Current Week Sales: <span style={{ fontWeight: 'bold' }}>{salesData.weekSales[teaType] || 0}</span>
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: '#ffeb3b' }}>
                    Current Month Sales: <span style={{ fontWeight: 'bold' }}>{salesData.monthSales[teaType] || 0}</span>
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <IconButton
                    sx={{ color: 'white', backgroundColor: '#388e3c', '&:hover': { backgroundColor: '#2e7d32' } }}
                    onClick={fetchMonthlySalesData}
                  >
                    <BarChart />
                  </IconButton>
                 
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ width: 600, p: 4, backgroundColor: 'white', margin: '100px auto', borderRadius: '8px', boxShadow: 24 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>Monthly Sales Chart</Typography>
          <Bar data={getChartData()} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
        </Box>
      </Modal>
    </Box>
  );
};

export default SalesAssistDashboard;

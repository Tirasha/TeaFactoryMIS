import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent,Table,TableBody,TableCell,TableRow} from '@mui/material';
import SummarizeIcon from '@mui/icons-material/Summarize';

const InventoryAssistDashboard = () => {
  const [teaStockSummary, setTeaStockSummary] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [FertilizerSummary,setFertilizerSummary] =useState([]);


  // Fetch tea stock summary and total quantity on component mount
  useEffect(() => {
    // Fetch data from tea view
    fetch('/inventory/tea_stock_summary')
      .then(response => response.json())
      .then(data => setTeaStockSummary(data))
      .catch(error => console.error('Error fetching tea stock summary:', error));

    // Fetch data from procedure
    fetch('/inventory/total_tea_stock')
    .then(response => response.json())
    .then(data => setTotalQuantity(data)) 
    .catch(error => console.error('Error fetching total quantity:', error));

    //fetch data from the fertilizer view
    fetch('/fertilizer/Fertilizer_stock_summary')
    .then(response =>response.json())
    .then(data=>setFertilizerSummary(data))
    .catch(error=> console.error('Error fetching fertilizer stock summary: ',error));

  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Inventory Dashboard
      </Typography>

      {/* Tea stock summary */}
      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
      <Card sx={{ width: '400px', height: 'auto', backgroundColor: '#e8f5e9' ,marginLeft:'40px'}}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <SummarizeIcon/>      Tea Stock Summary
            </Typography>
            {teaStockSummary.length > 0 ? (
              <Table sx={{ borderCollapse: 'collapse', width: "300px" , mx:'auto'}}>
                <TableBody>
                  {teaStockSummary.map((item, index) => (
                    <TableRow key={index} sx={{ border: 'none' }}>
                      <TableCell sx={{ border: 'none', padding: '4px 0' }}>
                        {item.tea_type}
                      </TableCell>
                      <TableCell align="right" sx={{ border: 'none', padding: '4px 0' }}>
                        {item.available_stock} kg
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography>No data available</Typography>
            )}
             <Typography>
                  {totalQuantity ? (
                    <Table sx={{ borderCollapse: 'collapse', width: "300px" , mx:'auto'}}>
                      <TableBody>
                        <TableRow sx={{ border: 'none' }}>
                          <TableCell sx={{ border: 'none', padding: '4px 0' }}>
                            <b>Total Available Quantity</b>
                          </TableCell>
                          <TableCell align="right" sx={{ border: 'none', padding: '4px 0' }}>
                            <b>{totalQuantity} kg</b>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ) : (
                    <Typography>No data available</Typography>
                  )}
                </Typography>
          </CardContent>
        </Card>
           
      

        {/* Fertilizer stock summary */}
        <Card  sx={{width: '400px', height: 'auto', backgroundColor: '#e8f5e9' ,marginLeft:'40px'}}>
          <CardContent >
            <Typography variant="h6" gutterBottom>
            <SummarizeIcon/>     Fertilizer Stock Summary
            </Typography>
            {FertilizerSummary.length > 0 ? (
              <Table sx={{ borderCollapse: 'collapse', width: "300px" , mx:'auto' }}>
                <TableBody>
                  {FertilizerSummary.map((item, index) => (
                    <TableRow key={index} sx={{ border: 'none' }}>
                      <TableCell sx={{ border: 'none', padding: '4px 0' }}>
                        {item.name}
                      </TableCell>
                      <TableCell align="right" sx={{ border: 'none', padding: '4px 0' }}>
                        {item.quantity} kg
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography>No data available</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default InventoryAssistDashboard;
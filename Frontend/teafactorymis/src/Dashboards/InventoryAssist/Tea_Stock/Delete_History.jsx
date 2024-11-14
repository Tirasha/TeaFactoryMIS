import React from 'react';
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


function Delete_History({ open, handleClose, deleteHistoryData }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          bgcolor: '#f5f5f5',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Delete History
        </Typography>
        <CloseIcon  sx={{cursor: 'pointer', color: 'grey', '&:hover': { color: 'black' } }}
            onClick={handleClose}/>
        </Box>
       

        <TableContainer component={Paper} sx={{ maxHeight: 300 }} >
          <Table stickyHeader aria-label="delete history table" size='small' backgroundColor ='#b6f4c6'>
            <TableHead >
            <TableRow sx={{ backgroundColor: '#e0e0e0' }}> {/* Header color */}
                <TableCell sx={{ color: '#3f51b5', fontWeight: 'bold' }}>Inventory ID</TableCell>
                <TableCell sx={{ color: '#3f51b5', fontWeight: 'bold' }}>Tea Type</TableCell>
                <TableCell sx={{ color: '#3f51b5', fontWeight: 'bold' }}>Available Stock</TableCell>
                <TableCell sx={{ color: '#3f51b5', fontWeight: 'bold' }}>Price per Kg</TableCell>
                <TableCell sx={{ color: '#3f51b5', fontWeight: 'bold' }}>Deleted Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deleteHistoryData.length > 0 ? (
                deleteHistoryData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.inventory_id}</TableCell>
                    <TableCell>{row.tea_type}</TableCell>
                    <TableCell>{row.available_stock} kg</TableCell>
                    <TableCell>Rs:{row.price_per_kg}</TableCell>
                    <TableCell>{row.deleted_time}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
}

export default Delete_History;
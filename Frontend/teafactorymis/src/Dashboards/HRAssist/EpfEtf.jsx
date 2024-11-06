import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const EpfEtf = () => {
    const [epfEtf, setEpfEtf]=useState([]),

    const loadEpfEtf=async()=>{
        const result=await axios.get("http://localhost:8080/basics");
        setEpfEtf(result.data);
        console.log(result.data);
    }

    useEffect(()=>{
        loadEpfEtf();
    },[]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        EPF and ETF
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="EpfAndEtf table">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>EPF Amount</TableCell>
                    <TableCell>ETF Amount</TableCell>
                </TableRow>
            </TableHead>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default EpfEtf
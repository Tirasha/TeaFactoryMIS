import { Box, Typography } from '@mui/material'
import React from 'react'

export const Basics = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Salary Basics
      </Typography>
    </Box>
  )
}

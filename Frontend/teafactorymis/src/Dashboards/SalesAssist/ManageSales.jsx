import React, { useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const ManageSales = () => {
    const [selectedAction, setSelectedAction] = useState(null);

    const renderContent = () => {
        switch (selectedAction) {
            case 'add':
                return <Typography variant="body1">Here, you can add new sales records.</Typography>;
            case 'view':
                return <Typography variant="body1">Here, you can view all sales records.</Typography>;
            case 'update':
                return <Typography variant="body1">Here, you can update existing sales records.</Typography>;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh', fontFamily: 'Calibri' }}>
            <Typography variant="h4" gutterBottom>
                Manage Sales
            </Typography>

            {/* Container for action cards */}
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                {/* Add Sales Card */}
                <Card 
                    sx={{ 
                        flex: 1, 
                        backgroundColor: '#e0f7fa', 
                        boxShadow: 3, 
                        cursor: 'pointer',
                        textAlign: 'center',
                        '&:hover': { transform: 'scale(1.05)' },
                    }}
                    onClick={() => setSelectedAction('add')}
                >
                    <CardContent>
                        <Typography variant="h6">Add Sales</Typography>
                    </CardContent>
                </Card>

                {/* View Sales Card */}
                <Card 
                    sx={{ 
                        flex: 1, 
                        backgroundColor: '#fce4ec', 
                        boxShadow: 3, 
                        cursor: 'pointer',
                        textAlign: 'center',
                        '&:hover': { transform: 'scale(1.05)' },
                    }}
                    onClick={() => setSelectedAction('view')}
                >
                    <CardContent>
                        <Typography variant="h6">View Sales</Typography>
                    </CardContent>
                </Card>

                {/* Update Sales Card */}
                <Card 
                    sx={{ 
                        flex: 1, 
                        background:'blur', 
                        boxShadow: 3, 
                        cursor: 'pointer',
                        textAlign: 'center',
                        '&:hover': { transform: 'scale(1.05)' },
                    }}
                    onClick={() => setSelectedAction('update')}
                >
                    <CardContent>
                        <Typography variant="h6">Update Sales</Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Display content below cards based on selection */}
            <Box sx={{ mt: 4, p: 3, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 2, backdropFilter: 'blur(8px)' }}>
                {renderContent()}
            </Box>
        </Box>
    );
};

export default ManageSales;

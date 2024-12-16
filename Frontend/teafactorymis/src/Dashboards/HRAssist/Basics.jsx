import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { AddBasic } from './AddBasic';
import { EditBasic } from './EditBasic';

export const Basics = () => {
  const [basic, setBasics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedBasicId, setSelectedBasicId] = useState(null);
  
  const navigate = useNavigate();

  const loadBasics = async () => {
    const result = await axios.get("http://localhost:8080/basicGetAll");
    setBasics(result.data);
  };

  useEffect(() => {
    loadBasics();
  }, []);

  const handleAddNewBasic = () => {
    setOpenAddForm(true);
  };

  const handleEditClick = (basicId) => {
    setSelectedBasicId(basicId); // Set the selected ID for editing
    setOpenEditForm(true); // Open the edit modal
  };

  const handleCloseAddForm = () => {
    setOpenAddForm(false);
  };

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
    setSelectedBasicId(null); // Reset selected ID after closing
  };

  const deleteBasic = async (basicId) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await axios.delete(`http://localhost:8080/basicDelete/${basicId}`);
        loadBasics();
      } catch (error) {
        window.alert("The basic detail cannot be deleted...!");
      }
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBasics = basic.filter(basics =>
    (basics.basicId && basics.basicId.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (basics.role && basics.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>Salary Basics</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchInputChange}
          sx={{ flex: 1, mr: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton><SearchIcon /></IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button 
          variant="contained" 
          onClick={handleAddNewBasic}
          sx={{ width: '200px', backgroundColor: "#00AB66" }}
        >
          Add New Basic Detail
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650}} aria-label="salary basic table" size="small">
          <TableHead sx={{ backgroundColor: "#77DD77",alignContent:'center' }}>
            <TableRow>
              <TableCell>Basic ID</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Day Payment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBasics.map((basics) => (
              <TableRow key={basics.basicId}>
                <TableCell>{basics.basicId}</TableCell>
                <TableCell>{basics.role}</TableCell>
                <TableCell>{basics.dayPayment}</TableCell>
                <TableCell>
                  <Button variant="contained" style={{ backgroundColor: '#00AB66', marginRight: "10px" }} onClick={() => handleEditClick(`${basics.basicId}`)}>
                    <EditIcon />
                  </Button>
                  <Button variant="contained" style={{ backgroundColor: '#00AB66' }} onClick={() => deleteBasic(basics.basicId)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddBasic openForm={openAddForm} handleCloseForm={handleCloseAddForm} onFormSubmit={loadBasics} />
      <EditBasic  openForm={openEditForm}   handleCloseForm={handleCloseEditForm}   basicId={selectedBasicId} onFormSubmit={loadBasics} />
    </Box>
  )
};

import { useState, useEffect } from 'react';
import { SelectChangeEvent, FormControl, InputLabel, MenuItem, Select, Box, TextField, Grid, Card, CardContent, CardHeader, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CachedIcon from '@mui/icons-material/Cached';
import EditIcon from '@mui/icons-material/Edit';


const SERVER_URL = 'https://backend.yz0rq8mqrnu.eu-gb.codeengine.appdomain.cloud';

interface Placement {
  id: number;
  placementType: string;
  animalType: string;
  provider: string;
  address: string;
  county: string;
  postcode: string;
  country: string;
  contactName: string;
  positionAtPractice: string;
  email: string;
  phoneNumber: string;
  website: string;
  accommodation: boolean;
  spaExpiryDate: string;
  notes: string;
}


function PlacementManagementPage() {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [deletingPlacementId, setDeletingPlacementId] = useState<number | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deletionResultMessage, setDeletionResultMessage] = useState<string | null>(null);
  const [editPlacement, setEditPlacement] = useState<Placement | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [nextPage, setNextPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Placement[]>([]);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);


  useEffect(() => {
    axios.get<Placement[]>(`${SERVER_URL}/api/placements`, { params: { limit: 100 } })
      .then((response) => {
        const sortedPlacements = response.data.sort((a, b) => a.id - b.id);
        setPlacements(sortedPlacements);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  //DELETION
  const handleDeleteClick = (id: number) => {
    setDeletingPlacementId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = (confirmed: boolean) => {
    setDeleteConfirmationOpen(false);
    if (confirmed) {
      axios.delete(`${SERVER_URL}/api/placements/delete/${deletingPlacementId}`)
        .then((response) => {
          setDeletionResultMessage(response.data.message);
          setPlacements((prevPlacements) => prevPlacements.filter((placement) => placement.id !== deletingPlacementId));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //FOR EDIT
  const handleEditClick = (placement: Placement) => {
    setEditPlacement(placement);
    setOpenEditDialog(true);
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
    setEditPlacement(null);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSaveClick = () => {
    if (editPlacement) {
      axios
        .put<Placement>(`${SERVER_URL}/api/placements/edit/${editPlacement.id}`, editPlacement)
        .then((response) => {
          setPlacements((prevPlacements) =>
            prevPlacements.map((placement) =>
              placement.id === response.data.id ? response.data : placement
            )
          );
          setOpenEditDialog(false);
          setSnackbarMessage('Placement updated successfully.');
          setOpenSnackbar(true);
        })
        .catch((error) => {
          console.error(error);
          setSnackbarMessage('Failed to update placement.');
          setOpenSnackbar(true);
        });
    }
  };
  

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editPlacement) {
      const { name, value } = event.target;
      setEditPlacement((prevPlacement) =>
        prevPlacement ? { ...prevPlacement, [name]: value } : null
      );
    }
  };

  const handleAccommodationChange = (event: SelectChangeEvent) => {
    const value = event.target.value === 'true';
    setEditPlacement((prevPlacement) =>
      prevPlacement ? {...prevPlacement, accommodation: value } : null
    );
  };
  
  

  //NEXT PAGE
  const handleNextPage = () => {
    axios
      .get<Placement[]>(`${SERVER_URL}/api/placements`, {
        params: { limit: 100, offset: nextPage * 100 },
      })
      .then((response) => {
        setPlacements((prevPlacements) => [...prevPlacements, ...response.data]);
        setNextPage((prevPage) => prevPage + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  //SEARCH
  const handleSearch = () => {
    axios
      .get<Placement[]>(`${SERVER_URL}/api/placements/search`, {
        params: { q: searchInput },
      })
      .then((response) => {
        setSearchResults(response.data);
        setShowSnackbar(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleReset = () => {
    setSearchInput('');
    setSearchResults([]);
    setShowSnackbar(false);
  };

    // For background color
    const GlobalStyle = createGlobalStyle`
    body {
      background: linear-gradient(to right, #a9cccf, #dfe9eb);
    }
  `;

  return (
    <div>
      <GlobalStyle />
      <Box sx={{mx:'3rem', my:'3rem'}}>
      <TextField
        sx={{minWidth:1, textAlign: 'center', boxShadow:1, backgroundColor: 'white', borderRadius: 1.5}}
        label="Search"
        variant="outlined"
        margin="normal"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        InputProps={{ endAdornment: (
          <>
            <Button variant="contained" sx={{mx:'1rem', minWidth:'6rem'}} endIcon={<SearchIcon />} onClick={handleSearch}>Search</Button>
            <Button variant="contained" sx={{mx:'1rem', minWidth:'6rem'}} endIcon={<RestartAltIcon />} onClick={handleReset}>Reset</Button>
          </>
        ) }}
      />
      <Grid container spacing={2}>
      {(searchResults.length > 0 ? searchResults : placements).map((placement, index) => (
        <Grid item xs={12} sm={6} md={4} key={`${placement.id}-${index}`}>
          <Card sx={{boxShadow:5, borderRadius: 2}}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                SPA Expiry: {placement.spaExpiryDate}   (ID: {placement.id})
              </Typography>
              <Typography sx={{ mb: 1 }} color="text.primary" variant='h6' >
                {placement.provider} ({placement.placementType})
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {placement.animalType}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {placement.address}, {placement.county}<br />
                {placement.postcode}, {placement.country} 
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {placement.contactName}: {placement.phoneNumber}                 
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {placement.email}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Accommodation: {placement.accommodation ? 'Provided' : 'Not Provided'} <br />
                {placement.notes}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Position: {placement.positionAtPractice}
              </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <a href={placement.website} target="_blank" rel="noopener noreferrer" style={{ color: '#0000EE' }}>
                  {placement.website}
                </a>
                </Typography>
                <Box display="flex" justifyContent="space-between">
                  <Button variant="contained" color="info" startIcon={<EditIcon />} onClick={() => handleEditClick(placement)}>
                    Edit
                  </Button>
                  <Box sx={{ width: '20px' }}></Box>
                  <Button variant="contained" color="error" startIcon={<DeleteOutlineIcon />} onClick={() => handleDeleteClick(placement.id)}>
                    Delete
                  </Button>
                </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
      </Grid>
      {editPlacement && (
        <Dialog open={openEditDialog} onClose={handleDialogClose}>
          <DialogTitle>Edit Placement</DialogTitle>
          <DialogContent>
                <TextField variant="filled" margin="dense" name="provider" label="Provider" fullWidth
                  value={editPlacement.provider}
                  onChange={handleFieldChange}
                />
                <TextField variant="filled" margin="dense" name="placementType" label="Placement Type" fullWidth
                  value={editPlacement.placementType}
                  onChange={handleFieldChange}
                />
                <TextField variant="filled" margin="dense" name="animalType" label="Animal Type" fullWidth
                  value={editPlacement.animalType}
                  onChange={handleFieldChange}
                />
                <TextField variant="filled" margin="dense" name="address" label="Address" fullWidth
                  value={editPlacement.address}
                  onChange={handleFieldChange}
                />
                <TextField variant="filled" margin="dense" name="county" label="County" fullWidth
                  value={editPlacement.county}
                  onChange={handleFieldChange}
                />
                <TextField variant="filled" margin="dense" name="postcode" label="Postcode" fullWidth
                  value={editPlacement.postcode}
                  onChange={handleFieldChange}
                />
                <TextField variant="filled" margin="dense" name="country" label="Country" fullWidth
                  value={editPlacement.country}
                  onChange={handleFieldChange}
                />
                <TextField variant="filled" margin="dense" name="contactName" label="Contact Name" fullWidth
                  value={editPlacement.contactName}
                  onChange={handleFieldChange}
                />
                <TextField variant="filled" margin="dense" name="positionAtPractice" label="Position at Practice" fullWidth
                  value={editPlacement.positionAtPractice}
                  onChange={handleFieldChange}
                />
                <TextField variant="filled" margin="dense" name="email" label="Email" fullWidth
                  value={editPlacement.email}
                  onChange={handleFieldChange}
                />
                <TextField variant="filled" margin="dense" name="phoneNumber" label="Phone Number" fullWidth
                  value={editPlacement.phoneNumber}
                  onChange={handleFieldChange}
                />
                <TextField variant="filled" margin="dense" name="website" label="Website" fullWidth
                  value={editPlacement.website}
                  onChange={handleFieldChange}
                />
                <TextField variant="filled" margin="dense" name="spaExpiryDate" label="SPA Expiry Date (DD/MM/YYYY)" fullWidth
                  value={editPlacement.spaExpiryDate}
                  onChange={handleFieldChange}
                />
                <TextField variant="filled" margin="dense" name="notes" label="Notes" fullWidth
                  value={editPlacement.notes}
                  onChange={handleFieldChange}
                />
                <br/>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="provideAccommodation-label">Accommodation</InputLabel>
                  <Select labelId="provideAccommodation-label" name="accommodation" variant="filled"
                    value={editPlacement.accommodation ? 'true' : 'false'}
                    onChange={handleAccommodationChange}
                  >
                    <MenuItem value={'true'}>Provided</MenuItem>
                    <MenuItem value={'false'}>Not Provided</MenuItem>
                  </Select>
                </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleSaveClick}>Save</Button>
          </DialogActions>
        </Dialog>
    )}
    <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
      <Alert onClose={handleSnackbarClose} severity="success">
        {snackbarMessage}
      </Alert>
    </Snackbar>
      <Grid container justifyContent="center" mt={2}>
        <Button variant="contained" sx={{minWidth:1, minHeight:'3rem'}} startIcon={<CachedIcon />} onClick={handleNextPage}>
          Load More
        </Button>
      </Grid>
      <Dialog open={deleteConfirmationOpen} onClose={() => handleDeleteConfirmationClose(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this placement?</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => handleDeleteConfirmationClose(true)}>Delete</Button>
          <Button color="info" onClick={() => handleDeleteConfirmationClose(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={Boolean(deletionResultMessage)} autoHideDuration={5000} onClose={() => setDeletionResultMessage(null)}>
        <Alert severity="success">{deletionResultMessage}</Alert>
      </Snackbar>
      <Snackbar open={showSnackbar} autoHideDuration={5000} onClose={() => setShowSnackbar(false)}>
        <Alert onClose={() => setShowSnackbar(false)} severity="success">
          {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found!
        </Alert>
      </Snackbar>
      </Box>
    </div>
  );
}

export default PlacementManagementPage;


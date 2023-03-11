import React, { useState, useEffect } from "react";
import axios from "axios";
import { createGlobalStyle } from 'styled-components';
import TopNav from "../../common/wrappers/TopNav";
import { Link as RRLink } from "react-router-dom";
import { Container, Button, Grid, Typography, Checkbox, Card, CardContent, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormControlLabel, Snackbar, Box, Modal, TextField, colors, Link } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

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

const PlacementSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [accommodation, setAccommodation] = useState<boolean>();
  const [animalTypes, setAnimalTypes] = useState<string[]>([]);
  const [county, setCounty] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);

  const [selectedAnimalTypes, setSelectedAnimalTypes] = useState<string[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string[]>([]);
  const [isSpaChecked, setIsSpaChecked] = useState<boolean>(false);
  const [isEmsChecked, setIsEmsChecked] = useState<boolean>(false);
  
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [showFilteredResults, setShowFilteredResults] = useState<boolean>(true);
  const [resultCount, setResultCount] = useState<number>(0);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlacement, setSelectedPlacement] = useState<Placement | null>(null);


  useEffect(() => {
    const fetchAnimalTypes = async () => {
      const { data } = await axios.get(`${SERVER_URL}/api/animalTypes`);
      setAnimalTypes(data);
    };

    const fetchCounty = async () => {
      const { data } = await axios.get(`${SERVER_URL}/api/county`);
      setCounty(data);
    };

    const fetchCountry = async () => {
      const { data } = await axios.get(`${SERVER_URL}/api/country`);
      setCountry(data);
    };
    
    const fetchPlacements = async () => {
      const { data } = await axios.get(`${SERVER_URL}/api/placements`);
      setPlacements(data);
    };
  
    fetchAnimalTypes();
    fetchCounty();
    fetchCountry();
    fetchPlacements();
    
  }, []);

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearchButtonClick = async () => {
    setLoading(true); // set loading state to true
  
    if (!searchQuery) {
      // if search query is empty, fetch all placements
      const { data } = await axios.get(`${SERVER_URL}/api/placements`);
      setPlacements(data);
    } else {
      // search placements
      const { data } = await axios.get(`${SERVER_URL}/api/placements/search?q=${searchQuery}`);
      setPlacements(data);
    }
  
    setShowFilteredResults(false); // set showFilteredResults to false
    setResultCount(placements.length);
    setShowSnackbar(true);
    setLoading(false); // set loading state to false
  };
  

  const handleFilterChange = async () => {
    const query: {
      accommodation?: boolean;
      placementType?: string[];
      animalType?: string[];
      county?: string[];
      country?: string[];
    } = {};

    if (accommodation !== undefined) {
      query.accommodation = accommodation;
    }

    if (isSpaChecked && !isEmsChecked) {
      query.placementType = ["SPA"];
    } else if (isEmsChecked && !isSpaChecked) {
      query.placementType = ["EMS"];
    } else if (isSpaChecked && isEmsChecked) {
      query.placementType = ["SPA", "EMS"];
    }
    
    if (selectedAnimalTypes.length > 0) {
      query.animalType = selectedAnimalTypes;
    }
    
    if (selectedCounty.length > 0) {
      query.county = selectedCounty;
    }

    if (selectedCountry.length > 0) {
      query.country = selectedCountry;
    }

    const { data } = await axios.post(
      `${SERVER_URL}/api/placements/filter`,
      query
    );
    setPlacements(data);
    setShowFilteredResults(true);
    setResultCount(data.length);
    setShowSnackbar(true);
  };
  
  
  const handleAnimalTypeChange = (event: SelectChangeEvent<string | string[]>) => {
    const value = event.target.value as string | string[];

    setSelectedAnimalTypes(
      Array.isArray(value)
        ? value
        : [value]
    );
  };

  const handleCountyChange = (event: SelectChangeEvent<string | string[]>) => {
    const value = event.target.value as string | string[];

    setSelectedCounty(
      Array.isArray(value)
        ? value
        : [value]
    );
  };

  const handleCountryChange = (event: SelectChangeEvent<string | string[]>) => {
    const value = event.target.value as string | string[];

    setSelectedCountry(
      Array.isArray(value)
        ? value
        : [value]
    );
  };


  const handleFindButtonClick = async () => {
    setLoading(true); // set loading state to true
    console.log('showFilteredResults:', showFilteredResults);
    if (showFilteredResults) {
      console.log('calling handleFilterChange');
      await handleFilterChange();
    } else {
      console.log('fetching all placements');
      const { data } = await axios.get(`${SERVER_URL}/api/placements`);
      setPlacements(data);
    }
    setLoading(false); // set loading state to false
    console.log('setting showFilteredResults to true');
    setShowFilteredResults(true);
  };
  
  

  const handleResetButtonClick = async () => {
    setLoading(true);
    setShowFilteredResults(false);
    setAccommodation(undefined);
    setSelectedAnimalTypes([]);
    setSelectedCounty([]);
    setSelectedCountry([]);
    setIsEmsChecked(false);
    setIsSpaChecked(false);
    setSearchQuery("");
    const { data } = await axios.get(`${SERVER_URL}/api/placements`);
    setPlacements(data);
    setResultCount(data.length);
    setShowSnackbar(true);
    setLoading(false);
  };

  const handleCardClick = (placement: Placement) => {
    setSelectedPlacement(placement);
    setModalOpen(true);
  }
  

  const filterStyle = {
    backgroundColor: "white",
    padding: "24px",
    marginTop: "1rem",
    height: "30rem",
    overflowY: "auto" as const, // or `overflowY: undefined` if you don't want to specify a value
    position: "fixed" as const,
    left: '2rem',
    minWidth: "15rem",
    maxWidth: "18rem"
  };

  const resultsStyle = {
    padding: "16px",
    height: "100vh",
    marginLeft: "19rem", 
    right: "2rem",
  };
  

  const cardStyle = {
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "16px",
    };

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
  };
  
  // For background color
  const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to right, #fddb92, #d1fdff);
  }
`;


  return (
  <Container maxWidth={false} style={{ marginTop: "5rem" }}>
    <TopNav>
      <Button
        component={RRLink}
        to="/"
      >
        <Typography variant="h5" color="#000000">
          VetDB
        </Typography>
      </Button>
    </TopNav>
    <GlobalStyle />
    <Grid container item xs={12} spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={10}>
        <TextField
          label="Search"
          variant="outlined"
          sx={{backgroundColor:'white', borderRadius: 1.5, boxShadow:3}}
          value={searchQuery}
          onChange={handleSearchQueryChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchButtonClick}
          fullWidth
          sx={{height: "3.5rem", boxShadow:5}}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Grid>
    </Grid>
    <Grid container spacing={3} style={{ margin: 0 }}>
      <Grid item xs={3} md={3} style={filterStyle} sx={{borderRadius:2, boxShadow:5}}>
        <Typography variant="h5" gutterBottom>
          Filters
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSpaChecked}
              onChange={(event) => setIsSpaChecked(event.target.checked)}
              color="primary"
            />
          }
          label="SPA"
          style={{ display: "flex", alignItems: "center" }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isEmsChecked}
              onChange={(event) => setIsEmsChecked(event.target.checked)}
              color="primary"
            />
          }
          label="EMS"
          style={{ display: "flex", alignItems: "center" }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={accommodation === true}
              onChange={(event) => setAccommodation(event.target.checked)}
              color="primary"
            />
          }
          label="Provide accommodation"
          style={{ display: "flex", alignItems: "center" }}
        />

        <FormControl variant="standard" style={{ minWidth: "100%" }} sx={{mt:'1rem'}}>
          <InputLabel id="animal-types-label">Animal Type</InputLabel>
          <Select
            labelId="animal-types-label"
            id="animal-types-select"
            multiple
            value={selectedAnimalTypes}
            onChange={handleAnimalTypeChange}
            renderValue={(selected) => (selected as string[]).join(", ")}
          >
            {animalTypes.map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={selectedAnimalTypes.includes(type)} />
                <Typography>{type}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" style={{ minWidth: "100%"}} sx={{mt:'1rem'}}>
          <InputLabel id="county-label">County</InputLabel>
          <Select
            labelId="county-label"
            id="county-select"
            multiple
            value={selectedCounty}
            onChange={handleCountyChange}
            renderValue={(selected) => (selected as string[]).join(", ")}
          >
            {county.map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={selectedCounty.includes(type)} />
                <Typography>{type}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" style = {{ minWidth: "100%" }} sx={{mt:'1rem'}}>
          <InputLabel id="country-select">Country</InputLabel>
          <Select 
            labelId="country-lable"
            id="country-select"
            multiple
            value={selectedCountry}
            onChange={handleCountryChange}
            renderValue={(selected) => (selected as string[]).join(", ")}
          >
            {country.map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={selectedCountry.includes(type)} />
                <Typography>{type}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box display="flex" justifyContent="space-between" sx={{my: '2rem'}}>
          <Button onClick={handleResetButtonClick} variant="contained" startIcon={<RestartAltIcon />}>Reset</Button>
          <Box sx={{ width: '20px' }}></Box>
          <Button onClick={handleFindButtonClick} variant="contained" startIcon={<FilterAltIcon />}>Find</Button>
        </Box>
      </Grid>

      <Grid item xs={12} md={9} style={resultsStyle}>
        {loading && <p>Loading...</p>}
        {placements.map((placement) => (
          <Card key={placement.id} sx={cardStyle} onClick={() => handleCardClick(placement)}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {placement.provider} ({placement.placementType})
              </Typography>
              <Typography>
                Accommodation: {placement.accommodation ? "Provided" : "Not Provided"}
              </Typography>
              <Typography>
                Animal Type: {placement.animalType}
              </Typography>
              <Typography>
                Address: {placement.address}, {placement.county}, {placement.postcode}, {placement.country} 
              </Typography>
              <Typography sx={{textAlign: 'right'}} color={'#DD571C'}>
                MORE DETAIL
              </Typography>

            </CardContent>
          </Card>
        ))}
        {showFilteredResults && placements.length === 0 && (
          <Typography variant="body1">
            No results found.
          </Typography>
        )}
      </Grid>
    </Grid>
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
    <Box sx={modalStyle}>
    <Typography variant="h6" gutterBottom>
      <strong>{selectedPlacement?.provider}</strong> ({selectedPlacement?.placementType})
    </Typography>
    <Typography>
      <strong>Accommodation:</strong> {selectedPlacement?.accommodation ? "Provided" : "Not Provided"}
    </Typography>
    <Typography>
      <strong>Address:</strong> {selectedPlacement?.address}, {selectedPlacement?.county}, {selectedPlacement?.postcode}, {selectedPlacement?.country}
    </Typography>
    <Typography>
      <strong>Position at practice:</strong> {selectedPlacement?.positionAtPractice}
    </Typography>
    <Typography>
      <strong>Contact Name:</strong> {selectedPlacement?.contactName}
    </Typography>
    <Typography>
      <strong>Email:</strong> <a href={`mailto:${selectedPlacement?.email}`} style={{ color: 'blue' }}>{selectedPlacement?.email}</a>
    </Typography>
    <Typography>
      <strong>Contact Number:</strong> <a href={`tel:${selectedPlacement?.phoneNumber}`} style={{ color: 'blue' }}>{selectedPlacement?.phoneNumber}</a>
    </Typography>
    <Typography>
      <strong>Website:</strong> <a href={selectedPlacement?.website} style={{ color: '#1976d2' }}>{selectedPlacement?.website}</a>
    </Typography>

    </Box>
  </Modal>
    <Snackbar
      open={showSnackbar}
      autoHideDuration={3000}
      onClose={() => setShowSnackbar(false)}
      message={`${placements.length} result(s) found`}
    />
  </Container>
);
};



export default PlacementSearchPage;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}


import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from '@mui/material';

import SyncIcon from '@mui/icons-material/Sync';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { createGlobalStyle } from 'styled-components';
const SERVER_URL = 'https://backend.yz0rq8mqrnu.eu-gb.codeengine.appdomain.cloud';



type Registration = {
  firstName: string;
  lastName: string;
  universityEmail: string;
  studentNumber: string;
  course: string;
  type: string;
};

const RegistrationDashboard = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    // Load registration requests when the page is loaded
    axios.get<Registration[]>(`${SERVER_URL}/api/registration`)
      .then((response) => {
        setRegistrations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleGetRegistrations = () => {
    axios.get<Registration[]>(`${SERVER_URL}/api/registration`)
      .then((response) => {
        setRegistrations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleApprove = (universityEmail: string) => {
    axios.post(`${SERVER_URL}/api/approve`, { universityEmail })
      .then((response) => {
        if (response.data === 'Approved') {
          setRegistrations((prevRegistrations) => prevRegistrations.filter((reg) => reg.universityEmail !== universityEmail));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDisapprove = (universityEmail: string) => {
    axios.post(`${SERVER_URL}/api/disapprove`, { universityEmail })
      .then((response) => {
        if (response.data === 'Disapproved') {
          setRegistrations((prevRegistrations) => prevRegistrations.filter((reg) => reg.universityEmail !== universityEmail));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // For background color
  const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to right, #eacda3, #d6ae7b);
  }
`;

  return (
    <div>
    <GlobalStyle />
    <Box sx={{my: '5rem', mx: '2rem'}}>
      <Button variant="contained" size='large' sx={{minWidth:1, minHeight:'3rem'}}  startIcon={<SyncIcon fontSize="large"/>} onClick={handleGetRegistrations}>Get Registration Requests</Button>
      <Grid container spacing={2} mt={2}>
        {registrations.map((reg) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={reg.universityEmail}>
            <Card sx={{boxShadow:3}} >
              <CardContent>
                <Box sx={{mx:'1rem', mt:'0.5rem'}}>
                    <Typography variant="h5" component="h2">{reg.firstName} {reg.lastName}</Typography>
                    <Typography color="textSecondary">University email: {reg.universityEmail}</Typography>
                    <Typography color="textSecondary">Student number: {reg.studentNumber}</Typography>
                    <Typography color="textSecondary">Course: {reg.course}</Typography>
                    <Typography color="textSecondary">Account type: {reg.type}</Typography>
                </Box>
                <Button variant="contained" endIcon={<DoneIcon />} sx={{mx: '0.5rem', my:'1rem'}}  onClick={() => handleApprove(reg.universityEmail)}>Approve</Button>
                <Button variant="contained" endIcon={<ClearIcon />} sx ={{mx: '0.5rem', my:'1rem'}} onClick={() => handleDisapprove(reg.universityEmail)}>Disapprove</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
  );
};

export default RegistrationDashboard;

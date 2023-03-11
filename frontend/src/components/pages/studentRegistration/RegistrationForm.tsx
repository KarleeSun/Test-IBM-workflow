import { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';

const SERVER_URL = 'https://backend.yz0rq8mqrnu.eu-gb.codeengine.appdomain.cloud';

export type RegistrationData = {
  firstName: string;
  lastName: string;
  studentNumber: string;
  universityEmail: string;
  course: string;
  password: string;
  type: string;
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    studentNumber: '',
    universityEmail: '',
    course: '',
    password: '',
    type: 'Student',
});

const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Handling submit event');
    try {
      const response = await axios.post(`${SERVER_URL}/api/register`, formData);
      console.log('Registration received', response.data);
      alert('Registration information successfully received! We aim to review your registration request within 3 working days. For urgent requests please contact the administrator. Thanks!');
      // Clear the form data after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        studentNumber: '',
        universityEmail: '',
        course: '',
        password: '',
        type: 'Student',
      });
      setError('');
    } catch (error) {
      alert('There was an error processing your registration, please make sure this email address is unregistered')
      console.log('Error submitting registration', error);
      const errorMessage = (error as Error).message; // Cast 'error' to the 'Error' type
      setError(errorMessage);
    }
  };

  // For background color
  const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to right, #2193b0, #6dd5ed);
  }
`;

  return (
    <div>
      <GlobalStyle />
      <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
      }}
      >
        <Card variant="outlined" sx={{ minWidth:1/3, boxShadow:3}} >
          <CardContent sx={{textAlign:'center', py:"2rem"}}>
            <Typography variant="h3"> Registister for VetDB </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{my:'1rem', mx:'2rem'}}>
              <TextField
                label="First Name"
                required
                value={formData.firstName}
                onChange={(event) =>
                  setFormData({ ...formData, firstName: event.target.value })
                }
              />
              </Box>
              <Box sx={{my:'1rem', mx:'2rem'}}>
              <TextField
                label="Last Name"
                required
                value={formData.lastName}
                onChange={(event) =>
                  setFormData({ ...formData, lastName: event.target.value })
                }
              />
              </Box>
              <Box sx={{my:'1rem', mx:'2rem'}}>
              <TextField
                label="Student Number"
                required
                value={formData.studentNumber}
                onChange={(event) =>
                  setFormData({ ...formData, studentNumber: event.target.value })
                }
              />
              </Box>
              <Box sx={{my:'1rem', mx:'2rem'}}>
              <TextField
                label="University Email"
                type='email'
                required
                value={formData.universityEmail}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    universityEmail: event.target.value,
                  })
                }
              />
              </Box>
              <Box sx={{my:'1rem', mx:'2rem'}}>
              <TextField
                label="Course"
                required
                value={formData.course}
                onChange={(event) =>
                  setFormData({ ...formData, course: event.target.value })
                }
              />
              </Box>
              <Box sx={{my:'1rem', mx:'2rem'}}>
              <TextField
                label="Password"
                required
                value={formData.password}
                onChange={(event) =>
                  setFormData({ ...formData, password: event.target.value })
                }
              />
              </Box>
              <Box sx={{my:'1rem', mx:'2rem'}}>
              <Button variant="contained" type="submit">
                Register
              </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default RegistrationForm;

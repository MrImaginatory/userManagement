import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To handle errors
  const [success, setSuccess] = useState(null); // To handle success messages
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password.length<8){
      setError("Weak Password!")
    }
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    try {
      const response = await axios.post('http://localhost:5001/auth/signup', {
        name,
        email,
        password,
      });
      console.log('Response:', response.data);
      if(response.error){
        setError(response.error);
      }
      setSuccess('Signup successful!');
      setTimeout(()=>{
        navigate("/login");
      },1000)

    } catch (err) {
      console.error('Error during signup:', err);
      setError('Signup failed. Please try again.'); // Set error message
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor:'white',
          padding:'10%',
          borderRadius:'5px'
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Sign Up
        </Typography>
        {error && <Typography color="error">{error}</Typography>} 
        {success && <Typography color="success">{success}</Typography>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: 'deepskyblue',
              '&:hover': {
                backgroundColor: 'deepskyblue',
              },
            }}
            fullWidth
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'none', color: 'blue' }}>
            Log in here.
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupForm;
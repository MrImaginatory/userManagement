// src/pages/LoginForm.js
import React, { useState,useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Import the AuthContext

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth(); // Get the login function and isAuthenticated from AuthContext

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks", { replace: true }); // Redirect to tasks if already authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/auth/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      
     
      login();
      navigate("/tasks", { replace: true });
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials and try again.'); 
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '10%',
          borderRadius: '5px',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
            Login
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ textDecoration: 'none', color: 'blue' }}>
            Sign up here.
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
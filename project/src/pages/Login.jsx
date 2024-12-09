import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice'; // Assuming you're using Redux for managing user state
import { LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  Snackbar,
} from '@mui/material';

export default function GenericLogin({ role }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(loginData.email))
      newErrors.email = 'Enter a valid email address';

    if (!loginData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      setApiError(null); 

      try {
        const response = await axios.post('http://localhost:8080/api/mentor/login', loginData);

        console.log(response.data);
        const { user, token } = response.data;
        dispatch(setUser(user)); 
        localStorage.setItem('authToken', token); 

       
        setIsSuccess(true);
        navigate('/student-profile');
      } catch (error) {
        console.error('Login error:', error);
        setApiError(error.response?.data?.message || 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3, marginTop: 12 }}>
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-indigo-600 hover:text-indigo-700 transition mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
          <LogIn className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mt-6">Login</h2>
        <p className="mt-2 text-sm text-gray-600">Sign in to continue to your account</p>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          placeholder="Enter your password"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ mt: 2 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 4,
            bgcolor: '#4338CA',
            color: 'white',
            '&:hover': { bgcolor: '#3f51b5' },
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Login'}
        </Button>

        {apiError && (
          <Typography color="error" sx={{ mt: 2 }} align="center">
            {apiError}
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />
        <Typography align="center" sx={{ mt: 2 }}>
          Don’t have an account?
          <Button onClick={() => navigate(`/register`)} sx={{ ml: 1 }}>
            Sign Up
          </Button>
        </Typography>
      </form>

      <Snackbar
        open={isSuccess}
        message="Login successful"
        autoHideDuration={3000}
        onClose={() => setIsSuccess(false)}
      />
    </Box>
  );
}

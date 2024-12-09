import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';
import { User } from 'lucide-react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  OutlinedInput,
} from '@mui/material';

export default function MentorRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    linkedin: '',
    expertise: [],
    description: '',
    cv: null,
    profileImage: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const expertiseOptions = ['Business', 'Development', 'Cyber Security', 'Arts'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleExpertiseChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      expertise: typeof value === 'string' ? value.split(',') : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      expertise: '',
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      cv: file,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      cv: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.linkedin) newErrors.linkedin = 'LinkedIn URL is required';
    if (!formData.expertise.length) newErrors.expertise = 'Expertise is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.cv) newErrors.cv = 'Please upload your CV';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      setIsLoading(true);
      const formDataToSubmit = new FormData();
  
      // Append all form data
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('password', formData.password);
      formDataToSubmit.append('address', formData.address);
      formDataToSubmit.append('city', formData.city);
      formDataToSubmit.append('linkedin', formData.linkedin);
      formDataToSubmit.append('description', formData.description);
  
      // Append expertise as a JSON string
      formData.expertise.forEach((item) => {
        formDataToSubmit.append('expertise', item);
      });
  
      // Append files
      if (formData.cv) {
        formDataToSubmit.append('cv', formData.cv);
      }
      if (formData.profileImage) {
        formDataToSubmit.append('profileImage', formData.profileImage);
      }
  console.log(formDataToSubmit);
      try {
        const response = await axios.post('http://localhost:8080/api/mentor/create', formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        setIsLoading(false);
        setIsSuccess(true);
  
        // Dispatch user data to the store if needed
        dispatch(setUser(response.data.mentor));
  
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        console.error('Form submission error:', error.response?.data || error.message);
        setErrors({ apiError: error.response?.data?.message || 'An unexpected error occurred' });
        setIsLoading(false);
      }
    }
  };
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
          <User className="h-6 w-6 text-indigo-600" />
        </div>
        <div className="mt-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mt-6">Become a Mentor</h2>
          <p className="mt-2 text-sm text-gray-600">
            Share your expertise and help others grow by mentoring new talent.
          </p>
        </div>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="City"
          name="city"
          placeholder="Enter your city"
          value={formData.city}
          onChange={handleChange}
          error={!!errors.city}
          helperText={errors.city}
          sx={{ mt: 2 }}
        />

        <Typography sx={{ mt: 3 }} fontWeight="bold">
          Professional Details
        </Typography>

        <TextField
          fullWidth
          label="LinkedIn Profile"
          placeholder="LinkedIn URL"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          error={!!errors.linkedin}
          helperText={errors.linkedin}
          sx={{ mt: 2 }}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="expertise-label">Area of Expertise</InputLabel>
          <Select
            labelId="expertise-label"
            multiple
            name="expertise"
            value={formData.expertise}
            onChange={handleExpertiseChange}
            input={<OutlinedInput label="Area of Expertise" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {expertiseOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {errors.expertise && (
            <Typography color="error" sx={{ mt: 1 }}>
              {errors.expertise}
            </Typography>
          )}
        </FormControl>
        <TextField
          fullWidth
          label="Short Description"
          placeholder="Tell us about yourself"
          multiline
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          sx={{ mt: 2 }}
        />

        <Button
          component="label"
          variant="contained"
          sx={{ mt: 2, bgcolor: '#4338CA', color: 'white', '&:hover': { bgcolor: '#3f51b5' } }}
        >
          Upload CV
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>

        {errors.cv && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors.cv}
          </Typography>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, bgcolor: '#4338CA', color: 'white', '&:hover': { bgcolor: '#3f51b5' } }}
        >
          {isLoading ? 'Submitting...' : 'Register'}
        </Button>
      </form>

      <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        message="Registration successful! Redirecting..."
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
}

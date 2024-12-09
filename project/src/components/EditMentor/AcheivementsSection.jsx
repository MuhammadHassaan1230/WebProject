import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Box,
} from '@mui/material';

export default function AchievementsSection() {
  const [newAchievement, setNewAchievement] = useState({
    name: '',
    description: '',
    date: '',
    imageFile: null,
    imagePreview: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAchievement(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrorMessage('Only JPEG, PNG, and GIF images are allowed');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('Image must be less than 5MB');
        return;
      }

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAchievement(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAchievement = async () => {
    // Validate required fields
    if (!newAchievement.name || !newAchievement.description) {
      setErrorMessage('Name and description are required');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Create FormData
    const formData = new FormData();
    formData.append('title', newAchievement.name);
    formData.append('description', newAchievement.description);

    // Append the actual image file
    if (newAchievement.imageFile) {
      formData.append('imageUrl', newAchievement.imageFile);
    }

    if (newAchievement.date) {
      formData.append('date', newAchievement.date);
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:8080/api/mentor/achievements', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Reset form
      setNewAchievement({
        name: '',
        description: '',
        date: '',
        imageFile: null,
        imagePreview: null
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      alert('Achievement added successfully!');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setErrorMessage(
        error.response?.data?.message || 
        'An error occurred while adding the achievement'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h6" sx={{ mb: 4, textAlign: 'center' }}>
        Add New Achievement
      </Typography>

      {errorMessage && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <TextField
        label="Achievement Name"
        name="name"
        fullWidth
        variant="outlined"
        value={newAchievement.name}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
        required
      />

      <TextField
        label="Description"
        name="description"
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        value={newAchievement.description}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
        required
      />

      <TextField
        label="Date"
        name="date"
        type="date"
        fullWidth
        variant="outlined"
        value={newAchievement.date}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
        InputLabelProps={{ shrink: true }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Button
          variant="contained"
          component="label"
          sx={{ mr: 2 }}
        >
          Upload Image
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            hidden 
            onChange={handleImageUpload} 
          />
        </Button>

        {newAchievement.imageFile && (
          <Typography variant="body2">
            {newAchievement.imageFile.name}
          </Typography>
        )}
      </Box>

      {newAchievement.imagePreview && (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <img 
            src={newAchievement.imagePreview} 
            alt="Achievement Preview" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: 200, 
              objectFit: 'contain' 
            }} 
          />
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddAchievement}
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? <CircularProgress size={24} /> : 'Add Achievement'}
      </Button>
    </Paper>
  );
}
import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Avatar, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../store/slices/authSlice';

export default function PersonalInformationSection() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [personalInfo, setPersonalInfo] = useState({
    name: user.name,
    email: user.email,
    city: user.city,
    linkedin: user.linkedin,
    description: user.description,
    profileImage: user.profileImage,
  });
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const allowedImageTypes = /jpeg|jpg|png/;
      if (!allowedImageTypes.test(file.type)) {
        alert('Invalid file type. Only JPEG, JPG, and PNG are allowed.');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {  // 10MB limit
        alert('File size exceeds 10MB');
        return;
      }

      // Show preview of image
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImage(URL.createObjectURL(file));  // Create URL for image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    // Create FormData to send to the backend
    const formData = new FormData();
    formData.append('name', personalInfo.name);
    formData.append('email', personalInfo.email);
    formData.append('city', personalInfo.city);
    formData.append('linkedin', personalInfo.linkedin);
    formData.append('description', personalInfo.description);
    formData.append('id', user._id); // Add the user ID to formData

    // Append the actual file instead of base64
    if (newProfileImage) {
      const fileInput = document.getElementById('file-input');
      formData.append('profileImage', fileInput.files[0]); // Append the actual file to FormData
    }

    try {
      const response = await axios.put('http://localhost:8080/api/mentor/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     
      dispatch(setUser(response.data)); 
      console.log(response.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
       
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Avatar
          src={newProfileImage || personalInfo.profileImage}
          alt="Profile Picture"
          sx={{ width: 100, height: 100, marginRight: 2 }}
        />

        <input
          type="file"
          accept="image/*"
          hidden
          id="file-input"
          onChange={handleImageUpload}
        />

        <IconButton
          color="primary"
          component="label"
          htmlFor="file-input"
          sx={{ cursor: 'pointer' }}
        >
          <Typography variant="body2" color="text.secondary">
            Change Profile Picture
          </Typography>
        </IconButton>
      </div>

      {Object.keys(personalInfo).map((field) => {
        if (field !== 'profileImage' && field !== 'id') {
          return (
            <TextField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              variant="outlined"
              fullWidth
              name={field}
              value={personalInfo[field]}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
          );
        }
        return null;
      })}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: '#3f51b5',
          '&:hover': {
            backgroundColor: '#303f9f',
          },
          color: 'white',
        }}
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </Paper>
  );
}

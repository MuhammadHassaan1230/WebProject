import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from '@mui/material';

export default function ScheduleEventsSection() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    link: '',
    imageUrl: null,
    imageFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent((prev) => ({
          ...prev,
          imageUrl: reader.result, // For previewing the image
          imageFile: file, // For sending to the API
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEvent = async () => {
    if (newEvent.title && newEvent.date && newEvent.location) {
      try {
        const formData = new FormData();
        formData.append('title', newEvent.title);
        formData.append('date', newEvent.date);
        formData.append('location', newEvent.location);
        formData.append('description', newEvent.description);
        if (newEvent.link) {
          formData.append('link', newEvent.link);
        }
        if (newEvent.imageFile) {
          formData.append('imageUrl', newEvent.imageFile);
        }

        const response = await axios.post(
          'http://localhost:8080/api/mentor/addevent',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );

        console.log(response.data);
        setEvents((prevEvents) => [...prevEvents, response.data]);
        console.log(events);
        setNewEvent({
          title: '',
          date: '',
          location: '',
          description: '',
          link: '',
          imageUrl: null,
          imageFile: null,
        });
      } catch (error) {
        console.error('Error adding event:', error);
        alert('Failed to add event. Please try again.');
      }
    }
  };

  // Commented out delete functionality
  // const handleDeleteEvent = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8080/api/events/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  //       },
  //     });
  //     setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting event:', error);
  //     alert('Failed to delete event. Please try again.');
  //   }
  // };

  // Commented out useEffect to fetch events
  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080/api/events', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  //         },
  //       });
  //       setEvents(response.data);
  //     } catch (error) {
  //       console.error('Error fetching events:', error);
  //       alert('Failed to load events. Please try again.');
  //     }
  //   };
  //   fetchEvents();
  // }, []);

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Scheduled Events
      </Typography>

      {events.map((event) => (
        <Card key={event.id} sx={{ mb: 2 }}>
          {event.imageUrl && (
            <CardMedia
              component="img"
              height="140"
              image={event.imageUrl}
              alt={`Event ${event.title}`}
            />
          )}
          <CardContent>
            <Typography variant="h6">{event.title}</Typography>
            <Typography>Date: {event.date}</Typography>
            <Typography>Location: {event.location}</Typography>
            <Typography>Description: {event.description}</Typography>
            {event.link && (
              <Typography>
                Link: <a href={event.link}>{event.link}</a>
              </Typography>
            )}
          </CardContent>
          <CardActions>
            {/* <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteEvent(event.id)}
            >
              Delete
            </Button> */}
          </CardActions>
        </Card>
      ))}

      <Typography variant="h6" sx={{ mt: 4 }}>
        Add New Event
      </Typography>

      <TextField
        label="Event Title"
        name="title"
        fullWidth
        variant="outlined"
        placeholder="Enter Event Title"
        value={newEvent.title}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <TextField
        type="datetime-local"
        label="Event Date & Time"
        name="date"
        fullWidth
        variant="outlined"
        value={newEvent.date}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Location"
        name="location"
        placeholder="Enter Event Location"
        fullWidth
        variant="outlined"
        value={newEvent.location}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Event Description"
        name="description"
        multiline
        rows={3}
        placeholder="Enter Event Description"
        fullWidth
        variant="outlined"
        value={newEvent.description}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Event Link"
        name="link"
        placeholder="Enter Workshop Link"
        fullWidth
        variant="outlined"
        value={newEvent.link}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload Event Image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </Button>

      {newEvent.imageUrl && (
        <img
          src={newEvent.imageUrl}
          alt="Event Preview"
          style={{ width: '100%', height: 'auto', marginTop: 16 }}
        />
      )}

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleAddEvent}
      >
        Add Event
      </Button>
    </Paper>
  );
}

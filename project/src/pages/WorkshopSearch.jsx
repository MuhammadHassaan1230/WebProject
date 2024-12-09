import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  Pagination,
  Snackbar,
  Alert,
} from "@mui/material";
import WorkshopSearchBar from "../components/search/WorkshopSearchBar";

const dummyEvents = [
  {
    id: 1,
    title: "AI Innovations Workshop",
    date: "March 15, 2024",
    description: "Discover cutting-edge AI technologies.",
    imageUrl: "https://source.unsplash.com/400x300/?technology",
    link: "https://ai-workshop.com",
  },
  {
    id: 2,
    title: "Career Development Workshop",
    date: "April 10, 2024",
    description: "Connect with industry experts for career growth.",
    imageUrl: null,
    link: "https://career-workshop.com",
  },
  {
    id: 3,
    title: "Data Science Bootcamp",
    date: "June 20, 2024",
    description: "Learn data analysis and visualization hands-on.",
    imageUrl: "https://source.unsplash.com/400x300/?business",
    link: "https://datascience.com",
  },
  {
    id: 4,
    title: "React Masterclass",
    date: "March 25, 2024",
    description: "Advanced React concepts and best practices.",
    imageUrl: "https://source.unsplash.com/400x300/?programming",
    link: "https://react-masterclass.com",
  },
];

const ITEMS_PER_PAGE = 4;

const WorkshopSearch = () => {
  const [searchResults, setSearchResults] = useState(dummyEvents);
  const [currentPage, setCurrentPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState("");

  const handleWorkshopSearch = (filters) => {
    const filteredEvents = dummyEvents.filter((event) => {
      return (
        (filters.title ? event.title.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
        (filters.date ? event.date === filters.date : true) &&
        (filters.location ? event.location?.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
        (filters.description ? event.description?.toLowerCase().includes(filters.description.toLowerCase()) : true) &&
        (filters.link ? event.link?.toLowerCase().includes(filters.link.toLowerCase()) : true)
      );
    });
    setSearchResults(filteredEvents);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastEvent = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstEvent = indexOfLastEvent - ITEMS_PER_PAGE;
  const currentEvents = searchResults.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Search Bar */}
      <WorkshopSearchBar onSearch={handleWorkshopSearch} />

      {/* Search Results */}
      <Typography variant="h5" sx={{ mt: 4 }}>
        Search Results
      </Typography>

      <Grid container spacing={3} mt={2}>
        {currentEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 320,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {event.imageUrl ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={event.imageUrl}
                  alt={event.title}
                />
              ) : (
                <Box
                  sx={{
                    height: "140px",
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" color="textSecondary">
                    No Image
                  </Typography>
                </Box>
              )}

              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>
                <Typography color="textSecondary">{event.date}</Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    mt: 1,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                  }}
                >
                  {event.description}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleCopyLink(event.link)}
                  sx={{
                    backgroundColor: "#3f51b5",
                    "&:hover": { backgroundColor: "#303f9f", color: "white" },
                    color: "white",
                  }}
                >
                  Copy Link
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* Snackbar for copy confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Link copied: {copiedLink}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WorkshopSearch;

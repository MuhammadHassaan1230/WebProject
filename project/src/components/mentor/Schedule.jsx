import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

const dummyEvents = [
  {
    id: 1,
    title: "Tech Webinar on AI Trends",
    date: "March 15, 2024",
    description: "Explore the latest trends in AI and machine learning.",
    imageUrl: "https://source.unsplash.com/400x300/?technology",
    link: "https://example.com/events/tech-webinar-ai",
  },
  {
    id: 2,
    title: "Career Seminar for Developers",
    date: "April 10, 2024",
    description: "Connect with industry professionals and learn from experts.",
    imageUrl: null, // No image for this event
    link: "https://example.com/events/career-seminar",
  },
  {
    id: 3,
    title: "Networking Event for Entrepreneurs",
    date: "May 5, 2024",
    description: "A chance to meet fellow entrepreneurs and grow your network.",
    imageUrl: "https://source.unsplash.com/400x300/?business",
    link: "https://example.com/events/networking-event",
  },
  {
    id: 4,
    title: "Data Science Workshop",
    date: "June 20, 2024",
    description: "Hands-on workshop on data analysis and visualization.",
    imageUrl: null, // No image
    link: "https://example.com/events/data-science-workshop",
  },
];

const Schedule = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState("");

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Scheduled Events
      </Typography>

      <Grid container spacing={3}>
        {dummyEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 320, // Set a fixed height for consistency
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
                <div
                  style={{
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
                </div>
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

      {/* Snackbar for copy confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Link copied: {copiedLink}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Schedule;

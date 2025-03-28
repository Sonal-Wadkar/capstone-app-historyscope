import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { TextField, Button, CircularProgress } from "@mui/material";

const API_URL = "https://api.harvardartmuseums.org/object";
const API_KEY = "7a994556-1c76-45e2-91c1-08aae170a1c3"; // Replace with your actual API key

const Art = () => {
  const [artworks, setArtworks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async (searchTerm = "") => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}?apikey=${API_KEY}&title=${searchTerm}&size=10`
      );
      const data = await response.json();
      
      // Log the full response for debugging
      console.log("Full API Response:", data);
  
      // Log only the image URLs to see if they're valid
      if (data.records) {
        console.log(
          "Image URLs:",
          data.records.map((art) => art.primaryimageurl)
        );
      }
  
      setArtworks(data.records || []);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = () => {
    fetchArtworks(query);
  };

  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Historical Art Collection
      </Typography>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an artwork..."
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Search"}
        </Button>
      </div>
      <Grid container spacing={2}>
        {artworks.length > 0 ? (
          artworks.map((art) => {
            const secureImageUrl = art.primaryimageurl?.replace("http:", "https:") || "https://via.placeholder.com/200";
            return (
              <Grid item xs={12} sm={6} md={4} key={art.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={secureImageUrl}
                    alt={art.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{art.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {art.people?.[0]?.name || "Unknown Artist"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {art.dated || "Unknown Date"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography>No artworks found.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default Art;
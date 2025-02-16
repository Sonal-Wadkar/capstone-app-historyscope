import React, { useState, useEffect, createRef } from "react";
import { Grid, Typography, InputLabel, MenuItem, FormControl, Select, Box, CircularProgress } from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
 
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((prevRefs) =>
            Array(places?.length)
                .fill()
                .map((_, i) => prevRefs[i] || createRef())
        );
    }, [places]);

    return (
        <Box sx={{ padding: "20px", backgroundColor: "#ebebdf", minHeight: "100vh" }}>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress size="5rem" />
                </Box>
            ) : (
                <>
                    <Typography variant="h4" sx={{ marginBottom: 3, color: "#3f2a52", fontWeight: "bold" }}>
                        Attractions, Hotels, & Restaurants around you.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 3, marginBottom: 3, flexWrap: "wrap" }}>
                        {/* Type Dropdown */}
                        <FormControl sx={{ minWidth: 250, flex: 1 }}>
                            <InputLabel sx={{ color: "#3f2a52", fontWeight: "bold" }}>Type</InputLabel>
                            <Select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                sx={{
                                    backgroundColor: "white",
                                    color: "#3f2a52",
                                    fontWeight: "bold",
                                    "&:hover": { backgroundColor: "#3f2a52", color: "white" },
                                    "&.Mui-focused": { backgroundColor: "#5a3d78", color: "white" }
                                }}
                            >
                                <MenuItem value="attractions">Attractions</MenuItem>
                                <MenuItem value="hotels">Hotels</MenuItem>
                                <MenuItem value="restaurants">Restaurants</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ minWidth: 250, flex: 1 }}>
                            <InputLabel sx={{ color: "#3f2a52", fontWeight: "bold" }}>Rating</InputLabel>
                            <Select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                sx={{
                                    backgroundColor: "#ebebdf",
                                    color: "#3f2a52",
                                    fontWeight: "bold",
                                    "&:hover": { backgroundColor: "#3f2a52", color: "white" },
                                    "&.Mui-focused": { backgroundColor: "#5a3d78", color: "white" }
                                }}
                            >
                                <MenuItem value={0}>All</MenuItem>
                                <MenuItem value={3}>Above 3.0</MenuItem>
                                <MenuItem value={4}>Above 4.0</MenuItem>
                                <MenuItem value={4.5}>Above 4.5</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box
                        sx={{
                            maxHeight: "400px",
                            overflowY: "auto",
                            backgroundColor: "#ebebdf",
                            padding: "10px",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
                        }}
                    >
                        <Grid container spacing={2}>
                            {places.map((place, i) => (
                                <Grid item xs={12} key={i}>
                                    <PlaceDetails place={place} selected={Number(childClicked) === i} refProp={elRefs[i]} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default List;

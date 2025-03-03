import React, { useEffect, useState, createRef } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({ places = [], childClicked, isLoading, type, setType, rating, setRating }) => {
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((prevRefs) =>
            Array(places.length)
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
                        {/* Filter Dropdowns */}
                    </Box>

                    <Box sx={{ maxHeight: "400px", overflowY: "auto", backgroundColor: "#ebebdf", padding: "10px", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                        <Grid container spacing={2}>
                            {places.map((place, i) => (
                                <Grid item xs={12} key={i}>
                                    <PlaceDetails
                                        place={place}
                                        selected={Number(childClicked) === i}
                                        refProp={elRefs[i]} 
                                    />
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

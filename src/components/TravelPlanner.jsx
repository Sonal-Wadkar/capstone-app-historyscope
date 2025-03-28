import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import List from "./List/List";
import Map from "./Map/Map";
import PlaceDetails from "./PlaceDetails/PlaceDetails";
import { CssBaseline, Grid, CircularProgress, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from "axios";


const getPlacesData = async (type, sw, ne, setLoading) => {
    try {
        setLoading(true);
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                tr_latitude: ne.lat,
            },
            headers: {
                'X-RapidAPI-Key': '7d4e281259mshf28ccef2a620176p163dffjsne5160f9a6bfd',  // Replace with your RapidAPI key
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        });
        setLoading(false);
        return data;
    } catch (error) {
        setLoading(false);
        console.error("Error fetching places data:", error);
        return [];
    }
};


function TravelPlanner() {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 });
    const [bounds, setBounds] = useState({ sw: null, ne: null });
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState("");
    const [geolocationError, setGeolocationError] = useState(null);
    const [searchError, setSearchError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Styled Component for the Loading State
    const StyledLoading = styled(Grid)(({ theme }) => ({
        height: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }));

    const getErrorMessage = (code) => {
        switch (code) {
            case 1:
                return "Permission denied. Please enable location access.";
            case 2:
                return "Position unavailable. Please check your network or GPS settings.";
            case 3:
                return "Request timed out. Please try again.";
            default:
                return "An unknown error occurred.";
        }
    };

    const onSearch = async (query) => {
        if (!query.trim()) {
            setSearchError("Please enter a search term.");
            return;
        }

        const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`;

        setIsLoading(true);
        setSearchError(null);

        try {
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'YourAppName/1.0 (YourContactEmail)'
                }
            });

            if (response.data && response.data.length > 0) {
                const firstResult = response.data[0];
                const latitude = parseFloat(firstResult.lat);
                const longitude = parseFloat(firstResult.lon);

                if (isNaN(latitude) || isNaN(longitude)) {
                    throw new Error("Invalid coordinates from search result.");
                }

                // Update the coordinate and set the bounds
                setCoordinate({ lat: latitude, lng: longitude });
                setBounds({
                    sw: { lat: latitude - 0.01, lng: longitude - 0.01 },
                    ne: { lat: latitude + 0.01, lng: longitude + 0.01 },
                });

                setSearchQuery(query);

                // Clear any previous places data
                setPlaces([]);
                setFilteredPlaces([]);
            } else {
                setSearchError("No results found for your search term.");
            }

        } catch (error) {
            console.error("Error fetching places data:", error);
            setSearchError("Error fetching places. Please check your network or try again later.");
        } finally {
            setIsLoading(false);
        }
    };
    // Fetch user's initial location and load data
    useEffect(() => {
        const fetchInitialData = async () => {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    setCoordinate({ lat: latitude, lng: longitude });
                    setBounds({
                        sw: { lat: latitude - 0.01, lng: longitude - 0.01 },
                        ne: { lat: latitude + 0.01, lng: longitude + 0.01 },
                    });
                    setGeolocationError(null);
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setGeolocationError(getErrorMessage(error.code));
                    // Use a default location if geolocation fails
                    setCoordinate({ lat: 40.7128, lng: -74.0060 }); // Example: New York City
                    setBounds({
                        sw: { lat: 40.7028, lng: -74.0160 },
                        ne: { lat: 40.7228, lng: -73.9960 },
                    });
                }
            );
        };

        fetchInitialData();
    }, []);


    // useEffect to filter places by rating
    useEffect(() => {
        const filtered = places.filter((place) => Number(place.rating) > rating);
        setFilteredPlaces(filtered);
    }, [rating, places]);


    //  Load data from rapid API
    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true);
            getPlacesData(type, bounds.sw, bounds.ne, setIsLoading)
                .then((data) => {
                    setPlaces(data);
                    setFilteredPlaces([]); // Reset filtered places when new data loads
                    setIsLoading(false);
                });
        }
    }, [type, bounds.sw, bounds.ne]);


    // Handle map pan or zoom to update the coordinate
    const handleMapChange = (newCoordinate) => {
        setCoordinate(newCoordinate);
    };
    return (
        <>
            <CssBaseline />
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Header onSearch={onSearch} />
                    {searchError && <div style={{ color: "red" }}>{searchError}</div>}
                    <FormControl>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="3">Above 3.0</MenuItem>
                            <MenuItem value="4">Above 4.0</MenuItem>
                            <MenuItem value="4.5">Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    {isLoading ? (
                        <StyledLoading item xs={12}>
                            <CircularProgress size="5rem" />
                        </StyledLoading>
                    ) : (
                            <Grid container spacing={3}>
                                {filteredPlaces.length ? filteredPlaces.map((place, i) => (
                                    <Grid item key={i} xs={12}>
                                        <PlaceDetails place={place} selected={Number(childClicked) === i} refProp={null} />
                                    </Grid>
                                )) : places.map((place, i) => (
                                    <Grid item key={i} xs={12}>
                                        <PlaceDetails place={place} selected={Number(childClicked) === i} refProp={null} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinate={setCoordinate}
                        setBounds={setBounds}
                        coordinate={coordinate}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        onMapChange={handleMapChange}
                    />
                </Grid>
            </Grid>

            {geolocationError && <div style={{ color: "red" }}>{geolocationError}</div>}
        </>
    );
}

export default TravelPlanner;
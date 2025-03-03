import React, { useState, useEffect } from "react";
import Header from './Header/Header';
import List from './List/List';
import Map from './Map/Map';
import { CssBaseline, Grid } from '@mui/material';
import axios from "axios";

function TravelPlanner() {
    const [places, setPlaces] = useState([]);
    const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 });
    const [bounds, setBounds] = useState({ sw: null, ne: null });
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState("attractions");
    const [rating, setRating] = useState("");
    const [geolocationError, setGeolocationError] = useState(null); // To store geolocation error messages

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setCoordinate({ lat: latitude, lng: longitude });
                setGeolocationError(null); // Reset error if geolocation is successful
            },
            (error) => {
                console.error("Geolocation error:", error);
                setGeolocationError(getErrorMessage(error.code)); // Set the error message
                setCoordinate({ lat: 0, lng: 0 });
            }
        );
    }, []);

    // Function to return custom error messages based on geolocation error codes
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
        if (!query.trim()) return;

        const url = `https://api.openfreemap.net/search?query=${query}`;

        setIsLoading(true);

        try {
            const response = await axios.get(url);
            setPlaces(response.data);
        } catch (error) {
            console.error("Error fetching places data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (coordinate.lat !== 0 && coordinate.lng !== 0 && bounds.sw && bounds.ne) {
            setIsLoading(true);
            console.log("Fetching places within bounds:", bounds);
        } else {
            console.warn("Bounds not ready yet:", bounds);
        }
    }, [type, coordinate, bounds]);

    return (
        <>
            <CssBaseline />
            {/*<Header onSearch={onSearch} />*/}
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <List
                        places={places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinate={setCoordinate}
                        setBounds={setBounds}
                        coordinate={coordinate}
                        places={places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>

            {/* Show geolocation error message */}
            {geolocationError && <div style={{ color: "red" }}>{geolocationError}</div>}
        </>
    );
}

export default TravelPlanner;

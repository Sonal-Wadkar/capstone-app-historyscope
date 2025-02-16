import React, { useState, useEffect } from "react";
import Header from './Header/Header';
import List from './List/List';
import Map from './Map/Map';
import { CssBaseline, Grid } from '@mui/material';
import { getPlacesData } from "../api";

function TravelPlanner() {

    const [places , setPlaces] = useState([]);
    const [coordinate, setCoordinate] = useState({});

    const [bounds, setBounds] = useState({});
    const [childClicked, setChildClicked] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState("attractions");
    const [rating, setRating] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
            setCoordinate({lat: latitude, lng: longitude});
        })
    }, []);


    


    useEffect (() => {
        //console.log(coordinate, bounds);
        setIsLoading(true);
        getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                //console.log(data);
                setPlaces(data);
                setIsLoading(false);
            })
    }, [type, coordinate, bounds]);

    return(
        <>
            <CssBaseline />
            <Header />
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
                        coordinate = {coordinate}
                        places={places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default TravelPlanner;

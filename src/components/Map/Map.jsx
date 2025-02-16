import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Rating from '@mui/lab/Rating';

const Map = ({ setCoordinate, setBounds, coordinate, places, setChildClicked }) => {
    const isDesktop = useMediaQuery("(min-width:600px)");

    return (
        <div style={{ height: "85vh", width: "100%" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCRv_HVcjzylh_xOdwsdhS8v9FapEuYsCo" }}
                defaultCenter={coordinate}
                center={coordinate} 
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{}}  // Correct empty object for options
                onChange={(e) => {
                    //console.log("Map center updated:", e);
                    setCoordinate({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
                }}
                onChildClick={(child) => setChildClicked(child)}
            >
                {places?. map((place) => (
                    <div 
                        className={ClassNames.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img 
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospital'}
                                        alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    </div>
                ))}

            </GoogleMapReact>
        </div>
    );
};

export default Map;

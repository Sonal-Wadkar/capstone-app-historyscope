import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ setCoordinate, setBounds, coordinate, places, setChildClicked, onMapChange }) => {
    const mapRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);
    const key = "TSUprsCp3uCWthzJjyk7"; // Replace with your MapTiler API key

    useEffect(() => {
        if (!L) {
            console.error("Leaflet failed to load.");
            return;
        }

        // Initialize the map only once
        if (!mapRef.current) {
            mapRef.current = L.map("map", {
                center: [coordinate.lat, coordinate.lng],
                zoom: 13,
                scrollWheelZoom: false,
            });

            L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`, {
                maxZoom: 19,
                attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
            }).addTo(mapRef.current);

            mapRef.current.on('moveend', () => {
                const newCoordinate = {
                    lat: mapRef.current.getCenter().lat,
                    lng: mapRef.current.getCenter().lng
                };
                const newBounds = mapRef.current.getBounds();
                setCoordinate(newCoordinate);
                setBounds({
                    sw: { lat: newBounds.getSouthWest().lat, lng: newBounds.getSouthWest().lng },
                    ne: { lat: newBounds.getNorthEast().lat, lng: newBounds.getNorthEast().lng },
                });
                onMapChange(newCoordinate);
            });
        }

        // Handling resize events
        const handleResize = () => {
            if (mapRef.current) {
                mapRef.current.invalidateSize();
            }
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (mapRef.current) {
                mapRef.current.off();
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [coordinate.lat, coordinate.lng, key, setBounds, setCoordinate, onMapChange]);

    // useEffect to add user location marker
    useEffect(() => {
        if (!mapRef.current) return;
        if (userLocation) {
            mapRef.current.removeLayer(userLocation);
        }
        if (coordinate.lat && coordinate.lng) {
            const marker = L.marker([coordinate.lat, coordinate.lng]).addTo(mapRef.current);
            marker.bindPopup("<b>You are here!</b>").openPopup();
            setUserLocation(marker);
        }
    }, [coordinate, mapRef]);


    useEffect(() => {
        if (!mapRef.current) return;

        // Clear existing markers (except the tile layer)
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.Marker && layer !== userLocation) {
                mapRef.current.removeLayer(layer);
            }
        });

        // Add new markers for places
        places.forEach((place, i) => {
            if (place?.latitude && place?.longitude) {
                const marker = L.marker([parseFloat(place.latitude), parseFloat(place.longitude)])
                    .addTo(mapRef.current);

                marker.bindPopup(`<b>${place.name}</b>`);

                marker.on('click', () => {
                    setChildClicked(i);
                });
            }
        });
    }, [places, setChildClicked, userLocation]);

    return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default Map;
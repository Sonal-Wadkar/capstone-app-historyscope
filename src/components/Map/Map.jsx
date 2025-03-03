import React, { useEffect } from "react";
import L from "leaflet"; // Import Leaflet directly

const Map = () => {
  useEffect(() => {
    // Load MapTiler Geocoding Control script
    const mapTilerScript = document.createElement("script");
    mapTilerScript.src = "https://cdn.maptiler.com/maptiler-geocoding-control/v2.1.4/leaflet.umd.js";
    mapTilerScript.async = true;

    document.body.appendChild(mapTilerScript);

    const key = "TSUprsCp3uCWthzJjyk7";

    mapTilerScript.onload = () => {
      if (!L) {
        console.error("Leaflet failed to load.");
        return;
      }

      const map = L.map("map").setView([51.505, -0.09], 13);

      L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`, {
        maxZoom: 19,
        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      }).addTo(map);

      const geocodingControl = L.control.maptilerGeocoding({ apiKey: key }).addTo(map);

      let marker, circle;

      function success(pos) {
        const { latitude: lat, longitude: lng, accuracy } = pos.coords;

        if (marker) {
          map.removeLayer(marker);
          map.removeLayer(circle);
        }

        marker = L.marker([lat, lng]).addTo(map);
        circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);
        marker.bindPopup("<b>Hey There!</b> You are here.").openPopup();

        map.fitBounds(circle.getBounds());
        map.setView([lat, lng]);

        fetch(`https://api.maptiler.com/geocoding/reverse/${lng},${lat}.json?key=${key}`) // Corrected lat/lng order
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to reverse geocode.");
            }
            return response.json();
          })
          .then((data) => {
            if (data.features && data.features.length > 0) {
              const placeName = data.features[0].place_name;
              console.log("Place name:", placeName);
            } else {
              console.log("No place found for the given coordinates.");
            }
          })
          .catch((error) => {
            console.error("Error in reverse geocoding:", error);
          });
      }

      function error(err) {
        console.error("Geolocation error:", err);
        alert("Geolocation failed. Please enable location services.");
      }

      navigator.geolocation.watchPosition(success, error);

      geocodingControl.on("select", function (event) {
        console.log("Geocode event:", event);
        if (event && event.result && event.result.geometry) {
          const lat = event.result.geometry.coordinates[1];
          const lng = event.result.geometry.coordinates[0];
          const searchQuery = event.result.text || "Unknown location";

          console.log(`User searched for: ${searchQuery}`);
          console.log(`Location: Latitude ${lat}, Longitude ${lng}`);

          const searchMarker = L.marker([lat, lng]).addTo(map);
          searchMarker.bindPopup(`<b>${searchQuery}</b>`).openPopup();
        } else {
          console.error("Geocoding event does not contain expected data.");
        }
      });

      return () => {
        geocodingControl.off("select");
        map.remove();
      };
    };

    return () => {
      document.body.removeChild(mapTilerScript);
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default Map;
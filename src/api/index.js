import axios from 'axios';

// Function to fetch places data based on type and coordinates (e.g., attractions, restaurants)
export const getPlacesData = async (type = "attractions", sw, ne) => {
    try {
        if (!sw || !ne) {
            console.error("Error: Invalid coordinates provided");
            return [];
        }

        const url = `https://api.openfreemap.net/search?sw_lat=${sw.lat}&sw_lng=${sw.lng}&ne_lat=${ne.lat}&ne_lng=${ne.lng}&type=${type}`;
        
        const response = await axios.get(url); // No API key required

        if (response.data) {
            return response.data; // Return the places list
        } else {
            console.error("Unexpected API response:", response.data);
            return [];
        }

    } catch (error) {
        console.error("API request failed:", error.response?.data || error.message);
        return [];
    }
};

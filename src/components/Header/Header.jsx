import React, { useState, useEffect } from "react";
import axios from "axios";

const Header = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
    const key = "TSUprsCp3uCWthzJjyk7"; // Replace with your MapTiler API key

    useEffect(() => {
        if (query.trim() === "") {
            setAutocompleteSuggestions([]);
            return;
        }

        const autocompleteUrl = `https://api.maptiler.com/geocoding/${query}.json?key=${key}&limit=5`;

        axios.get(autocompleteUrl)
            .then((response) => {
                setAutocompleteSuggestions(response.data.features || []);
            })
            .catch((error) => {
                console.error("Error fetching autocomplete suggestions:", error);
                setAutocompleteSuggestions([]);
            });
    }, [query, key]); // React to key changing

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Search Query:", query); // Log the search query
        onSearch(query);
        setAutocompleteSuggestions([]); // Clear suggestions after search
    };

    return (
        <header style={{ padding: "20px" }}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search places..."
                />
                <button type="submit">Search</button>
            </form>
            {autocompleteSuggestions.length > 0 && (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {autocompleteSuggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            style={{ padding: "5px", cursor: "pointer" }}
                            onClick={() => {
                                setQuery(suggestion.place_name); // Select suggestion
                                setAutocompleteSuggestions([]); // Clear suggestions
                            }}
                        >
                            {suggestion.place_name}
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
};

export default Header;
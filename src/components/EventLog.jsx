import { useState } from "react";
import axios from "axios";
import './EventLogStyles.css'; // Import your CSS file here

const EventLog = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const [year, setYear] = useState(""); // Default year, can be changed dynamically


  const fetchHistoricalEvents = async () => {
    setLoading(true);
    setError("");  // Clear previous errors

    const options = {
      method: 'GET',
      url: 'https://world-history-timeline.p.rapidapi.com/History-By-Year',
      params: { year },
      headers: {
        'x-rapidapi-key': '7d4e281259mshf28ccef2a620176p163dffjsne5160f9a6bfd', // Use your RapidAPI key here
        'x-rapidapi-host': 'world-history-timeline.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      
      // Log the response to check the structure of the data
      console.log("API Response:", response.data);

      // Access the 'results' array in the API response
      if (response.data.results && response.data.results.length > 0) {
        setEvents(response.data.results); // Set the events from the 'results' array
      } else {
        setError("No events found for the year " + year);
      }
    } catch (error) {
      setError("Failed to fetch events. Please try again later.");
      console.error("API Error:", error.message);
    }

    setLoading(false);
  };

  return (
    <div className="event-log-container">
      <h2>Historical Events</h2>
      <div>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter year"
        />
        <button onClick={fetchHistoricalEvents} disabled={loading}>
          {loading ? "Loading..." : "Fetch Events"}
        </button>
      </div>
      {error && <p className="error">{error}</p>}

      {/* Display events in card format */}
      <div className="events-container">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={event.id} className="event-card">
              <h3>{event.Event}</h3>
              <p>{event.Description ? event.Description : "No description available."}</p>
              {/* Make the source link clickable */}
              {event.URL && (
                <a href={event.URL} target="_blank" rel="noopener noreferrer">
                  Read more on Wikipedia
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No events found for this year.</p>
        )}
      </div>
    </div>
  );
};

export default EventLog;

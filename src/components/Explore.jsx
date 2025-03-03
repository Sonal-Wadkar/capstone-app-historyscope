import React from "react";
import "./ExploreStyles.css";
import ExploreData from "./ExploreData";
import { Link } from "react-router-dom";
import arrt from "../assets/art.png";
import event from "../assets/events.png";
import travel from "../assets/travel.png";

function Explore() {
    return (
        <div className="explore">
            <h1 className="section-title">Our Services</h1>
            <p className="section-subtitle">Explore the World through our services.</p>
            <div className="card-container">
                <Link to="/art-gallery" className="card link-card">  
                    <ExploreData 
                        image={arrt}
                        head="Art Gallery"
                        text="An adventure into an unknown world of color."
                    />
                </Link>

                <Link to="/event-log" className="card link-card">
                    <ExploreData 
                        image={event}
                        head="Event Logs"
                        text="Witnessing the events that changed mankind."
                    />
                </Link>

                <Link to="/travel-planner" className="card link-card">
                    <ExploreData 
                        image={travel}
                        head="Trip Planner"
                        text="Plan a trip to make memories that last."
                    />
                </Link>
            </div>
        </div>
    );
}

export default Explore;

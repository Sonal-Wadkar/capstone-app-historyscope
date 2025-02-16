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
                <div className="card">
                    <ExploreData 
                        image={arrt}
                        head="Art Gallery"
                        text="An adventure into an unknown world of color."
                    />
                </div>

                <div className="card">
                    <ExploreData 
                        image={event}
                        head="Event Logs"
                        text="Witnessing the events that changed mankind."
                    />
                </div>

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

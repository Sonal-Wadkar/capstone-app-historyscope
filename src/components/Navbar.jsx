import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbarStyles.css";

function Navbar() {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <nav className="NavbarItems">
            <h1 className="Logo">HistoryScope</h1>
            <div className="menu-icons" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "menu active" : "menu"}>
                <li>
                    <NavLink
                        to="/"
                        className="nav-links"
                        style={({ isActive }) => ({
                            color: isActive ? "#3f2a52" : "#ffffff",
                            backgroundColor: isActive ? "white" : "#3f2a52",
                            borderRadius: "4px",
                            padding: "0.5rem 1rem",
                        })}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className="nav-links"
                        style={({ isActive }) => ({
                            color: isActive ? "#3f2a52" : "#ffffff",
                            backgroundColor: isActive ? "white" : "#3f2a52",
                            borderRadius: "4px",
                            padding: "0.5rem 1rem",
                        })}
                    >
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/contact"
                        className="nav-links"
                        style={({ isActive }) => ({
                            color: isActive ? "#3f2a52" : "#ffffff",
                            backgroundColor: isActive ? "white" : "#3f2a52",
                            borderRadius: "4px",
                            padding: "0.5rem 1rem",
                        })}
                    >
                        Contact
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/services"
                        className="nav-links"
                        style={({ isActive }) => ({
                            color: isActive ? "#3f2a52" : "#ffffff",
                            backgroundColor: isActive ? "white" : "#3f2a52",
                            borderRadius: "4px",
                            padding: "0.7rem 1rem",
                        })}
                    >
                        Our Services
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/signup"
                        className="button"
                        style={({ isActive }) => ({
                            color: isActive ? "#3f2a52" : "#ffffff",
                            backgroundColor: isActive ? "white" : "#3f2a52",
                            borderRadius: "4px",
                            padding: "0.7rem 1rem",
                        })}
                    >
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

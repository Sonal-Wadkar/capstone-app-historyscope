import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbarStyles.css";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "../utils";

function Navbar() {
    const [clicked, setClicked] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        setLoggedInUser(user);
    }, []);

    const handleClick = () => {
        setClicked(!clicked);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged Out')
        setTimeout(() => {
            navigate('/login');
        }, 1000);
        setLoggedInUser(null);
        
    };

    return (
        <nav className="NavbarItems">
            <h1 className="Logo">HistoryScope</h1>
            <div className="menu-icons" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "menu active" : "menu"}>
                <li>
                    <NavLink to="/" className="nav-links">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className="nav-links">About</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className="nav-links">Contact</NavLink>
                </li>
                <li>
                    <NavLink to="/services" className="nav-links">Services</NavLink>
                </li>
                
                {loggedInUser ? (
                    <li>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <li>
                        <NavLink to="/signup" className="button">Signup</NavLink>
                    </li>
                )}
            </ul>
            <ToastContainer />
        </nav>
    );
}

export default Navbar;

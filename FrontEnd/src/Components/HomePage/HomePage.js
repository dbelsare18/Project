import React from 'react';
import { Link } from 'react-router-dom';
 // Link the CSS file
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-container">
            <header className="top-header">
                <h2>Flight Reservation System</h2>
            </header>
            <div className="card">
                <h1>Welcome User!!!</h1>
                <button className="button booking-btn" ><Link to={"/booking"}>Book A Flight</Link></button>             
                <button className="button">View Available Flights</button>
                <button className="button deletebooking-btn booking-btn"><Link to={"/deleteBooking"}>Cancel A Booking</Link></button>
            </div>
        </div>
    );
}

export default HomePage;

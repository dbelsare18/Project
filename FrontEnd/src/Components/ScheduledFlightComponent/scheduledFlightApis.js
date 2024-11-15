import React from 'react';
import { useLocation } from 'react-router-dom';

const ViewFlights = () => {
    const location = useLocation();
    const flights = location.state?.flights || []; // Retrieve flights passed from WelcomePage

    return (
        <div style={styles.container}>
            <h1>Available Scheduled Flights</h1>
            {flights.length > 0 ? (
                <ul>
                    {flights.map((flight, index) => (
                        <li key={index} style={styles.flightItem}>
                            <p><strong>Scheduled Flight Id:</strong> {flight.scheduledFlightId}</p>
                            <p><strong>Available Seats:</strong> {flight.availableSeats}</p>
                            <p><strong>Flight Number:</strong> {flight.flightNumber}</p>
                            <p><strong>Carrier Name:</strong> {flight.carrierName}</p>
                            <p><strong>Flight Model:</strong> {flight.flightModel}</p>
                            <p><strong>Seat Capacity:</strong> {flight.seatCapacity}</p>
                           
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No scheduled flights available.</p>
            )}
        </div>
    );
};

// Styles for the component
const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
    },
    flightItem: {
        borderBottom: '1px solid #ccc',
        padding: '10px 0',
    },
};

export default ViewFlights;

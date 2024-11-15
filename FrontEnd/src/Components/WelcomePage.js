import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getScheduledFlights } from './ScheduledFlightComponent'; // Import your API function

const WelcomePage = () => {
    const history = useHistory();
    const [scheduledFlights, setScheduledFlights] = useState([]);

    const handleBookFlight = () => {
        history.push('/booking-details'); // Update this route to your actual booking details page
    };

    const handleViewFlights = async () => {
        try {
            const flights = await getScheduledFlights(); // Fetch the scheduled flights
            setScheduledFlights(flights); // Set the flights to state
            history.push('/view-scheduledflights', { flights }); // Navigate to view flights page with data
        } catch (error) {
            console.error('Failed to fetch flights:', error);
        }
    };

    const handleCancelBooking = () => {
        history.push('/cancel-booking'); // Navigate to the cancel booking page
    };

    return (
        <div style={styles.container}>
            <h1>Welcome to Flight Management System</h1>
            <div style={styles.buttonContainer}>
                <button style={styles.button} onClick={handleBookFlight}>
                    Book a Flight
                </button>
                <button style={styles.button} onClick={handleViewFlights}>
                    View Available Flights
                </button>
                <button style={styles.button} onClick={handleCancelBooking}>
                    Cancel a Booking
                </button>
            </div>
        </div>
    );
};

// Styles for the component
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    buttonContainer: {
        marginTop: '20px',
    },
    button: {
        margin: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007BFF',
        color: 'white',
        transition: 'background-color 0.3s',
    },
};

export default WelcomePage;

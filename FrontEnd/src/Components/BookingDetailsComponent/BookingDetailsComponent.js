import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookingDetailsComponent.css'; // Import your custom CSS file

function BookingDetailsComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking } = location.state || {}; // Get booking data from state

    const handleModifyBooking = () => {
        navigate(`/modifyBooking/${booking.bookingId}`, { state: { bookingId: booking.bookingId } });
    };

    if (!booking) {
        return <p className="text-danger text-center">No booking details available.</p>;
    }
    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Booking Details</h2>
    
            <div className="row mb-4 justify-content-center">
                <div className="col-lg-6">
                    <div className="card shadow-sm mb-3 d-flex flex-column h-100">
                        <div className="card-body">
                            <h5 className="card-title">Booking Information</h5>
                            <div className="text-container">
                                <p className="card-text"><strong>Booking ID:</strong> {booking.bookingId}</p>
                                <p className="card-text"><strong>Booking Date:</strong> {booking.bookingDate}</p>
                                <p className="card-text"><strong>Ticket Cost:</strong> ${booking.ticketCost}</p>
                                <p className="card-text"><strong>Number of Passengers:</strong> {booking.noOfPassengers}</p>
                                <p className="card-text"><strong>Booking State:</strong> {booking.bookingState}</p>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="col-lg-6">
                    <div className="card shadow-sm mb-3 d-flex flex-column h-100">
                        <div className="card-body">
                            <h5 className="card-title">User Details</h5>
                            <div className="text-container">
                                <p className="card-text"><strong>User ID:</strong> {booking.user.userId}</p>
                                <p className="card-text"><strong>Username:</strong> {booking.user.username}</p>
                                <p className="card-text"><strong>Email:</strong> {booking.user.email}</p>
                                <p className="card-text"><strong>Phone:</strong> {booking.user.userPhone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Passenger Details</h5>
                    {booking.passengers.map((passenger, index) => (
                        <div key={index} className="mb-3">
                            <div className="text-container">
                                <p className="card-text"><strong>PNR Number:</strong> {passenger.pnrNumber}</p>
                                <p className="card-text"><strong>Name:</strong> {passenger.passengerName}</p>
                                <p className="card-text"><strong>Age:</strong> {passenger.passengerAge}</p>
                                <p className="card-text"><strong>UIN:</strong> {passenger.passengerUIN}</p>
                                <p className="card-text"><strong>Luggage:</strong> {passenger.luggage} kg</p>
                                <p className="card-text"><strong>Gender:</strong> {passenger.gender}</p>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
    
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Scheduled Flight Details</h5>
                    <div className="text-container">
                        <p className="card-text"><strong>Scheduled Flight ID:</strong> {booking.scheduledFlight.scheduledFlightId}</p>
                        <p className="card-text"><strong>Available Seats:</strong> {booking.scheduledFlight.availableSeats}</p>
    
                        <h6 className="mt-3">Flight Details</h6>
                        <p className="card-text"><strong>Flight Number:</strong> {booking.scheduledFlight.flightDetails.flightNumber}</p>
                        <p className="card-text"><strong>Carrier Name:</strong> {booking.scheduledFlight.flightDetails.carrierName}</p>
                        <p className="card-text"><strong>Flight Model:</strong> {booking.scheduledFlight.flightDetails.flightModel}</p>
                        <p className="card-text"><strong>Seat Capacity:</strong> {booking.scheduledFlight.flightDetails.seatCapacity}</p>
    
                        <h6 className="mt-3">Schedule Details</h6>
                        <p className="card-text"><strong>Departure Date & Time:</strong> {new Date(booking.scheduledFlight.scheduleDetails.deptDateTime).toLocaleString()}</p>
                        <p className="card-text"><strong>Arrival Date & Time:</strong> {new Date(booking.scheduledFlight.scheduleDetails.arrDateTime).toLocaleString()}</p>
    
                        <h6 className="mt-3">Source Airport</h6>
                        <p className="card-text"><strong>Code:</strong> {booking.scheduledFlight.scheduleDetails.srcAirport.airportCode}</p>
                        <p className="card-text"><strong>Location:</strong> {booking.scheduledFlight.scheduleDetails.srcAirport.airportLocation}</p>
                        <p className="card-text"><strong>Name:</strong> {booking.scheduledFlight.scheduleDetails.srcAirport.airportName}</p>
    
                        <h6 className="mt-3">Destination Airport</h6>
                        <p className="card-text"><strong>Code:</strong> {booking.scheduledFlight.scheduleDetails.dstnAirport.airportCode}</p>
                        <p className="card-text"><strong>Location:</strong> {booking.scheduledFlight.scheduleDetails.dstnAirport.airportLocation}</p>
                        <p className="card-text"><strong>Name:</strong> {booking.scheduledFlight.scheduleDetails.dstnAirport.airportName}</p>
                    </div>
                </div>
            </div>
    
            <div className="text-center mb-4">
                <Link to={`/modifyBooking/${booking.bookingId}`} className="btn btn-primary" onClick={handleModifyBooking}>
                    Modify Booking
                </Link>
            </div>
        </div>
    );
    
}

export default BookingDetailsComponent;

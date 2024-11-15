import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ModifyBooking.css';
// import './BookingDetailsComponent.css'; // Import your custom CSS file


const token = localStorage.getItem('token');


const headerToken = {
    headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
    },
}

const ModifyBooking = () => {
    const { bookingId } = useParams(); // Get bookingId from URL
    const navigate = useNavigate();

    // State to hold booking and passenger details
    const [bookingDetails, setBookingDetails] = useState({
        userId: '',
        passengers: [
            {
                pnrNumber: '',
                passengerName: '',
                passengerAge: '',
                passengerUIN: '',
                luggage: '',
                gender: ''
            }
        ],
        bookingDate: '',
        scheduledFlightId: ''
    });


    // Fetch current booking details using the API when the component mounts
    useEffect(() => {
        axios.get(`http://localhost:7060/booking/viewBooking/${bookingId}`, headerToken)
            .then(response => {
                const data = response.data;
                // Map the response data to match the structure of bookingDetails state
                setBookingDetails({
                    userId: data.user.userId,
                    passengers: data.passengers.map(passenger => ({
                        pnrNumber: passenger.pnrNumber,
                        passengerName: passenger.passengerName,
                        passengerAge: passenger.passengerAge,
                        passengerUIN: passenger.passengerUIN,
                        luggage: passenger.luggage,
                        gender: passenger.gender
                    })),
                    bookingDate: data.bookingDate,
                    scheduledFlightId: data.scheduledFlight.scheduledFlightId
                });
            })
            .catch(error => console.error('Error fetching booking details:', error));
    }, [bookingId]);

    // Fetch current booking details to populate the form initially
    // useEffect(() => {
    //     axios.get(`http://localhost:7060/booking/modifyBooking/${bookingId}`)
    //         .then(response => {
    //             const data = response.data;
    //             setBookingDetails({
    //                 userId: data.user.userId,
    //                 passengers: data.passengers.map(passenger => ({
    //                     pnrNumber: passenger.pnrNumber,
    //                     passengerName: passenger.passengerName,
    //                     passengerAge: passenger.passengerAge,
    //                     passengerUIN: passenger.passengerUIN,
    //                     luggage: passenger.luggage,
    //                     gender: passenger.gender
    //                 })),
    //                 bookingDate: data.bookingDate,
    //                 scheduledFlightId: data.scheduledFlight.scheduledFlightId
    //             });
    //         })
    //         .catch(error => console.error('Error fetching booking details:', error));
    // }, [bookingId]);

    // Handle form submission to update booking
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:7060/booking/modifyBooking/${bookingId}`, bookingDetails, headerToken)
            .then(response => {
                alert("Booking updated successfully");
                // navigate(`/bookingDetails/${bookingId}`); // Redirect to booking details page
                // navigate(`/bookingDetails`, { state: { booking: response} });

                console.log(response);
                // const updatedBooking = response.data;
                navigate(`/bookingDetails/${bookingId}`, { state: { booking: response.data } });
                // navigate('/bookingDetails', { state: { booking: response } });



            })
            .catch(error => console.error('Error updating booking:', error));
    };

    // Handle input changes for booking details
    const handleInputChange = (e, index, field) => {
        const updatedBookingDetails = { ...bookingDetails };
        if (field === 'userId' || field === 'bookingDate' || field === 'scheduledFlightId') {
            updatedBookingDetails[field] = e.target.value;
        } else {
            updatedBookingDetails.passengers[index][field] = e.target.value;
        }
        setBookingDetails(updatedBookingDetails);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Modify Booking</h2>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label className="form-label">User ID:</label>
                    <input
                        type="number"
                        className="form-control form-control-sm" // Smaller text field
                        value={bookingDetails.userId}
                        onChange={(e) => handleInputChange(e, 0, 'userId')}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Booking Date:</label>
                    <input
                        type="date"
                        className="form-control form-control-sm" // Smaller text field
                        value={bookingDetails.bookingDate}
                        onChange={(e) => handleInputChange(e, 0, 'bookingDate')}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Scheduled Flight ID:</label>
                    <input
                        type="number"
                        className="form-control form-control-sm" // Smaller text field
                        value={bookingDetails.scheduledFlightId}
                        onChange={(e) => handleInputChange(e, 0, 'scheduledFlightId')}
                        required
                    />
                </div>

                {bookingDetails.passengers.map((passenger, index) => (
                    <div key={index} className="card mb-3">
                        <div className="card-body">
                            <h3 className="card-title">Passenger {index + 1}</h3>
                            <div className="mb-3">
                                <label className="form-label">PNR Number:</label>
                                <input
                                    type="number"
                                    className="form-control form-control-sm" // Smaller text field
                                    value={passenger.pnrNumber}
                                    onChange={(e) => handleInputChange(e, index, 'pnrNumber')}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Passenger Name:</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm" // Smaller text field
                                    value={passenger.passengerName}
                                    onChange={(e) => handleInputChange(e, index, 'passengerName')}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Passenger Age:</label>
                                <input
                                    type="number"
                                    className="form-control form-control-sm" // Smaller text field
                                    value={passenger.passengerAge}
                                    onChange={(e) => handleInputChange(e, index, 'passengerAge')}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Passenger UIN:</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm" // Smaller text field
                                    value={passenger.passengerUIN}
                                    onChange={(e) => handleInputChange(e, index, 'passengerUIN')}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Luggage (kg):</label>
                                <input
                                    type="number"
                                    className="form-control form-control-sm" // Smaller text field
                                    value={passenger.luggage}
                                    onChange={(e) => handleInputChange(e, index, 'luggage')}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Gender:</label>
                                <select
                                    className="form-select form-select-sm" // Smaller select
                                    value={passenger.gender}
                                    onChange={(e) => handleInputChange(e, index, 'gender')}
                                    required
                                >
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}

                <button type="submit" className="btn btn-primary">
                    Update Booking
                </button>
            </form>
        </div>
    );
};

export default ModifyBooking;

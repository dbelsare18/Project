// import React, { useState } from 'react';
// import { addBooking, confirmBooking } from './bookingApis';
// import './BookingComponent.css';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const BookingComponent = () => {
//     debugger;
//     const userId = localStorage.getItem('userId');
//     const navigate = useNavigate();

//     // Initialize bookingData with current date
//     const [bookingData, setBookingData] = useState({
//         userId: userId || '',
//         passengers: [
//             { passengerName: '', passengerAge: '', passengerUIN: '', luggage: '', gender: '' }
//         ],
//         bookingDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
//         scheduledFlightId: ''
//     });
//     const [termsAccepted, setTermsAccepted] = useState(false);

//     const handleInputChange = (field, value) => {
//         setBookingData((prevData) => ({
//             ...prevData,
//             [field]: value
//         }));
//     };

//     const handlePassengerChange = (index, field, value) => {
//         const updatedPassengers = [...bookingData.passengers];
//         updatedPassengers[index][field] = value;
//         setBookingData({ ...bookingData, passengers: updatedPassengers });
//     };

//     const handleAddPassenger = () => {
//         if (bookingData.passengers.length < 4) {
//             setBookingData({
//                 ...bookingData,
//                 passengers: [
//                     ...bookingData.passengers,
//                     { passengerName: '', passengerAge: '', passengerUIN: '', luggage: '', gender: '' }
//                 ]
//             });
//         }
//     };

//     const handleRemovePassenger = (index) => {
//         const updatedPassengers = bookingData.passengers.filter((_, i) => i !== index);
//         setBookingData({ ...bookingData, passengers: updatedPassengers });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!termsAccepted) {
//             alert('Please accept the terms and conditions.');
//             return;
//         }

//         try {
//             const response = await addBooking(bookingData);
//             console.log(response);
//             alert('Booking confirmed!');
//             setBookingData({
//                 userId: userId || '',
//                 passengers: [{ passengerName: '', passengerAge: '', passengerUIN: '', luggage: '', gender: '' }],
//                 bookingDate: new Date().toISOString().split('T')[0], // Reset to current date
//                 scheduledFlightId: ''
//             });
//             setTermsAccepted(false);
//             navigate('/bookingDetails', { state: { booking: response } });
//         } catch (error) {
//             console.error("Booking failed:", error);
//             alert('Booking failed. Please try again.');
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <h2 className="text-center">Booking Details</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group mb-3">
//                     <input
//                         type="number"
//                         className="form-control"
//                         placeholder="User ID"
//                         value={bookingData.userId}
//                         readOnly
//                         required
//                     />
//                 </div>
//                 <div className="form-group mb-3">
//                     <input
//                         type="date"
//                         className="form-control"
//                         value={bookingData.bookingDate}
//                         // onChange={(e) => handleInputChange('bookingDate', e.target.value)}
//                         readOnly
//                         required
//                     />
//                 </div>
//                 <div className="form-group mb-3">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Scheduled Flight ID"
//                         value={bookingData.scheduledFlightId}
//                         onChange={(e) => handleInputChange('scheduledFlightId', e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="passenger-section mb-4">
//                     <h3>Passengers</h3>
//                     {bookingData.passengers.map((passenger, index) => (
//                         <div key={index} className="passenger-row mb-3">
//                             <input
//                                 type="text"
//                                 className="form-control mb-2"
//                                 placeholder="Name"
//                                 value={passenger.passengerName}
//                                 onChange={(e) => handlePassengerChange(index, 'passengerName', e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="number"
//                                 className="form-control mb-2"
//                                 placeholder="Age"
//                                 value={passenger.passengerAge}
//                                 onChange={(e) => handlePassengerChange(index, 'passengerAge', e.target.value)}
//                                 required
//                             />
//                             <select
//                                 className="form-select mb-2"
//                                 value={passenger.gender}
//                                 onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                                 required
//                             >
//                                 <option value="" disabled>Select Gender</option>
//                                 <option value="MALE">Male</option>
//                                 <option value="FEMALE">Female</option>
//                                 <option value="OTHER">Other</option>
//                             </select>
//                             <input
//                                 type="text"
//                                 className="form-control mb-2"
//                                 placeholder="Passenger UIN"
//                                 value={passenger.passengerUIN}
//                                 onChange={(e) => handlePassengerChange(index, 'passengerUIN', e.target.value)}
//                                 required
//                             />
//                             <input
//                                 type="number"
//                                 className="form-control mb-2"
//                                 placeholder="Luggage (kg)"
//                                 value={passenger.luggage}
//                                 onChange={(e) => handlePassengerChange(index, 'luggage', e.target.value)}
//                                 required
//                             />
//                             <button type="button" className="btn btn-danger" onClick={() => handleRemovePassenger(index)}>Remove</button>
//                         </div>
//                     ))}
//                     <button type="button" className="btn btn-secondary" onClick={handleAddPassenger} disabled={bookingData.passengers.length >= 4}>
//                         + Add Passenger
//                     </button>
//                 </div>

//                 <div className="form-check mb-4">
//                     <label className="form-check-label" style={{ display: 'flex', alignItems: 'center' }}>
//                         <input
//                             type="checkbox"
//                             className="form-check-input"
//                             checked={termsAccepted}
//                             onChange={() => setTermsAccepted(!termsAccepted)}
//                             style={{ marginRight: '5px' }} // Optional: add space between checkbox and text
//                         />
//                         I agree to the terms and conditions
//                     </label>
//                 </div>
//                 <button type="submit" className="btn btn-primary">Confirm Booking</button>
//             </form>
//         </div>
//     );
// };

// export default BookingComponent;




import React, { useState } from 'react';
import { addBooking } from './bookingApis';
import './BookingComponent.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingComponent = () => {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    // Initialize bookingData with current date in local time zone
    const getCurrentDate = () => {
        const bookingDate = new Date();
        return `${bookingDate.getFullYear()}-${(bookingDate.getMonth() + 1).toString().padStart(2, '0')}-${bookingDate.getDate().toString().padStart(2, '0')}`;
    };

    const [bookingData, setBookingData] = useState({
        userId: userId || '',
        passengers: [
            { passengerName: '', passengerAge: '', passengerUIN: '', luggage: '', gender: '' }
        ],
        bookingDate: getCurrentDate(), // Current date in YYYY-MM-DD format
        scheduledFlightId: ''
    });
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleInputChange = (field, value) => {
        setBookingData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    const handlePassengerChange = (index, field, value) => {
        const updatedPassengers = [...bookingData.passengers];
        updatedPassengers[index][field] = value;
        setBookingData({ ...bookingData, passengers: updatedPassengers });
    };

    const handleAddPassenger = () => {
        if (bookingData.passengers.length < 4) {
            setBookingData({
                ...bookingData,
                passengers: [
                    ...bookingData.passengers,
                    { passengerName: '', passengerAge: '', passengerUIN: '', luggage: '', gender: '' }
                ]
            });
        }
    };

    const handleRemovePassenger = (index) => {
        const updatedPassengers = bookingData.passengers.filter((_, i) => i !== index);
        setBookingData({ ...bookingData, passengers: updatedPassengers });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!termsAccepted) {
            alert('Please accept the terms and conditions.');
            return;
        }

        try {
            const response = await addBooking(bookingData);
            console.log(response);
            alert('Booking confirmed!');
            setBookingData({
                userId: userId || '',
                passengers: [{ passengerName: '', passengerAge: '', passengerUIN: '', luggage: '', gender: '' }],
                bookingDate: getCurrentDate(), // Reset to current date
                scheduledFlightId: ''
            });
            setTermsAccepted(false);
            navigate('/bookingDetails', { state: { booking: response } });
        } catch (error) {
            console.error("Booking failed:", error);
            alert('Booking failed. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Booking Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="User ID"
                        value={bookingData.userId}
                        readOnly
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        type="date"
                        className="form-control"
                        value={bookingData.bookingDate}
                        readOnly
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Scheduled Flight ID"
                        value={bookingData.scheduledFlightId}
                        onChange={(e) => handleInputChange('scheduledFlightId', e.target.value)}
                        required
                    />
                </div>

                <div className="passenger-section mb-4">
                    <h3>Passengers</h3>
                    {bookingData.passengers.map((passenger, index) => (
                        <div key={index} className="passenger-row mb-3">
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Name"
                                value={passenger.passengerName}
                                onChange={(e) => handlePassengerChange(index, 'passengerName', e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                className="form-control mb-2"
                                placeholder="Age"
                                value={passenger.passengerAge}
                                onChange={(e) => handlePassengerChange(index, 'passengerAge', e.target.value)}
                                required
                            />
                            <select
                                className="form-select mb-2"
                                value={passenger.gender}
                                onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </select>
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Passenger UIN"
                                value={passenger.passengerUIN}
                                onChange={(e) => handlePassengerChange(index, 'passengerUIN', e.target.value)}
                                required
                            />
                            <input
                                type="number"
                                className="form-control mb-2"
                                placeholder="Luggage (kg)"
                                value={passenger.luggage}
                                onChange={(e) => handlePassengerChange(index, 'luggage', e.target.value)}
                                required
                            />
                            <button type="button" className="btn btn-danger" onClick={() => handleRemovePassenger(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={handleAddPassenger} disabled={bookingData.passengers.length >= 4}>
                        + Add Passenger
                    </button>
                </div>

                <div className="form-check mb-4">
                    <label className="form-check-label" style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={termsAccepted}
                            onChange={() => setTermsAccepted(!termsAccepted)}
                            style={{ marginRight: '5px' }} // Optional: add space between checkbox and text
                        />
                        I agree to the terms and conditions
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Confirm Booking</button>
            </form>
        </div>
    );
};

export default BookingComponent;


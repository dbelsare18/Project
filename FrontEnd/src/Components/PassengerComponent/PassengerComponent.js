import React, { useState } from 'react';
import './PassengerComponent.css';
import { addPassenger } from './passengerApis';

const PassengerComponent = () => {
    const [passengers, setPassengers] = useState([{ passengerName: '', passengerAge: '', gender: '', passengerUIN: '' }]);
    const [billingAddress, setBillingAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [agree, setAgree] = useState(false);

    const handleSubmit = async () => {
        console.log('iunside handle submit func')
        let flag = true;
        // Validation for empty fields
        for (const passenger of passengers) {
            const { passengerName, passengerAge, gender, passengerUIN } = passenger;
            if (!passengerName || !passengerAge || !gender || !passengerUIN) {
                flag = false;
            }
        }
        
        // Additional form submission logic goes here...
        if(flag) {
            const resp = addPassenger(passengers[0]);
            console.log('add passanger db response', resp);
        }
        
    };

    const handleAddPassenger = () => {
        if (passengers.length < 4) {
            setPassengers([...passengers, { passengerName: '', passengerAge: '', gender: '', passengerUIN: '' }]);
        }
    };

    const handleInputChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;
        setPassengers(updatedPassengers);
    };

    return (
        <div className="booking-container">
            <h1>Flight Reservation System</h1>
            <div className="booking-details">
                <h2>Booking Details:</h2>
                <table className="passenger-table">
                    <thead>
                        <tr>
                            <th>Passenger Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>ID Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passengers.map((passenger, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="text"
                                        value={passenger.passengerName}
                                        onChange={(e) => handleInputChange(index, 'passengerName', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={passenger.passengerAge}
                                        onChange={(e) => handleInputChange(index, 'passengerAge', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={passenger.gender}
                                        onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={passenger.passengerUIN}
                                        onChange={(e) => handleInputChange(index, 'passengerUIN', e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {passengers.length < 4 && (
                    <button className="add-passenger-button" onClick={handleAddPassenger}>
                        + Add another passenger
                    </button>
                )}

                <div className="billing-section">
                    <div className="billing-field">
                        <label>Address</label>
                        <input type="text" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} />
                    </div>
                    <div className="billing-field">
                        <label>Contact Number</label>
                        <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                    </div>
                </div>

                <div className="terms-section">
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    <span>I agree to the terms and conditions.</span>
                </div>

                <button onClick={handleSubmit}>Confirm Booking</button>
            </div>
        </div>
    );
};

export default PassengerComponent;

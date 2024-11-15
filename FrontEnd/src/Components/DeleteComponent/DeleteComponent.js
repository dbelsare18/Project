// import React, { useState } from 'react';
// import './DeleteComponent.css';
// import { deleteBookingById } from './deleteBookingApis'; // Import your API function

// const DeleteComponent = () => {
//     const [bookingId, setBookingId] = useState('');
//     const [message, setMessage] = useState('');

//     const handleDelete = async () => {
//         try {
//             const response = await deleteBookingById(bookingId);
//             if (response.status === 200) {
//                 setMessage('Booking deleted successfully');
//             }
//         } catch (error) {
//             setMessage('Failed to delete booking. Please check the booking ID.');
//         }
//     };

//     return (
//         <div className="delete-booking-container">
//             <h2>Delete a Booking</h2>
//             <input
//                 type="text"
//                 placeholder="Enter Booking ID"
//                 value={bookingId}
//                 onChange={(e) => setBookingId(e.target.value)}
//             />
//             <button onClick={handleDelete}>Delete</button>
//             {message && <p className="message">{message}</p>}
//         </div>
//     );
// }

// export default DeleteComponent;



// import React, { useState } from 'react';
// import './DeleteComponent.css';
// import { deleteBookingById, getBookingById } from './deleteBookingApis';

// const DeleteComponent = () => {
//     const [bookingId, setBookingId] = useState('');
//     const [bookingData, setBookingData] = useState(null);
//     const [message, setMessage] = useState('');

    
//     const handleSearch = async () => {
//         try {
//             const data = await getBookingById(bookingId);
//             setBookingData(data);
//             setMessage('');
//         } catch (error) {
//             setMessage('Failed to find booking. Please check the booking ID.');
//             setBookingData(null); 
//         }
//     };

    
//     const handleDelete = async () => {
//         try {
//             const response = await deleteBookingById(bookingId);
//             if (response.status === 200) {
//                 setMessage('Booking deleted successfully');
//                 setBookingData(null); 
//             }
//         } catch (error) {
//             setMessage('Failed to delete booking. Please try again.');
//         }
//     };

    
//     const handleModify = async (field, value) => {
//         const updatedBooking = { ...bookingData, [field]: value };
        
//         setBookingData(updatedBooking);
//         setMessage('Booking updated locally. Implement API to persist changes.');
//     };

//     return (
//         <div className="delete-booking-container">
//             <h2>Manage Booking</h2>
//             <input
//                 type="text"
//                 placeholder="Enter Booking ID"
//                 value={bookingId}
//                 onChange={(e) => setBookingId(e.target.value)}
//             />
//             <button onClick={handleSearch}>Search</button>

//             {message && <p className="message">{message}</p>}

//             {bookingData && (
//                 <div className="booking-details">
//                     <h3>Booking Details</h3>
//                     <p><strong>User ID:</strong> {bookingData.userId}</p>
//                     <p><strong>Booking Date:</strong> {new Date(bookingData.bookingDate).toLocaleDateString()}</p>
//                     <p><strong>Scheduled Flight ID:</strong> {bookingData.scheduledFlightId}</p>
//                     <p><strong>Passengers:</strong></p>
//                     <ul>
//                         {bookingData.passengers.map((passenger, index) => (
//                             <li key={index}>
//                                 {passenger.passengerName}, Age: {passenger.passengerAge}, Gender: {passenger.gender}
//                             </li>
//                         ))}
//                     </ul>

//                     <button onClick={handleDelete}>Delete Booking</button>
//                     <button onClick={() => handleModify('bookingDate', new Date().toISOString())}>
//                         Modify Booking
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DeleteComponent;




// import React, { useState } from 'react';
// import { deleteBookingById, getBookingById } from './deleteBookingApis';
// import { Container, Form, Button, Table, Alert } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './DeleteComponent.css';

// const DeleteComponent = () => {
//     const [bookingId, setBookingId] = useState('');
//     const [bookingData, setBookingData] = useState(null);
//     const [message, setMessage] = useState('');

//     // Function to fetch booking data by ID
//     const handleSearch = async () => {
//         try {
//             const data = await getBookingById(bookingId);
//             setBookingData(data);
//             setMessage('');
//         } catch (error) {
//             setMessage('Failed to find booking. Please check the booking ID.');
//             setBookingData(null); // Clear previous data if any
//         }
//     };

//     // Function to delete booking
//     const handleDelete = async () => {
//         try {
//             const response = await deleteBookingById(bookingId);
//             if (response.status === 200) {
//                 setMessage('Booking deleted successfully');
//                 setBookingData(null); // Clear the displayed data
//             }
//         } catch (error) {
//             setMessage('Failed to delete booking. Please try again.');
//         }
//     };

//     // Function to handle modifications (example: updating a field)
//     const handleModify = async (field, value) => {
//         const updatedBooking = { ...bookingData, [field]: value };
//         // Implement API call to modify booking if required
//         setBookingData(updatedBooking);
//         setMessage('Booking updated locally. Implement API to persist changes.');
//     };

//     return (
//         <Container className="my-4">
//             <h2 className="text-center mb-4">Manage Booking</h2>

//             <Form.Group className="mb-3 d-flex" controlId="bookingId">
//                 <Form.Control
//                     type="text"
//                     placeholder="Enter Booking ID"
//                     value={bookingId}
//                     onChange={(e) => setBookingId(e.target.value)}
//                     className="me-2"
//                 />
//                 <Button variant="primary" onClick={handleSearch}>
//                     Search
//                 </Button>
//             </Form.Group>

//             {message && <Alert variant="info">{message}</Alert>}

//             {bookingData && (
//                 <div className="booking-details mt-4">
//                     <h3>Booking Details</h3>
//                     <Table striped bordered hover variant="dark" className="mt-3">
//                         <tbody>
//                             <tr>
//                                 <td><strong>User ID:</strong></td>
//                                 <td>{bookingData.userId}</td>
//                             </tr>
//                             <tr>
//                                 <td><strong>Booking Date:</strong></td>
//                                 <td>{new Date(bookingData.bookingDate).toLocaleDateString()}</td>
//                             </tr>
//                             <tr>
//                                 <td><strong>Scheduled Flight ID:</strong></td>
//                                 <td>{bookingData.scheduledFlightId}</td>
//                             </tr>
//                             <tr>
//                                 <td><strong>Passengers:</strong></td>
//                                 <td>
//                                     <ul className="list-unstyled">
//                                         {bookingData.passengers.map((passenger, index) => (
//                                             <li key={index}>
//                                                 {passenger.passengerName}, Age: {passenger.passengerAge}, Gender: {passenger.gender}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </Table>

//                     <div className="d-flex justify-content-between mt-3">
//                         <Button variant="danger" onClick={handleDelete}>
//                             Delete Booking
//                         </Button>
//                         <Button variant="secondary" onClick={() => handleModify('bookingDate', new Date().toISOString())}>
//                             Modify Booking
//                         </Button>
//                     </div>
//                 </div>
//             )}
//         </Container>
//     );
// };

// export default DeleteComponent;



// import React, { useState } from 'react';
// import './DeleteComponent.css';
// // import { deleteBookingById, getBookingById, updateBookingById } from './deleteBookingApis';
// import { useNavigate } from 'react-router-dom';
// import { getBookingById, deleteBookingById } from './deleteBookingApis';

// import { modifyBooking } from '../ModifyBooking/modifyBookingApis';



// const DeleteComponent = () => {
//     const [bookingId, setBookingId] = useState('');
//     const [bookingData, setBookingData] = useState(null);
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     const handleSearch = async () => {
//         try {
//             const data = await getBookingById(bookingId);
//             setBookingData(data);
//             setMessage('');
//         } catch (error) {
//             setMessage('Failed to find booking. Please check the booking ID.');
//             setBookingData(null); 
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             const response = await deleteBookingById(bookingId);
//             if (response.status === 200) {
//                 setMessage('Booking deleted successfully');
//                 setBookingData(null); 
//             }
//         } catch (error) {
//             setMessage('Failed to delete booking. Please try again.');
//         }
//     };

//     const handleModify = () => {
//         navigate(`/modifyBooking/${bookingId}`);
//     };

//     const handlePassengerChange = (index, field, value) => {
//         const updatedBookingData = { ...bookingData };
//         updatedBookingData.passengers[index][field] = value;
//         setBookingData(updatedBookingData);
//     };

//     const handleSaveChanges = async () => {
//         try {
//             const response = await modifyBooking(bookingId, bookingData);
//             if (response.status === 200) {
//                 setMessage('Booking updated successfully');
//             }
//         } catch (error) {
//             setMessage('Failed to update booking. Please try again.');
//         }
//     };

//     return (
//         <div className="delete-booking-container">
//             <h2>Manage Booking</h2>
//             <input
//                 type="text"
//                 placeholder="Enter Booking ID"
//                 value={bookingId}
//                 onChange={(e) => setBookingId(e.target.value)}
//             />
//             <button onClick={handleSearch}>Search</button>

//             {message && <p className="message">{message}</p>}

//             {bookingData && (
//                 <div className="booking-details">
//                     <h3>Booking Details</h3>
//                     <p><strong>User ID:</strong> {bookingData.userId}</p>
//                     <p><strong>Booking Date:</strong> {new Date(bookingData.bookingDate).toLocaleDateString()}</p>
//                     <p><strong>Scheduled Flight ID:</strong> {bookingData.scheduledFlightId}</p>
//                     <p><strong>Passengers:</strong></p>
//                     <ul>
//                         {bookingData.passengers.map((passenger, index) => (
//                             <li key={index}>
//                                 <input
//                                     type="text"
//                                     value={passenger.passengerName}
//                                     onChange={(e) => handlePassengerChange(index, 'passengerName', e.target.value)}
//                                     placeholder="Passenger Name"
//                                 />
//                                 <input
//                                     type="number"
//                                     value={passenger.passengerAge}
//                                     onChange={(e) => handlePassengerChange(index, 'passengerAge', e.target.value)}
//                                     placeholder="Passenger Age"
//                                 />
//                                 <input
//                                     type="text"
//                                     value={passenger.gender}
//                                     onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
//                                     placeholder="Gender"
//                                 />
                            
//                             </li>
//                         ))}
//                     </ul>

                    
//                     <button onClick={handleModify}>Modify Booking</button>
//                     <button onClick={handleDelete}>Delete Booking</button>
//                     <button onClick={handleSaveChanges}>Save Changes</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DeleteComponent;


import React, { useState } from 'react';
import './DeleteComponent.css';
import { deleteBookingById, getBookingById } from './deleteBookingApis';
import { modifyBooking } from '../ModifyBooking/modifyBookingApis';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from 'react-icons/fa'; // Import an edit icon from react-icons

const DeleteComponent = () => {
    const [bookingId, setBookingId] = useState('');
    const [bookingData, setBookingData] = useState(null);
    const [message, setMessage] = useState('');
    const [editableIndex, setEditableIndex] = useState(null); // State to track which passenger is being edited
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const data = await getBookingById(bookingId);
            setBookingData(data);
            setMessage('');
        } catch (error) {
            setMessage('Failed to find booking. Please check the booking ID.');
            setBookingData(null); 
        }
    };

    const handleDelete = async () => {
        try {
            const response = await deleteBookingById(bookingId);
            if (response.status === 200) {
                setMessage('Booking deleted successfully');
                setBookingData(null); 
            }
        } catch (error) {
            setMessage('Failed to delete booking. Please try again.');
        }
    };

    const handleModify = () => {
        navigate(`/modifyBooking/${bookingId}`);
    };

    const handlePassengerChange = (index, field, value) => {
        const updatedBookingData = { ...bookingData };
        updatedBookingData.passengers[index][field] = value;
        setBookingData(updatedBookingData);
    };

    const handleSaveChanges = async () => {
        try {
            console.log(bookingId);
            console.log(bookingData);

            const response = await modifyBooking(bookingId, bookingData);
            if (response.status === 200) {
                setMessage('Booking updated successfully');
                setEditableIndex(null); // Reset editable index after saving
            }
        } catch (error) {
            setMessage('Failed to update booking. Please try again.');
        }
    };

    const handleDeletePassenger = (index) => {
        const updatedPassengers = bookingData.passengers.filter((_, i) => i !== index);
        setBookingData({ ...bookingData, passengers: updatedPassengers });
        
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Manage Booking</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Booking ID"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                />
            </div>
            <button className="btn btn-primary mb-3" onClick={handleSearch}>Search</button>

            {message && <p className="alert alert-info">{message}</p>}

            {bookingData && (
                <div className="booking-details border rounded p-3">
                    <h3>Booking Details</h3>
                    {/* <p><strong>User ID:</strong> {bookingData.user.userId}</p> */}
                    <p><strong>Booking Date:</strong> {new Date(bookingData.bookingDate).toLocaleDateString()}</p>
                    <p><strong>Scheduled Flight ID:</strong> {bookingData.scheduledFlight.scheduledFlightId}</p>
                    <p><strong>Passengers:</strong></p>
                    
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Luggage (kg)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingData.passengers.map((passenger, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={passenger.passengerName}
                                            onChange={(e) => handlePassengerChange(index, 'passengerName', e.target.value)}
                                            placeholder="Passenger Name"
                                            disabled={editableIndex !== index} // Enable input only if this index is editable
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={passenger.passengerAge}
                                            onChange={(e) => handlePassengerChange(index, 'passengerAge', e.target.value)}
                                            placeholder="Passenger Age"
                                            disabled={editableIndex !== index}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            className="form-select"
                                            value={passenger.gender}
                                            onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                                            disabled={editableIndex !== index} // Enable dropdown only if this index is editable
                                        >
                                            <option value="" disabled>Select Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={passenger.luggage}
                                            onChange={(e) => handlePassengerChange(index, 'luggage', e.target.value)}
                                            placeholder="Luggage (kg)"
                                            disabled={editableIndex !== index}
                                        />
                                    </td>
                                    <td>
                                        {editableIndex === index ? (
                                            <button className="btn btn-success" onClick={handleSaveChanges}>Save</button>
                                        ) : (
                                            <button className="btn btn-warning" onClick={() => setEditableIndex(index)}>
                                                <FaEdit /> Edit
                                            </button>
                                        )}
                                        <button className="btn btn-danger" onClick={() => handleDeletePassenger(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="btn btn-warning me-2" onClick={handleModify}>Modify Booking</button>
                    <button className="btn btn-danger me-2" onClick={handleDelete}>Delete Booking</button>
                </div>
            )}
        </div>
    );
};

export default DeleteComponent;

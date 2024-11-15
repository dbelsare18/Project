import axios from 'axios';

const token = localStorage.getItem('token');


const headerToken = {
    headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
    },
}


// // Modify booking API function
// export const modifyBooking = async (bookingId, bookingData) => {
//     try {

//         // Make the PUT request to modify the booking with the provided bookingId and bookingData
//         const response = await axios.put(`http://localhost:7060/booking/modifyBooking/${bookingId}`, bookingData, headerToken);
//         return response.data; // Return the response data
//     } catch (error) {
//         // Log and re-throw error to be handled by the calling component
//         console.error("Error modifying booking:", error.response ? error.response.data : error.message);
//         throw error;
//     }
// };
// import axios from 'axios';








const BASE_URL = "http://localhost:7060/booking";


const getCurrentDate = () => {
    const bookingDate = new Date();
    return `${bookingDate.getFullYear()}-${(bookingDate.getMonth() + 1).toString().padStart(2, '0')}-${bookingDate.getDate().toString().padStart(2, '0')}`;
};

export const modifyBooking = async (bookingId, bookingDetails) => {
    try {
        console.log(bookingId);
        console.log(bookingDetails);
        const response = await axios.put(`${BASE_URL}/modifyBooking/${bookingId}`, {
            userId: bookingDetails.user.userId ,
            passengers: bookingDetails.passengers.map(passenger => ({
                pnrNumber: passenger.pnrNumber,
                passengerName: passenger.passengerName,
                passengerAge: passenger.passengerAge,
                passengerUIN: passenger.passengerUIN,
                luggage: passenger.luggage,
                gender: passenger.gender
            })),
            bookingDate: getCurrentDate(),
            scheduledFlightId: bookingDetails.scheduledFlight.scheduledFlightId
        }, headerToken);

        return response.data;
    } catch (error) {
        console.error("Error modifying booking:", error.response?.data || error.message);
        throw error;
    }
};
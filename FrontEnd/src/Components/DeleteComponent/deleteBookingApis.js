// import axios from 'axios';


// const token = localStorage.getItem('token'); 

// const BASE_URL = 'http://localhost:7060/booking/deleteBooking';

//     const headerToken={
//         headers: {
//             Authorization: `Bearer ${token}`, // Set the Authorization header
//         },
//     }


// export const deleteBookingById = async (bookingId) => {
//     try {
//         return await axios.delete(`${BASE_URL}/${bookingId}`,headerToken);
//     } catch (error) {
//         console.error('Error deleting booking:', error);
//         throw error;
//     }
// };


import axios from 'axios';

const token = localStorage.getItem('token');

const BASE_URL = 'http://localhost:7060/booking';

const headerToken = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};


export const getBookingById = async (bookingId) => {
    try {
        const response = await axios.get(`${BASE_URL}/viewBooking/${bookingId}`, headerToken);
        return response.data;
    } catch (error) {
        console.error('Error fetching booking:', error);
        throw error;
    }
};


export const deleteBookingById = async (bookingId) => {
    try {
        return await axios.delete(`${BASE_URL}/deleteBooking/${bookingId}`, headerToken);
    } catch (error) {
        console.error('Error deleting booking:', error);
        throw error;
    }
};
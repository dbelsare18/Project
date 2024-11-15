import axios from 'axios';


const token = localStorage.getItem('token'); 

const BASE_URL = 'http://localhost:7060/booking/addBooking';

const headerToken={
    headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
    },
}

export const addBooking = async (bookingData) => {
    try {
        const response = await axios.post(`${BASE_URL}`, bookingData,headerToken);
        return response.data;
    } catch (error) {
        console.error("Error adding booking:", error);
        throw error;
    }
}

    export const confirmBooking = async (bookingData) => {
        try {
            const response = await axios.post('http://localhost:7060/booking/confirm', bookingData, {
                responseType: 'blob' // Important for handling binary data
            },headerToken);
            return response.data;
        } catch (error) {
            console.error("Error confirming booking:", error);
            throw error;
        }
    
};

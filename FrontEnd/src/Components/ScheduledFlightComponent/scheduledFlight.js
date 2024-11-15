import axios from 'axios';

const API_BASE_URL = 'http://localhost:8084/scheduledflight/view-scheduledflight'; // Update with your backend API URL

export const getScheduledFlights = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data; // Assuming the response is a list of scheduled flights
    } catch (error) {
        console.error('Error fetching scheduled flights:', error);
        throw error; // You can handle errors as needed
    }
};

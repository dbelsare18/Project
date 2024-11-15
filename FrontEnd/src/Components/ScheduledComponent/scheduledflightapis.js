import axios from 'axios';
const token = localStorage.getItem('token'); 

const BASE_URL = "http://localhost:7061/scheduledflight";

const FLIGHT_URL = "http://localhost:7064/api/flights";

const SCHEDULE_URL = "http://localhost:7066/api/schedules";


// const getHeaderToken = () => {
//     const token = localStorage.getItem('token');
//     return {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
// };


const headerToken={
    headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
    },
}


export const getFlights = async () => {
    try {
        const response = await axios.get(`${FLIGHT_URL}`,headerToken);
        return response.data;
    } catch (error) {
        console.error("Error fetching flights:", error);
        throw error;
    }
};

export const getSchedules = async () => {
    try {
        const response = await axios.get(`${SCHEDULE_URL}`,headerToken);
        return response.data;
    } catch (error) {
        console.error("Error fetching schedules:", error);
        throw error;
    }
};

export const scheduleFlight = async (scheduledFlightRequest) => {
    try {
        const response = await axios.post(`${BASE_URL}/schedule-flight`, scheduledFlightRequest,headerToken);
        return response.data;
    } catch (error) {
        console.error("Error scheduling flight:", error);
        throw error;
    }
};

export const getScheduledFlights = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/view-scheduledflights`,headerToken);
        return response.data;
    } catch (error) {
        console.error("Error retrieving scheduled flights:", error);
        throw error;
    }
};

export const deleteScheduledFlight = async (scheduledFlightId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/delete-scheduledflight/${scheduledFlightId}`,headerToken);
        return response.data;
    } catch (error) {
        console.error("Error deleting scheduled flight:", error);
        throw error;
    }
};

export const getScheduledFlightById = async (scheduledFlightId) => {
    try {
        const response = await axios.get(`${BASE_URL}/view-scheduledflight/${scheduledFlightId}`,headerToken);
        return response.data;
    } catch (error) {
        console.error("Error fetching scheduled flight by ID:", error);
        throw error;
    }
}


export const updateScheduledFlight = async (scheduledFlightId, scheduledFlightRequest) => {
    try {
        const response = await axios.put(`${BASE_URL}/modify-scheduledflight/${scheduledFlightId}`, scheduledFlightRequest,headerToken);
        return response.data;
    } catch (error) {
        console.error("Error updating scheduled flight:", error);
        throw error;
    }
};
import axios from 'axios';
const token = localStorage.getItem('token'); 

const BASE_URL = 'http://localhost:7066/api/schedules';

const headerToken={
    headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
    },
}

export const addSchedule = async (scheduleData) => {
    try {
        const response = await axios.post(BASE_URL, {
            srcAirport: { airportCode: scheduleData.srcAirport },
            dstnAirport: { airportCode: scheduleData.dstnAirport },
            deptDateTime: scheduleData.deptDateTime.toISOString(),
            arrDateTime: scheduleData.arrDateTime.toISOString()
        },headerToken);
        return response.data;
    } catch (error) {
        console.error("Error adding schedule:", error.response?.data || error.message);
        throw error;
    }
};

export const modifySchedule = async (scheduleId, updatedData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${scheduleId}`, {
            srcAirport: { airportCode: updatedData.srcAirport },
            dstnAirport: { airportCode: updatedData.dstnAirport },
            deptDateTime: updatedData.deptDateTime.toISOString(),
            arrDateTime: updatedData.arrDateTime.toISOString()
        },headerToken);
        return response.data;
    } catch (error) {
        console.error("Error modifying schedule:", error.response?.data || error.message);
        throw error;
    }
};


export const getScheduleById = async (scheduleId) => {

    const response = await axios.get(`${BASE_URL}/${scheduleId}`,headerToken);

    return response.data;

};

export const getAllSchedules = async () => {

    const response = await axios.get(BASE_URL,headerToken);

    return response.data;

};

export const deleteSchedule = async (scheduleId) => {

    await axios.delete(`${BASE_URL}/${scheduleId}`,headerToken);

};

export const getAllAirports = async () => {
    try {
        const response = await axios.get('http://localhost:7062/api/airports',headerToken);
        return response.data;
    } catch (error) {
        console.error("Error fetching airports", error.message);
        throw error;
    }
};
import axios from 'axios';

;

const token = localStorage.getItem('token'); 

const API_URL = 'http://localhost:7064/api/flights';

const headerToken={
    headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
    },
}


export const addFlight = async (flightData) => {

    return await axios.post(API_URL, flightData,headerToken);

};


export const getFlightByNumber = async (flightNumber) => {

    return await axios.get(`${API_URL}/${flightNumber}`,headerToken);

};


export const getAllFlights = async () => {

    return await axios.get(API_URL,headerToken);

};


export const modifyFlight = async (flightNumber, flightData) => {

    return await axios.put(`${API_URL}/${flightNumber}`, flightData,headerToken);

};


export const deleteFlight = async (flightNumber) => {

    return await axios.delete(`${API_URL}/${flightNumber}`,headerToken);

};












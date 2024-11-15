import axios from 'axios';
const token = localStorage.getItem('token'); 

const API_URL = 'http://localhost:7062/api/airports';

const headerToken={
    headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
    },
}


export const addAirport = async (airportData) => {

    const response = await axios.post(API_URL, airportData,headerToken);

    return response.data;

};

export const getAirportByCode = async (airportCode) => {

    const response = await axios.get(`${API_URL}/${airportCode}`, headerToken);

    return response.data;

};

export const getAllAirports = async () => {

    const response = await axios.get(API_URL,headerToken);

    return response.data;

};

export const deleteAirport = async (airportCode) => {

    await axios.delete(`${API_URL}/${airportCode}`,headerToken);

};

export const modifyAirport = async (airportCode, airportData) => {

    const response = await axios.put(`${API_URL}/${airportCode}`, airportData,headerToken);

    return response.data;

};
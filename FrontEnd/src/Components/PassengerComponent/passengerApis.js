import axios from 'axios';

const token = localStorage.getItem('token'); 

const API_BASE_URL = 'http://localhost:7063/api/passengers'; 

const headerToken={
  headers: {
      Authorization: `Bearer ${token}`, // Set the Authorization header
  },
}


// Function to add a new passenger
export const addPassenger = async (passenger) => {
  try {
    const response = await axios.post(API_BASE_URL, passenger,headerToken);
    return response.data;
  } catch (error) {
    console.error("Error adding passenger:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get a passenger by PNR number
export const getPassengerByPnr = async (pnrNumber) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${pnrNumber}`,headerToken);
    return response.data;
  } catch (error) {
    console.error("Error fetching passenger:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get all passengers
export const getAllPassengers = async () => {
  try {
    const response = await axios.get(API_BASE_URL,headerToken);
    return response.data;
  } catch (error) {
    console.error("Error fetching passengers:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to update a passenger
export const updatePassenger = async (pnrNumber, passenger) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${pnrNumber}`, passenger,headerToken);
    return response.data;
  } catch (error) {
    console.error("Error updating passenger:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to delete a passenger
export const deletePassenger = async (pnrNumber) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${pnrNumber}`,headerToken);
    return response.data;
  } catch (error) {
    console.error("Error deleting passenger:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to update passenger luggage
export const updateLuggage = async (pnrNumber, luggage) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${pnrNumber}/luggage`, null, {
      params: { luggage }
    },headerToken);
    return response.data;
  } catch (error) {
    console.error("Error updating luggage:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to search passengers by name
export const findPassengersByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { name }
    },headerToken);
    return response.data;
  } catch (error) {
    console.error("Error searching passengers:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get all passenger UINs
export const getAllPassengerUINs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/uins`,headerToken);
    return response.data;
  } catch (error) {
    console.error("Error fetching UINs:", error.response ? error.response.data : error.message);
    throw error;
  }
};
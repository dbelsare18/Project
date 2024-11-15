

import React, { useEffect, useState } from 'react';

import { addAirport, getAirportByCode, getAllAirports, deleteAirport, modifyAirport } from './AirportApis';
import 'bootstrap/dist/css/bootstrap.min.css';

const AirportComponent = () => {

    const [airportData, setAirportData] = useState({

        airportCode: '',

        airportName: '',

        airportLocation: '',

    });

    const [airports, setAirports] = useState([]);

    const [mode, setMode] = useState('view');

    useEffect(() => {

        if (mode === 'view') {

            fetchAllAirports();

        }

    }, [mode]);

    const fetchAllAirports = async () => {

        try {

            const response = await getAllAirports();

            setAirports(response);

        } catch (error) {

            console.error('Error fetching airports:', error);

        }

    };

    const handleInputChange = (e) => {

        setAirportData({ ...airportData, [e.target.name]: e.target.value });

    };

    const handleAddAirport = async (e) => {

        e.preventDefault();

        try {

            await addAirport(airportData);

            alert('Airport Added Successfully!');

            setMode('view');

        } catch (error) {

            console.error('Error adding airport:', error);

        }

    };

    const handleDeleteAirport = async (airportCode) => {

        try {

            await deleteAirport(airportCode);

            alert('Airport Deleted Successfully!');

            fetchAllAirports();

        } catch (error) {

            console.error('Error deleting airport:', error);

        }

    };

    const handleSearchAirport = async () => {

        try {

            const response = await getAirportByCode(airportData.airportCode);

            setAirportData(response);

            setMode('update');

        } catch (error) {

            console.error('Error fetching airport:', error);

            alert('Airport not found!');

        }

    };

    const handleUpdateAirport = async (e) => {

        e.preventDefault();

        try {

            await modifyAirport(airportData.airportCode, airportData);

            alert('Airport Updated Successfully!');

            setMode('view');

        } catch (error) {

            console.error('Error updating airport:', error);

        }

    };

    return (

        <div className="container mt-4">

            <h1 className="text-center mb-4">Airport Service</h1>

            <div className="text-center mb-4">

                <button className="btn btn-primary me-2" onClick={() => setMode('view')}>View Airports</button>

                <button className="btn btn-success me-2" onClick={() => setMode('add')}>Add Airport</button>

                <button className="btn btn-warning" onClick={() => setMode('search')}>Search/Update Airport</button>

            </div>

            {mode === 'view' && (

                <div>

                    <h2>All Airports</h2>

                    <ul className="list-group">

                        {airports.map((airport) => (

                            <li key={airport.airportCode} className="list-group-item d-flex justify-content-between align-items-center">

                                {airport.airportCode} - {airport.airportName} - {airport.airportLocation}

                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteAirport(airport.airportCode)}>Delete</button>

                            </li>

                        ))}

                    </ul>

                </div>

            )}

            {mode === 'add' && (

                <div>

                    <h2>Add Airport</h2>

                    <form onSubmit={handleAddAirport}>

                        <div className="mb-3">

                            <label className="form-label">Airport Code:</label>

                            <input type="text" className="form-control" name="airportCode" onChange={handleInputChange} required />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">Airport Name:</label>

                            <input type="text" className="form-control" name="airportName" onChange={handleInputChange} required />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">Location:</label>

                            <input type="text" className="form-control" name="airportLocation" onChange={handleInputChange} required />

                        </div>

                        <button type="submit" className="btn btn-success">Add Airport</button>

                    </form>

                </div>

            )}

            {mode === 'search' && (

                <div>

                    <h2>Search Airport</h2>

                    <div className="mb-3">

                        <label className="form-label">Enter Airport Code:</label>

                        <input type="text" className="form-control" name="airportCode" value={airportData.airportCode} onChange={handleInputChange} />

                    </div>

                    <button className="btn btn-primary" onClick={handleSearchAirport}>Search</button>

                </div>

            )}

            {mode === 'update' && (

                <div>

                    <h2>Update Airport</h2>

                    <form onSubmit={handleUpdateAirport}>

                        <div className="mb-3">

                            <label className="form-label">Airport Name:</label>

                            <input type="text" className="form-control" name="airportName" value={airportData.airportName} onChange={handleInputChange} />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">Location:</label>

                            <input type="text" className="form-control" name="location" value={airportData.airportLocation} onChange={handleInputChange} />

                        </div>

                        <button type="submit" className="btn btn-primary">Update Airport</button>

                    </form>

                </div>

            )}

        </div>

    );

};

export default AirportComponent;

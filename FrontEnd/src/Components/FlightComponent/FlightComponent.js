import { useEffect, useState } from "react";

import { addFlight, deleteFlight, getAllFlights, getFlightByNumber, modifyFlight } from "./flightApis";

import 'bootstrap/dist/css/bootstrap.min.css';

const FlightComponent = () => {

    const [mode, setMode] = useState("view");

    const [flightData, setFlightData] = useState({

        flightNumber: '',

        flightModel: '',

        carrierName: '',

        seatCapacity: ''

    });

    const [flights, setFlights] = useState([]);

    const [flightNumber, setFlightNumber] = useState('');

    useEffect(() => {

        if (mode === "view") {

            fetchAllFlights();

        }

    }, [mode]);

    const fetchAllFlights = async () => {

        try {

            const response = await getAllFlights();

            setFlights(response.data);

        } catch (error) {

            console.error("Error While fetching flights-", error);

        }

    };

    const handleInputChange = (e) => {

        setFlightData({ ...flightData, [e.target.name]: e.target.value });

    };

    const handleAddFlight = async (e) => {

        e.preventDefault();

        try {

            await addFlight(flightData);

            alert("Flight Added Successfully!!");

            setMode("view");

        } catch (error) {

            console.error("Error While Adding Flight-", error);

        }

    };

    const handleUpdateFlight = async (e) => {

        e.preventDefault();

        try {

            await modifyFlight(flightNumber, flightData);

            alert("Flight updated Successfully!!");

            setMode("view");

        } catch (error) {

            console.error("Error While updating Flight-", error);

        }

    };

    const handleDeleteFlight = async (flightNumber) => {

        try {

            await deleteFlight(flightNumber);

            alert("Flight Deleted Successfully!!");

            fetchAllFlights();

        } catch (error) {

            console.error("Error While Deleting Flight-", error);

        }

    };

    const handleSearchFlight = async () => {

        try {

            const response = await getFlightByNumber(flightNumber);

            setFlightData(response.data);

            setMode("update");

        } catch (error) {

            console.error("Error While Fetching Flight-", error);

            alert("Flight not found!");

        }

    };

    let content;

    if (mode === "view") {

        content = (

            <div>

                <h2>All Flights</h2>

                <ul className="list-group">

                    {flights.map((flight) => (

                        <li key={flight.flightNo} className="list-group-item d-flex justify-content-between align-items-center">

                            {flight.flightNumber} - {flight.flightModel} - {flight.carrierName} - {flight.seatCapacity}

                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteFlight(flight.flightNumber)}>Delete</button>

                        </li>

                    ))}

                </ul>

            </div>

        );

    } else if (mode === "add") {

        content = (

            <div>

                <h2>Add Flight</h2>

                <form onSubmit={handleAddFlight}>

                    <div className="mb-3">

                        <label className="form-label">Flight Model:</label>

                        <input type="text" className="form-control" name="flightModel" onChange={handleInputChange} required />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">Carrier Name:</label>

                        <input type="text" className="form-control" name="carrierName" onChange={handleInputChange} required />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">Seat Capacity:</label>

                        <input type="number" className="form-control" name="seatCapacity" onChange={handleInputChange} required />

                    </div>

                    <button type="submit" className="btn btn-success">Add Flight</button>

                </form>

            </div>

        );

    } else if (mode === "search") {

        content = (

            <div>

                <h2>Search Flight</h2>

                <div className="mb-3">

                    <label className="form-label">Enter Flight Number:</label>

                    <input type="text" className="form-control" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} />

                </div>

                <button className="btn btn-primary" onClick={handleSearchFlight}>Search</button>

            </div>

        );

    } else if (mode === "update") {

        content = (

            <div>

                <h2>Update Flight</h2>

                <form onSubmit={handleUpdateFlight}>

                    <div className="mb-3">

                        <label className="form-label">Flight Model:</label>

                        <input type="text" className="form-control" name="flightModel" value={flightData.flightModel} onChange={handleInputChange} />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">Carrier Name:</label>

                        <input type="text" className="form-control" name="carrierName" value={flightData.carrierName} onChange={handleInputChange} />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">Seat Capacity:</label>

                        <input type="number" className="form-control" name="seatCapacity" value={flightData.seatCapacity} onChange={handleInputChange} />

                    </div>

                    <button type="submit" className="btn btn-primary">Update Flight</button>

                </form>

            </div>

        );

    }

    return (

        <div className="container mt-4">

            <h1 className="text-center mb-4">Flight Management System</h1>

            <div className="text-center mb-4">

                <button className="btn btn-primary me-2" onClick={() => setMode("view")}>View Flights</button>

                <button className="btn btn-success me-2" onClick={() => setMode("add")}>Add Flight</button>

                <button className="btn btn-warning" onClick={() => setMode("search")}>Search/Update Flight</button>

            </div>

            {content}

        </div>

    );

};

export default FlightComponent;






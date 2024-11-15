import React, { useState, useEffect } from 'react';
import {
    scheduleFlight,
    getScheduledFlights,
    getFlights,
    getSchedules,
    deleteScheduledFlight,
    updateScheduledFlight,
} from './scheduledflightapis';
import { Button, Container } from 'react-bootstrap';

const ScheduledFlightComponent = () => {
    const [scheduledFlightData, setScheduledFlightData] = useState({
        scheduledFlightId: '',
        flightNumber: '',
        scheduleId: '',
    });
    const [flights, setFlights] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [scheduledFlights, setScheduledFlights] = useState([]);
    const [selectedFlightId, setSelectedFlightId] = useState(null);

    useEffect(() => {
        fetchScheduledFlights();
        fetchFlights();
        fetchSchedules();
    }, []);

    const fetchScheduledFlights = async () => {
        try {
            const data = await getScheduledFlights();
            setScheduledFlights(data);
        } catch (error) {
            console.error("Failed to fetch scheduled flights", error);
        }
    };

    const fetchFlights = async () => {
        try {
            const data = await getFlights();
            setFlights(data);
        } catch (error) {
            console.error("Failed to fetch flights", error);
        }
    };

    const fetchSchedules = async () => {
        try {
            const data = await getSchedules();
            setSchedules(data);
        } catch (error) {
            console.error("Failed to fetch schedules", error);
        }
    };

    const handleScheduleFlight = async () => {
        const { flightNumber, scheduleId } = scheduledFlightData;
        if (!flightNumber || !scheduleId) {
            alert("Please select both flight and schedule.");
            return;
        }

        try {
            await scheduleFlight({ flightNumber, scheduleId });
            alert("Flight scheduled successfully!");
            fetchScheduledFlights();
            clearForm();
        } catch (error) {
            console.error("Failed to schedule flight", error);
            alert("Failed to schedule flight. Please try again.");
        }
    };

    const handleUpdateScheduledFlight = async () => {
        const { flightNumber, scheduleId } = scheduledFlightData;
        if (!flightNumber || !scheduleId) {
            alert("Please select both flight and schedule to update.");
            return;
        }

        try {
            await updateScheduledFlight(selectedFlightId, { flightNumber, scheduleId });
            alert("Flight updated successfully!");
            fetchScheduledFlights();
            clearForm();
        } catch (error) {
            console.error("Failed to update scheduled flight", error);
            alert("Failed to update scheduled flight. Please try again.");
        }
    };

    const handleDeleteScheduledFlight = async () => {
        if (!selectedFlightId) {
            alert("Please select a scheduled flight to delete.");
            return;
        }

        try {
            await deleteScheduledFlight(selectedFlightId);
            alert("Flight deleted successfully!");
            fetchScheduledFlights();
            clearForm();
        } catch (error) {
            console.error("Failed to delete scheduled flight", error);
            alert("Failed to delete scheduled flight. Please try again.");
        }
    };

    const handleSelectFlight = (flight) => {
        setScheduledFlightData({
            scheduledFlightId: flight.scheduledFlightId,
            flightNumber: flight.flightDetails.flightNumber,
            scheduleId: flight.scheduleDetails.scheduleId,
        });
        setSelectedFlightId(flight.scheduledFlightId);
    };

    const clearForm = () => {
        setScheduledFlightData({
            scheduledFlightId: '',
            flightNumber: '',
            scheduleId: '',
        });
        setSelectedFlightId(null);
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Scheduled Flight Management</h2>

            <div className="card p-4 mb-4">
                <div className="form-group">
                    <label>Flight Number</label>
                    <select
                        className="form-control"
                        value={scheduledFlightData.flightNumber}
                        onChange={(e) => setScheduledFlightData({ ...scheduledFlightData, flightNumber: e.target.value })}
                    >
                        <option value="">Select Flight</option>
                        {flights.map((flight) => (
                            <option key={flight.flightNumber} value={flight.flightNumber}>
                                {flight.flightNumber} - {flight.carrierName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Schedule ID</label>
                    <select
                        className="form-control"
                        value={scheduledFlightData.scheduleId}
                        onChange={(e) => setScheduledFlightData({ ...scheduledFlightData, scheduleId: e.target.value })}
                    >
                        <option value="">Select Schedule</option>
                        {schedules.map((schedule) => (
                            <option key={schedule.scheduleId} value={schedule.scheduleId}>
                                {schedule.scheduleId} - {schedule.srcAirport.airportName} to {schedule.dstnAirport.airportName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="text-center mt-4">
                    <Button onClick={handleScheduleFlight} variant="primary" style={{ marginRight: '10px' }}>
                        Add Flight
                    </Button>
                    <Button onClick={handleUpdateScheduledFlight} variant="warning" style={{ marginRight: '10px' }} disabled={!selectedFlightId}>
                        Update Flight
                    </Button>
                    <Button onClick={handleDeleteScheduledFlight} variant="danger" disabled={!selectedFlightId}>
                        Delete
                    </Button>
                </div>
            </div>

            <h3 className="text-center mt-4">Scheduled Flights</h3>
            <ul className="list-group mt-2">
                {scheduledFlights.map((flight) => (
                    <li
                        className={`list-group-item ${flight.scheduledFlightId === selectedFlightId ? 'active' : ''}`}
                        key={flight.scheduledFlightId}
                        onClick={() => handleSelectFlight(flight)}
                    >
                        Flight {flight.flightDetails.flightNumber} ({flight.flightDetails.carrierName}) - {flight.scheduleDetails.srcAirport.airportName} to {flight.scheduleDetails.dstnAirport.airportName}
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default ScheduledFlightComponent;

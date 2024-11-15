import React, { useState, useEffect } from 'react';
import { getScheduledFlights } from './scheduledflightapis';
import { Container, Table } from 'react-bootstrap';
import { red } from '@material-ui/core/colors';

const GetScheduledFlight = () => {
    const [scheduledFlights, setScheduledFlights] = useState([]);

    useEffect(() => {
        const fetchScheduledFlights = async () => {
            try {
                const data = await getScheduledFlights();
                setScheduledFlights(data);
            } catch (error) {
                console.error("Failed to fetch scheduled flights", error);
            }
        };

        fetchScheduledFlights();
    }, []);

    return (
        <Container className="mt-4" style={{padding:'0px', marginLeft:'30px', width:'1500px'}}>
            <h3 className="text-center" style={{ marginLeft:'550px'}}>Scheduled Flights</h3>
            <Table className="table table-dark table-hover" style={{ width: '200%', tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        <th>Scheduled Flights</th>
                        <th>Flight Number</th>
                        <th>Carrier Name</th>
                        <th>Route</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Per Ticket Cost</th>
                        <th>Available Seats</th>
                    </tr>
                </thead>
                <tbody>
                    {scheduledFlights.map((flight) => (
                        <tr key={flight.scheduledFlightId}>
                            <td>{flight.scheduledFlightId}</td>

                            <td>{flight.flightDetails.flightNumber}</td>
                            <td>{flight.flightDetails.carrierName}</td>
                            <td>
                                {flight.scheduleDetails.srcAirport.airportName} to {flight.scheduleDetails.dstnAirport.airportName}
                            </td>
                            <td>{new Date(flight.scheduleDetails.deptDateTime).toLocaleString()}</td>
                            <td>{new Date(flight.scheduleDetails.arrDateTime).toLocaleString()}</td>
                            <td>{flight.perTicketCost}</td>
                            <td>{flight.availableSeats}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default GetScheduledFlight;
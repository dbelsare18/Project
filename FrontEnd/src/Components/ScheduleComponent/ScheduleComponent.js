import React, { useState, useEffect } from 'react';

import { addSchedule, modifySchedule, getScheduleById, getAllSchedules, deleteSchedule, getAllAirports } from './scheduleapis';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const ScheduleComponent = () => {

    const [scheduleData, setScheduleData] = useState({

        scheduleId: '',

        srcAirport: '',

        dstnAirport: '',

        deptDateTime: new Date(),

        arrDateTime: new Date()

    });

    const [schedules, setSchedules] = useState([]);

    const [airports, setAirports] = useState([]);

    const [scheduleId, setScheduleId] = useState(null);

    useEffect(() => {

        fetchSchedules();

        fetchAirports();

    }, []);

    const fetchSchedules = async () => {

        const result = await getAllSchedules();

        setSchedules(result);

    };

    const fetchAirports = async () => {

        try {

            const result = await getAllAirports();

            console.log("Fetched Airports:", result);

            setAirports(result);

        } catch (error) {

            console.error("Failed to fetch airports", error);

        }

    };

    const handleAddSchedule = async () => {

        const { srcAirport, dstnAirport, deptDateTime, arrDateTime } = scheduleData;

        if (!srcAirport || !dstnAirport || !deptDateTime || !arrDateTime) {
            alert("Please fill in all fields.");
            return;
        }

        try {

            await addSchedule(scheduleData);
            alert("Schedule added successfully!");

            fetchSchedules();
            clearForm();

        } catch (error) {
            console.error("Error adding schedule:", error);
            alert("Failed to add schedule. Please try again.");
        }
    };

    const handleModifySchedule = async () => {
        if (!scheduleId) {
            alert("Please select a schedule to modify");
            return;
        }

        try {
            await modifySchedule(scheduleId, scheduleData);
            alert("Schedule modified successfully!");
            fetchSchedules();
            clearForm();

        } catch (error) {
            console.error("Error modifying schedule:", error);
            alert("Failed to modify schedule. Please try again.");
        }
    };

    const handleDeleteSchedule = async () => {
        if (!scheduleId) {
            alert("Please select a schedule to delete");
            return;
        }

        try {
            await deleteSchedule(scheduleId);
            alert("Schedule deleted successfully!");
            fetchSchedules();
            clearForm();

        } catch (error) {
            console.error("Error deleting schedule:", error);
            alert("Failed to delete schedule. Please try again.");
        }
    };


    const handleSelectSchedule = (schedule) => {

        setScheduleId(schedule.scheduleId);

        setScheduleData({

            scheduleId: schedule.scheduleId,

            srcAirport: schedule.srcAirport.airportCode,

            dstnAirport: schedule.dstnAirport.airportCode,

            deptDateTime: new Date(schedule.deptDateTime),

            arrDateTime: new Date(schedule.arrDateTime)

        });

    };

    const clearForm = () => {

        setScheduleData({

            scheduleId: '',

            srcAirport: '',

            dstnAirport: '',

            deptDateTime: new Date(),

            arrDateTime: new Date()

        });

        setScheduleId(null);

    };

    return (

        <div className="container mt-4">

            <h2 className="text-center mb-4">Schedule Management</h2>

            <div className="card p-4 mb-4">

                <div className="form-group">

                    <label>Source Airport:</label>

                    <select

                        className="form-control"

                        value={scheduleData.srcAirport}

                        onChange={(e) => setScheduleData({ ...scheduleData, srcAirport: e.target.value })}

                    >

                        <option value="">Select Source Airport</option>

                        {airports.map((airport) => (

                            <option key={airport.airportCode} value={airport.airportCode}>{airport.airportName}</option>

                        ))}

                    </select>

                </div>

                <div className="form-group">

                    <label>Destination Airport:</label>

                    <select

                        className="form-control"

                        value={scheduleData.dstnAirport}

                        onChange={(e) => setScheduleData({ ...scheduleData, dstnAirport: e.target.value })}

                    >

                        <option value="">Select Destination Airport</option>

                        {airports.map((airport) => (

                            <option key={airport.airportCode} value={airport.airportCode}>{airport.airportName}</option>

                        ))}

                    </select>

                </div>

                <div className="form-group">

                    <label>Departure Date and Time:</label>

                    <DatePicker

                        selected={scheduleData.deptDateTime}

                        onChange={(date) => setScheduleData({ ...scheduleData, deptDateTime: date })}

                        showTimeSelect

                        dateFormat="Pp"

                        className="form-control"

                    />

                </div>

                <div className="form-group">

                    <label>Arrival Date and Time:</label>

                    <DatePicker

                        selected={scheduleData.arrDateTime}

                        onChange={(date) => setScheduleData({ ...scheduleData, arrDateTime: date })}

                        showTimeSelect

                        dateFormat="Pp"

                        className="form-control"

                    />

                </div>

                <div className="text-center mt-4">
                    <button onClick={handleAddSchedule} className="btn btn-primary" style={{ marginRight: '10px' }}>
                        Add Schedule
                    </button>
                    <button onClick={handleModifySchedule} className="btn btn-warning" style={{ marginRight: '10px' }}>
                        Modify Schedule
                    </button>
                    <button onClick={handleDeleteSchedule} className="btn btn-danger">
                        Delete Schedule
                    </button>
                </div>

            </div>

            <h3 className="text-center mt-4">Available Schedules:</h3>

            <ul className="list-group mt-2">

                {schedules.map((schedule) => (

                    <li

                        className={`list-group-item ${schedule.scheduleId === scheduleId ? 'active' : ''}`}

                        key={schedule.scheduleId}

                        onClick={() => handleSelectSchedule(schedule)}

                    >

                        {schedule.srcAirport.airportCode} to {schedule.dstnAirport.airportCode} Will be Departed on {schedule.deptDateTime} and Arrived on {schedule.arrDateTime}

                    </li>

                ))}

            </ul>

        </div>

    );

};

export default ScheduleComponent;

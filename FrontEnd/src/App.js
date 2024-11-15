import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import FlightComponent from './Components/FlightComponent/FlightComponent';
import AirportComponent from './Components/AirportComponent/AirportComponent';
import ScheduleComponent from './Components/ScheduleComponent/ScheduleComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScheduledFlightComponent from './Components/ScheduledComponent/ScheduledFlightComponent';
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Home from "../src/Components/Home";
import ResetPassword from "./Components/ResetPassword";
import Navbar from "./Components/Navbar";
import UserDashboard from "./Components/UserDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import UserProfile from "./Components/UserProfile";
import BookingComponent from './Components/BookingComponent/BookingComponent';
import DeleteComponent from './Components/DeleteComponent/DeleteComponent';
import BookingDetailsComponent from './Components/BookingDetailsComponent/BookingDetailsComponent';
import ModifyBooking from './Components/ModifyBooking/ModifyBooking';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

        <Route path="/" exact element={<Home />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/navbar" exact element={<Navbar />}></Route>
         <Route path="/register" exact element={<Registration />}></Route>
          <Route
            path="/userDashboard"
            exact
            element={<UserDashboard />}
          ></Route>
          <Route
            path="/adminDashboard"
            exact
            element={<AdminDashboard />}
          ></Route>
          <Route path="/userProfile" exact element={<UserProfile />}></Route>

          <Route
            path="/resetPassword"
            exact
            element={<ResetPassword />}
          ></Route>
          <Route path='/flightComponent' element={<FlightComponent />}></Route>
          <Route path='/airportComponent' element={<AirportComponent />}></Route>
          <Route path='/scheduleComponent' element={<ScheduleComponent />}></Route>
          <Route path='/scheduledFlightComponent' element={<ScheduledFlightComponent />}></Route>
          {/* <Route path="/modifyBooking/:bookingId" element={<ModifyBooking />} /> */}
          <Route path="/bookingDetails/:bookingId" element={<BookingDetailsComponent />} />

          <Route path='/booking' element={<BookingComponent />}></Route>
          <Route path="/deleteBooking" element={<DeleteComponent />}></Route>
          <Route path="/bookingDetails" element={<BookingDetailsComponent />}></Route>
          <Route path="/modifyBooking/:bookingId" element={<ModifyBooking/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

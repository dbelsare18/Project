import { Button } from '@mui/material';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import {useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import BookingComponent from './BookingComponent/BookingComponent';
import GetScheduledFlight from './ScheduledComponent/GetScheduledFlight';
import DeleteComponent from './DeleteComponent/DeleteComponent';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
export default function UserDashboard() {

    const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    useEffect(() => {
      const getUserByEmail = async () => {
        // e.preventDefault();
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        
        try {
          const response = await axios.get(`http://localhost:7065/user/email/${username}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Set the Authorization header
            },
          });
          // console.log(response.data);
          // console.log(response.data.userId);

          debugger;
          localStorage.setItem('userId',response.data.userId);

          const userId1=localStorage.getItem('userId');
          // console.log(response.data.userId);
          if(!response.data)
          {
            
            navigate('/userProfile');
          }
          setSuccessMessage(response.data); // Assuming response.data is what you want to set
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      
      getUserByEmail(); // Call the function to fetch user data
    }, []);   

    const handleNavigation = () => {
        navigate("/");
      };
      const [value, setValue] = React.useState(0);

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      

   
  return (

    <div>
      {/* { getUserByEmail()} */}
         <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div"style={{float:'left',paddingRight:'5%'}} >
            Flight Booking 
            
          </Typography>
          <Button color="inherit" variant="h6" style={{paddingRight:'5%',marginLeft:'60%'}} onClick={handleNavigation}>Home</Button>
         
          <Button color="inherit" variant="h6"  style={{paddingRight:'5%'}} onClick={handleNavigation}>Logout</Button>
         
        </Toolbar>
      </AppBar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{marginTop:'3%'}}>
            Welcome To User Dashboard
             </Typography>
             
              <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Book Flight" {...a11yProps(0)} />
          <Tab label="View Available Flight" {...a11yProps(1)} />
          <Tab label="Cancel Booking" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <BookingComponent />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GetScheduledFlight/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <DeleteComponent/>
      </CustomTabPanel>
    </Box>

    </Box>
      
    </div>
  )
}

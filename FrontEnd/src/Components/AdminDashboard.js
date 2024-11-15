import { Button } from '@mui/material';
import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Avatar from '@mui/material/Avatar';

import { Link,useNavigate } from 'react-router-dom';
import FlightComponent from './FlightComponent/FlightComponent';
import ScheduleComponent from './ScheduleComponent/ScheduleComponent';
import AirportComponent from './AirportComponent/AirportComponent';
import ScheduledFlightComponent from './ScheduledComponent/ScheduledFlightComponent';

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
    const handleNavigation = () => {
        navigate("/");
      };
      const [value, setValue] = React.useState(0);

      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
  return (
    <div>
         <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" style={{float:'left',paddingRight:'5%'}}>
            Flight Booking 
            
          </Typography>
          <Button color="inherit" variant="h6" style={{paddingRight:'5%',marginLeft:'60%'}} onClick={handleNavigation}>Home</Button>
         
          <Button color="inherit" variant="h6"  style={{paddingRight:'5%'}} onClick={handleNavigation}>Logout</Button>
         
        </Toolbar>
      </AppBar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} style={{marginTop:'3%'}}>
            Welcome To Admin Dashboard
             </Typography>
             
              <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Add Flight" {...a11yProps(0)} />
          <Tab label="Schedule Flight" {...a11yProps(1)} />
          <Tab label="Add Airport" {...a11yProps(2)} />
          <Tab label="Scheduled Flight"{...a11yProps(3)}/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <FlightComponent/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ScheduleComponent/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AirportComponent/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ScheduledFlightComponent/>
      </CustomTabPanel>
    </Box>

    </Box>
      
    </div>
  )
}

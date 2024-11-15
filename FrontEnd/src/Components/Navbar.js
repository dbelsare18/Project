import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const navigate=useNavigate();
    const handleNavigation = () => {
        navigate("/login");
      };
      
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div"  style={{float:'left',paddingRight:'5%'}}>
            Flight Booking 
            
          </Typography>
          <Typography variant="h6" component="div" style={{paddingRight:'5%',marginLeft:'50%'}}>
           Home
          </Typography>
          <Typography variant="h6" component="div"  style={{paddingRight:'5%'}}>
           Aboutus
          </Typography>
          <Button color="inherit" variant="h6" style={{float:'right'}}onClick={handleNavigation}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

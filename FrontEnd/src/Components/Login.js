import React from 'react'
import SplitPane from 'react-split-pane';
import img from '../Images/flight_ap.jpg';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Typography, TextField, Button, Grid, Box } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = () => {
    let errors = {};

    if (!username) {
      errors['usernameError'] = 'User name is required.';
    }

    if (!password) {
      errors['passwordError'] = 'Password is required.';
    }

    setFormErrors(errors);
    const noErrors = Object.keys(errors).length === 0;

    if (noErrors) {
      const payload = {
        username: username,
        password: password,
      };

      axios
        .post('http://localhost:8082/auth/login', payload)
        .then((resp) => {
          console.log(resp);
          localStorage.setItem('token',resp.data);
          localStorage.setItem('username',username);
          
          toast.success('Login Success');
          console.log(jwtDecode(resp.data));
         localStorage.setItem("Role",jwtDecode(resp.data).userType);
         
          if(jwtDecode(resp.data).userType === "customer")
          {
            navigate('/userDashboard');
          }
          else{
            navigate('/adminDashboard');
          }
          
        })
        .catch((error) => {
          console.error(error);
          toast.error('login failed');
         
        });
    }
    else {
      toast.error("form contains Invalid data");
    }
  };

  return (
    <div>
      <SplitPane
          split="vertical"
          minSize={50}
          maxSize={300}
          defaultSize={100}  
        >
          <div ><img src={img} alt="Description of the image"  style={{height:'750px'}}/></div>
          <div style={{float:'right'}}>
      <Card sx={{
      marginTop: '15%',marginRight:'5%',boxShadow: '0px 0px 5px rgba(0,0,0,1)',
      }}>
      <CardContent>
      <ToastContainer position="top-center" autoClose={3000} />
        <Container maxWidth="sm">
          <Box display="flex" flexDirection="column" alignItems="center" mt={8}></Box>
          <Typography variant="h5" >Login</Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Email Address"
            type="email"
            fullWidth
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            error={Boolean(formErrors.usernameError)}
            helperText={formErrors.usernameError}
          >
            </TextField>
            <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={Boolean(formErrors.passwordError)}
            helperText={formErrors.passwordError}
          >

            </TextField>
        <Button variant="contained"
                  color="primary" style={{ marginTop: '5%' }}  onClick={handleLogin}>Login</Button>
        <Button variant="contained"
                  color="primary" style={{ marginTop: '5%', marginLeft: "60%" }}>Cancel </Button>
        <Grid container>
            <Grid item xs style={{marginTop:"5%",marginLeft:'5%'}}>
            Don't have an account? <Link to="/register">Register</Link>
            </Grid>
            <Grid item style={{marginTop:"5%"}}>
            <Link to="/resetPassword">ResetPassword</Link>
        
            </Grid>
          </Grid>
          </Box>
        </Container>
      </CardContent>
      </Card>
    </div>
        </SplitPane>
    </div>
  )
        }

import { CardContent, TextField } from "@mui/material";
import React from "react";
import { Container, Typography, Grid, Box } from "@material-ui/core";
import Card from "@mui/material/Card";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import profile from '../Images/profile1.png';
import { useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from 'react-bootstrap';
export default function UserProfile() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validatedata = (key, value) => {
    formErrors[key] = !value;
    console.log(formErrors[key], value);

  };
  const handleChange = (event) => {
    const target = event.target;
    if (target.checked) {
      setGender(target.value);
    }
  }
  const handleSubmit = (e, value) => {
   e.preventDefault();
    debugger
    let temp = {};

    temp["firstNameError"] = !firstName;
    temp["lastNameError"] = !lastName;
    temp["ageError"] = !age;
    temp["userPhone"] = !userPhone;

    // console.log(temp);
    setFormErrors(temp);

    const noErrors =
      Object.keys(temp).filter((x) => temp[x] === true).length === 0;
    // debugger;
    if (noErrors) {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        age: age,
        email: localStorage.getItem("username"),
        userPhone: userPhone,
      };

      const token = localStorage.getItem("token");
      axios.post("http://localhost:7065/user/save", payload
        , {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        })
        .then((resp) => {
          debugger
          const obj = {
            userId: resp.data.userId,
            firstName: resp.data.firstName,
            lastName: resp.data.lastName,
            gender: resp.data.gender,
            age: resp.data.age,
            email: resp.data.email,
            userPhone: resp.data.userPhone,
          };

          toast.success("Profile Save Successfully");
          navigate('/userDashboard');

        })
        .catch((error) => {
          toast.error("Profile Save failed");


        });
    } else {
      toast.error("form contains Invalid data");
    }
  };


  return (
    <div>
      <Card
        sx={{
          marginLeft: "20%",
          marginRight: "20%",
          marginTop: "5%",
          marginBottom: "1%",
          boxShadow: "0px 0px 10px rgba(0,0,0,1)",
        }}
      >
        <CardContent>
          <Container maxWidth="sm">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={8}
            ></Box>
            <div><img src={profile} alt="Description of the image" style={{ width: '10%', height: '5%' }} /></div>
            <Typography variant="h5">Add your Profile</Typography>
            {/* <form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="firstName"
                    variant="outlined"
                    margin="normal"
                   
                    value={firstName}
                    onChange={(event) => { setFirstName(event.target.value); validatedata("firstNameError", event.target.value)}}
                    error={formErrors.firstNameError}
                    helperText={formErrors.firstNameError ? "firstName is required" : ""}
                   required/>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="lastName"
                    variant="outlined"
                    margin="normal"
                    value={lastName}
                    onChange={(event) => { setLastName(event.target.value); validatedata("lastNameError", event.target.value)}}
                    error={formErrors.lastNameError}
                    helperText={formErrors.lastNameError ? "lastName is required" : ""} required />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
          
                <Grid item xs={6}>
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    margin="normal"
                    value={userPhone}
                    onChange={(event) => { setUserPhone(event.target.value);validatedata("userPhoneError", event.target.value) }}
                    error={formErrors.userPhoneError}
                    helperText={formErrors.userPhoneError? "Phone is required": ""}
                     required />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="age" variant="outlined" margin="normal"
                   value={age}
                   onChange={(event) => { setAge(event.target.value);validatedata("ageError", event.target.value) }}
                   error={formErrors.age}
                   helperText={formErrors.age ? "Age is required": ""}
                    required />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      style={{ marginLeft: "5%", marginTop: "2%" }}
                    >
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label="Female"
                        name="gender"
                        value="FeMale"
                        id="gender"
                        onChange={handleChange}
                      />
                      <FormControlLabel
                        control={<Radio />}
                        name="gender"
                        value="Male"
                        id="gender"
                        onChange={handleChange}
                        label="Male"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

              </Grid>

              <Grid container spacing={1}>
               
              </Grid>
              <Button type="submit" variant="contained" color="primary" style={{marginTop:'2%' }} onClick={handleSubmit}>
                Submit
              </Button>
              <Button type="submit" variant="contained" color="primary" href='/' style={{ marginLeft: "20%",marginTop:'2%' }}>
                Cancel 
              </Button>
            </form> */}


            <Form style={{marginTop:'5%'}}>
              <Row className="mb-3">
                <Col xs={6}>
                  <Form.Group controlId="firstName">
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(event) => { setFirstName(event.target.value); validatedata("firstNameError", event.target.value) }}
                      isInvalid={formErrors.firstNameError}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      First Name is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="lastName">
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(event) => { setLastName(event.target.value); validatedata("lastNameError", event.target.value) }}
                      isInvalid={formErrors.lastNameError}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Last Name is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6}>
                  <Form.Group controlId="userPhone">
                    <Form.Control
                      type="tel"
                      placeholder="Enter phone number"
                      style={{
                        backgroundColor: '#e3f2fd'
                      }}
                      value={userPhone}
                      onChange={(event) => { setUserPhone(event.target.value); validatedata("userPhoneError", event.target.value) }}
                      isInvalid={formErrors.userPhoneError}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Phone Number is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group controlId="age">
                    <Form.Control
                      type="number"
                      placeholder="Enter age"
                      value={age}
                      onChange={(event) => { setAge(event.target.value); validatedata("ageError", event.target.value) }}
                      isInvalid={formErrors.age}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Age is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12}>
                  <Form.Label>Gender</Form.Label>
                  <div className="d-flex justify-content-start" style={{ marginLeft: '35%' }}>
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      value="Female"
                      onChange={handleChange}
                      id="genderFemale"
                      className="me-3" // Add some margin to the right
                    />
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="gender"
                      value="Male"
                      onChange={handleChange}
                      id="genderMale"
                      className="me-3" // Add some margin to the right
                    />
                  </div>
                </Col>
              </Row>
              <Button variant="primary" type="submit" style={{ marginTop: '2%' }} onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant="secondary" href='/' style={{ marginLeft: "20%", marginTop: '2%' }}>
                Cancel
              </Button>
            </Form>
          </Container>
        </CardContent>
      </Card>
    </div>
  );
}

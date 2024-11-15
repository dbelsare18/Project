import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate(); // Hook to navigate
  const [formState, setFormState] = useState(0);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  // Function to handle password reset

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8082/auth/forgotpassword",
        { username }
      );
      setSuccessMessage(response.data);
      setOpenSnackbar(true);
      setOtpSent(true);

      setFormState(1);
    } catch (error) {
      const errorMsg = error.response?.data || "An error occurred";
      setErrorMessage(errorMsg);
      setOpenSnackbar(true);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post(
        "http://localhost:8082/auth/verifyOtp",
        { username, otp }
      );
      setSuccessMessage("Otp Verification is Successfull");
      setOpenSnackbar(true);
      setOtpSent(false);
      setOtp("");
      localStorage.setItem("otpToken",response.data);
      console.log(response.data);
      setFormState(2);
    } catch (error) {
      const errorMsg = error.response?.data || "An error occurred";
      setErrorMessage(errorMsg);
      setOpenSnackbar(true);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setOpenSnackbar(true);
      return;
    }

    try {
      // Assuming username is stored in localStorage after OTP verification
      const token = localStorage.getItem('otpToken'); 
      const response = await axios.post(
        "http://localhost:8082/auth/resetPassword",
        { username, password }
        , {
            headers: {
                Authorization: `Bearer ${token}`, // Set the Authorization header
            },
        }
      );
      setSuccessMessage(response.data);
      setOpenSnackbar(true);
      toast.success("ResetPassword Success");
      // Optionally navigate to a login page after successful reset
     // navigate("/login");
    } catch (error) {
      const errorMsg = error.response?.data || "An error occurred";
      setErrorMessage(errorMsg);
      setOpenSnackbar(true);
    }
  };

  // Function to close the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h5" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handleResetPassword}>
        {formState >= 0 ? (
          <div>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {formState == 0 ? (
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Send OTP
                </Button>
                <Button
                  variant="contained"
                  style={{ marginLeft: "60%" }}
                  href='/'
                >
                  Cancel
                </Button>
              </div>
            ) : null}
            {formState === 1 ? (
              <div>
                <form>
                  <TextField
                    label="Enter OTP"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP
                  </Button>
                  <Button
                    variant="contained"
                    style={{ marginLeft: "60%" }}
                    href='/'
                  >
                    Cancel
                  </Button>
                </form>
              </div>
            ) : formState === 2 ? (
              <div>
                <TextField
                  label="New Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                 <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleResetPassword}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  style={{ marginLeft: "60%" }}
                href='/'
                >
                  Cancel
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}

        <Grid container>
          <Grid item xs style={{ marginTop: "5%", marginLeft: "5%" }}>
            <Link to="/login">Login</Link>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={errorMessage ? "error" : "success"}
        >
          {errorMessage || successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ResetPassword;

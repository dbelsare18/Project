// import React from "react";
// import SplitPane from "react-split-pane";
// import img1 from "../Images/1.avif";
// import { TextField, Typography, Grid, Container, Button } from '@mui/material';
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import { useState } from "react";
// export default function Registration() {
//   const [username, setUsername] = useState("");
 
//   const [password, setPassword] = useState("");
 
//   const [formErrors, setFormErrors] = useState({});
 
//   const [msg, setMessage] = useState("");
 
//   const myStyle={
//     backgroundImage:`url(${img1})`,
//     backgroundSize:'cover',
//     backgroundRepeat:'no-reapeat',
//     height:'100vh'
//   }
//   const validatedata = (key, value) => {
//     formErrors[key] = !value;
//     console.log(formErrors[key], value);
//     if (key.toLowerCase().includes("username"))
//       formErrors["invalidMail"] = value && !/\S+@\S+\.\S+/.test(value);
//     if (key.toLowerCase().includes("password"))
//       formErrors["invalidpassword"] = value && value.length < 8;
//   };
 
//   const handleSubmit = (e, value) => {
//     let temp = {};
 
//     temp["userNameError"] = !username;
//     temp["invalidMail"] = username && !/\S+@\S+\.\S+/.test(username);
//     temp["passwordError"] = !password;
//      console.log(temp);
//     setFormErrors(temp);
 
//     const noErrors =
//       Object.keys(temp).filter((x) => temp[x] === true).length === 0;
   
//     if (noErrors) {
//       const payload = {
//         username: username,
//         password: password,
//       };
//       axios
//         .post("http://localhost:8082/auth/register", payload)
//         .then((resp) => {
//           // const obj = {
//           //   userId: resp.data.userId,
//           //   username: resp.data.username,
//           //   password: resp.data.password,
//           // };
//          // localStorage.setItem("mytoken", JSON.stringify(obj));
//           toast.success("Registration Success");
//           setMessage(resp.data);
//         })
//         .catch((error) => {
//           toast.error("Register failed");
 
//           setMessage(error.reponse.data);
//         });
//     } else {
//       toast.error("form contains Invalid data");
//     }
//   };
 
//   return (
//     <div>
//         <div style={myStyle}>
//         <div style={{ float: "right" }}>
//           <Card
//             sx={{
//               marginTop: "15%",
//               marginRight: "5%",
//             }}
//           >
//             <ToastContainer position="top-center" autoClose={3000} />
//             <CardContent>
//               <Container maxWidth="sm">
//                 <Typography variant="h5">Registration</Typography>
//                 <form>
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                     <TextField label="Email" variant="outlined" type="email" 
//                        value={username}
//                        onChange={(event) => {
//                         setUsername(event.target.value);
//                         validatedata("userNameError", event.target.value);
//                       }}
//                       error={formErrors.userNameError}
//                       helperText={
//                         formErrors.userNameError ? "Email is required" : ""
//                       }
                     
//                       required
//                       ></TextField>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField label="Password" variant="outlined" type="password"
//                        value={password} onChange={(event) => { setPassword(event.target.value); validatedata("passwordError", event.target.value) }}
//                         error={formErrors.passwordError}
//                         helperText={formErrors.passwordError ? "password is required" : (formErrors.invalidpassword ? "Password must have a minimum 8 characters" : "")}
//                        required
//                       ></TextField>
//                     </Grid>
//                   </Grid>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     style={{ marginTop: "5%" }}
//                     onClick={handleSubmit}
//                   >
//                     Register
//                   </Button>
 
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     style={{ marginTop: "5%", marginLeft: "15%" }}
//                     href='/'
//                   >
//                    Cancel
//                   </Button>
 
//                   <h5 align="center" style={{ marginTop: "5%" }}>
//                     Already have an account? <Link to="/login">Login</Link>
//                   </h5>
//                 </form>
//               </Container>
//             </CardContent>
//           </Card>
//         </div>
         
//         </div>
       
     
//     </div>
//   );
// }




import React from "react";
import SplitPane from "react-split-pane";
import img1 from "../Images/1.avif";
import { TextField, Typography, Grid, Container, Button } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
export default function Registration() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const [msg, setMessage] = useState("");

  const myStyle={
    backgroundImage:`url(${img1})`,
    backgroundSize:'cover',
    backgroundRepeat:'no-reapeat',
    height:'100vh'
  }
  const validatedata = (key, value) => {
    formErrors[key] = !value;
    console.log(formErrors[key], value);
    if (key.toLowerCase().includes("username"))
      formErrors["invalidMail"] = value && !/\S+@\S+\.\S+/.test(value);
    if (key.toLowerCase().includes("password"))
      formErrors["invalidpassword"] = value && value.length < 8;
  };

  const handleSubmit = (e, value) => {
    let temp = {};

    temp["userNameError"] = !username;
    temp["invalidMail"] = username && !/\S+@\S+\.\S+/.test(username);
    temp["passwordError"] = !password;
     console.log(temp);
    setFormErrors(temp);

    const noErrors =
      Object.keys(temp).filter((x) => temp[x] === true).length === 0;
    
    if (noErrors) {
      const payload = {
        username: username,
        password: password,
      };
      axios
        .post("http://localhost:8082/auth/register", payload)
        .then((resp) => {
          const obj = {
            userId: resp.data.userId,
            username: resp.data.username,
            password: resp.data.password,
          };
         // localStorage.setItem("mytoken", JSON.stringify(obj));
          toast.success("Registration Success");
          setMessage(resp.data);
        })
        .catch((error) => {
          toast.error("Register failed");

          setMessage(error.reponse.data);
        });
    } else {
      toast.error("form contains Invalid data");
    }
  };

  return (
    <div>
        <div style={myStyle}>
        <div style={{ float: "right" }}>
          <Card
            sx={{
              marginTop: "15%",
              marginRight: "5%",
            }}
          >
            <ToastContainer position="top-center" autoClose={3000} />
            <CardContent>
              <Container maxWidth="sm">
                <Typography variant="h5">Registration</Typography>
                <form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        style={{ marginTop: "5%" }}
                        onChange={(event) => {
                          setUsername(event.target.value);
                          validatedata("userNameError", event.target.value);
                        }}
                        error={formErrors.userNameError}
                        helperText={
                          formErrors.userNameError ? "Email is required" : ""
                        }
                        required
                      ></TextField>

                    </Grid>
                    <Grid item xs={12}>
                      <TextField label="Password" variant="outlined" type="password"
                       value={password} onChange={(event) => { setPassword(event.target.value); validatedata("passwordError", event.target.value) }}
                        error={formErrors.passwordError}
                        helperText={formErrors.passwordError ? "password is required" : (formErrors.invalidpassword ? "Password must have a minimum 8 characters" : "")}
                       required
                      ></TextField>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "5%" }}
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginTop: "5%", marginLeft: "15%" }}
                    href='/'
                  >
                   Cancel
                  </Button>

                  <h5 align="center" style={{ marginTop: "5%" }}>
                    Already have an account? <Link to="/login">Login</Link>
                  </h5>
                </form>
              </Container>
            </CardContent>
          </Card>
        </div>
          
        </div>
       
      
    </div>
  );
}


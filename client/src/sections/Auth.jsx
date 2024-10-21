import * as React from "react";
import axios from 'axios';
import createThemeNoVars from '@mui/material/styles/createThemeNoVars';
import {
  Button,
  Container,
  TextField,
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Card,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import TextFieldIndex from "../components/TextFieldIndex";
import ButtonIndex from "../components/ButtonIndex";
import SelectFieldIndex from "../components/SelectFieldIndex";
import '../index.css';

import Cookies from 'js-cookie';

import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isBusiness, setIsBusiness] = useState(false); // To track if business form is completed
  const [error, setError] = useState({
    emailError: false,
    usernameError: false,
    passwordError: false,
    message: "",
  });

  const [businessType, setBusinessType] = React.useState(0);
  const businessOptions = [
    { value: 0, label: 'Ninguna' },
    { value: 1, label: 'Empresa' },
    { value: 2, label: 'Granja o Sector agro' },
    { value: 3, label: 'Entidad sin animo de lucro' },
  ];

  const handleBusinessTypeChange = (event) => {
    setBusinessType(Number(event.target.value)); // Convert to number
  };


  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre Login y Registro

  // Defining the steps
  const steps = ["Datos Básicos", "Seguridad", "Mi Negocio"];

  const isStepOptional = (step) => {
    return step === 2; // Only the last step is optional
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const validateUsername = (username) => {
    return username.length >= 3;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Prevent default form submission on "Go" or similar actions
  const handleFormSubmit = (event) => {
    console.log("AA");
    event.preventDefault(); // Prevent form submission
    handleNext(); // Move to the next step
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === 0 && !validateEmail(email)) {
      setError({ ...error, emailError: true, message: "Email Invalido" });
      return;
    }

    if (activeStep === 0 && !validateUsername(username)) {
      setError({ ...error, usernameError: true, message: "Usuario Invalido" });
      return;
    }

    if (activeStep === 1 && !validatePassword(password)) {
      setError({
        ...error,
        passwordError: true,
        message: "La contraseña debe tener al menos 6 caracteres",
      });
      return;
    }

    setError({
      emailError: false,
      usernameError: false,
      passwordError: false,
      message: "",
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleRegister = async () => {
    if (businessType === 0) {
      setBusinessType(0); // Ensure it stays as 0 if no selection is made
    }

    const clientData = {
      User_Name: username,
      Email: email,
      Password: password,
      Role: 'client',
    };
    const adminData = {
      User_Name: username,
      Email: email,
      Password: password,
      Role: 'admin',
      Business_Name: isBusiness ? businessName : undefined,
      Business_Type: isBusiness ? businessType : undefined,
      Business_City: isBusiness ? 'None' : undefined,
      Business_Address: isBusiness ? 'None' : undefined,
      Business_Hours: isBusiness ? 'None' : undefined,
      Business_Localization: isBusiness ? 'None' : undefined
    };

    // Ensure businessName exists before setting isBusiness to true
    if (businessName) {
      setIsBusiness(true);

      try {
        const response = await axios.post('http://localhost:5000/auth/register', adminData, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('User registered successfully:', response.data);
        toggleForm();

      } catch (error) {
        console.error('Error registering user:', error.response ? error.response.data : error.message);
      }
    } else {
      setIsBusiness(false);

      try {
        const response = await axios.post('http://localhost:5000/auth/register', clientData, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('User registered successfully:', response.data);
        toggleForm();

      } catch (error) {
        console.error('Error registering user:', error.response ? error.response.data : error.message);
      }
    }

    console.log('Registering with businessType:', businessType);

  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      setError({
        emailError: false,
        passwordError: false,
        message: "",
      });

      try {

        const response = await axios.post('http://localhost:5000/auth/login', { Email: email, Password: password });

        if (response.data) {
          console.log("Login Successful");

          const userInfo = {
            Role: response.data.Role,
            GS1_PK: response.data.GS1_PK,
            PK: response.data.PK
          }
          Cookies.set('user', JSON.stringify(userInfo), { expires: 1 }); // Cookie expires in 1 day

          if (userInfo.Role == "admin") {
            const encodedGS1_PK = encodeURIComponent(userInfo.GS1_PK);
            navigate(`/admin/businesses/${encodedGS1_PK}`);
          } else if (userInfo.Role == "client") {
            navigate('/businesses');
          }


        } else {
          setError({
            emailError: true,
            passwordError: true,
            message: "Invalid Email/Password",
          });
          console.log(response.data);
        }
      } catch (error) {
        console.error("Login attempt failed:", error);
        setError({
          emailError: true,
          passwordError: true,
          message: "Login failed, please try again",
        });
      }

    } else {
      setError({
        emailError: !isEmailValid,
        passwordError: !isPasswordValid,
        message: isEmailValid
          ? "Password must be at least 6 characters"
          : "Invalid Email",
      });
    }
  };

  const toggleForm = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setBusinessName("");
    setBusinessType("");
    handleReset();
    setIsLogin(!isLogin);
  };

  return (
    <div className="authgradient" style={{ height: '100vh', width: '100vw' }}>
      <Container maxWidth={false}>
        <Grid item xs={1} sm={1} md={1}>
          {isLogin ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  px: { xs: 1, sm: 2, md: 4, lg: 8 }, // Responsive horizontal padding
                  py: { xs: 1, sm: 2 }, // Responsive vertical padding
                }}
              >
                <Card variant="outlined" sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      padding: 3,
                      height: "auto", // Allow height to adjust based on content
                      "@media (max-width:600px)": {
                        padding: 2, // Reduce padding on smaller screens
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        mb: 2,
                        fontFamily: "Roboto",
                        fontWeight: "bold",
                        fontSize: { xs: "1.5rem", sm: "2rem" }, // Responsive font size
                      }}
                    >
                      ¡Bienvenido de vuelta!
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
                        fontFamily: "Roboto",
                        textAlign: "center",
                        lineHeight: 1.5,
                      }}
                    >
                      Gracias por tu ayuda para combatir el desperdicio de comida.
                      A continuación, ingresa tus datos para iniciar sesión.
                    </Typography>
                  </Box>
                  <Box component="form" onSubmit={handleSubmit}>
                    <TextFieldIndex
                      id="email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      size="small" // Makes the TextField smaller
                      topText="Email"
                      width="100%"
                      fontFamily='Epilogue'
                      sx={{ mt: 2, mb: 2 }} // Adjusting margins to be a bit smaller
                      inputProps={{ style: { fontSize: 15 } }} // font size of input text
                      InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                      fullWidth
                      required
                      helperText={error.emailError ? error.message : ""}
                      error={error.emailError}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextFieldIndex
                      id="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      size="small" // Makes the TextField smaller
                      topText="Contraseña"
                      width="100%"
                      fontFamily='Epilogue'
                      sx={{ mt: 2, mb: 2 }} // Adjusting margins to be a bit smaller
                      inputProps={{ style: { fontSize: 15 } }} // font size of input text
                      InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                      fullWidth
                      required
                      helperText={error.passwordError ? error.message : ""}
                      error={error.passwordError}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <ButtonIndex
                      type="submit"
                      variant="outlined"
                      width="100%"
                      marginTop={4}
                      fontFamily='Epilogue'
                    >
                      INICIAR SESIÓN
                    </ButtonIndex>
                  </Box>
                  <Button
                    onClick={toggleForm}
                    variant="text"
                    color="black" // Note: 'black' should be lowercase
                    sx={{
                      mt: 2,
                      fontWeight: "bold", // Apply bold font weight
                      fontFamily: 'Epilogue',
                      textDecoration: "underline", // Apply underline to the text
                      textTransform: "none", // Prevent text from being uppercase (default behavior in Material-UI buttons)
                      color: "#000000", // Ensure the text color is black
                    }}
                  >
                    ¿No tienes una cuenta? Únete a nosotros
                  </Button>
                </Card>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                  px: { xs: 1, sm: 2, md: 4, lg: 8 }, // Responsive horizontal padding
                  py: { xs: 1, sm: 2 }, // Responsive vertical padding
                }}
              >
                <Card variant="outlined" sx={{ p: 3, maxWidth: 600, mx: "auto", overflow: 'auto' }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      padding: 3,
                      height: "auto", // Allow height to adjust based on content
                      "@media (max-width:600px)": {
                        padding: 2, // Reduce padding on smaller screens
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        mb: 2,
                        fontFamily: "Epilogue",
                        fontWeight: "bold",
                        fontSize: { xs: "1.5rem", sm: "2rem" }, // Responsive font size
                      }}
                    >
                      Únete al cambio
                    </Typography>
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
                        fontFamily: "Epilogue",
                        textAlign: "center",
                        lineHeight: 1.5,
                      }}
                    >
                      Puedes ayudar a reducir el desperdicio de comida, elige tu
                      rol para empezar.
                    </Typography>
                  </Box>
                  <Stepper activeStep={activeStep} sx={{ overflowX: 'auto' }}>
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};
                      if (isStepOptional(index)) {
                        labelProps.optional = (
                          <Typography variant="caption">(Opcional)</Typography>
                        );
                      }
                      if (isStepSkipped(index)) {
                        stepProps.completed = false;
                      }
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>

                  {activeStep === steps.length ? (
                    <React.Fragment>
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{
                          mt: 2,
                          mb: 1,
                          mr: 5,
                          ml: 5,
                          fontSize: { xs: "0.875rem", sm: "1rem" }, // Responsive font size
                          fontFamily: "Roboto",
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "#212121",
                          lineHeight: 1.5,
                        }}
                      >
                        Todos los pasos completados, dale al boton de Finalizar
                        para completar el registro
                      </Typography>
                      <Button
                        color="inherit"
                        onClick={handleRegister}
                        sx={{
                          mt: 1,
                          ml: 1,
                          backgroundColor: "#4C956C", // Background color
                          color: "#F2F6FC", // Font color
                          borderRadius: "50px", // Round only the left and right corners (pill shape)
                          minWidth: 0, // Removes default min width
                          padding: "8px 24px", // Adjust padding as needed
                          width: "auto", // Use the width prop or default to auto
                          marginTop: 2, // Apply the marginTop prop or default to 0
                          "&:hover": {
                            backgroundColor: "#357a38", // Slightly darker green on hover (optional)
                          },
                          fontWeight: "bold", // Bold font weight
                          textTransform: "none", // Prevents text from being transformed to uppercase
                          fontSize: "18px",
                        }}
                      >
                        FINALIZAR
                      </Button>
                      <Button
                        color="inherit"
                        onClick={handleReset}
                        sx={{
                          mt: 1,
                          ml: 1,
                          backgroundColor: "#4C956C", // Background color
                          color: "#F2F6FC", // Font color
                          borderRadius: "50px", // Round only the left and right corners (pill shape)
                          minWidth: 0, // Removes default min width
                          padding: "8px 24px", // Adjust padding as needed
                          width: "auto", // Use the width prop or default to auto
                          marginTop: 2, // Apply the marginTop prop or default to 0
                          "&:hover": {
                            backgroundColor: "#357a38", // Slightly darker green on hover (optional)
                          },
                          fontWeight: "bold", // Bold font weight
                          textTransform: "none", // Prevents text from being transformed to uppercase
                          fontSize: "18px",
                        }}
                      >
                        REINICIAR FORMULARIO
                      </Button>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
                        {activeStep === 0 && (
                          <div>
                            <TextFieldIndex
                              id="email"
                              label="Email"
                              type="email"
                              variant="outlined"
                              size="small" // Makes the TextField smaller
                              topText="Email"
                              width="100%"
                              fontFamily='Epilogue'
                              sx={{ mt: 2, mb: 2 }} // Adjusting margins to be a bit smaller
                              inputProps={{ style: { fontSize: 15 } }} // font size of input text
                              InputLabelProps={{ style: { fontSize: 16 } }} // font size of input label
                              fullWidth
                              required
                              helperText={error.emailError ? error.message : ""}
                              error={error.emailError}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextFieldIndex
                              id="username"
                              label="Usuario"
                              type="username"
                              size="small" // Makes the TextField smaller
                              topText="Usuario"
                              width="100%"
                              fontFamily='Epilogue'
                              sx={{ mt: 2, mb: 2 }} // Adjusting margins to be a bit smaller
                              inputProps={{ style: { fontSize: 14 } }} // font size of input text
                              InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
                              fullWidth
                              required
                              helperText={
                                error.usernameError ? error.message : ""
                              }
                              error={error.usernameError}
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                        )}
                        {activeStep === 1 && (
                          <TextFieldIndex
                            id="password"
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            size="small" // Makes the TextField smaller
                            topText="Contraseña"
                            width="100%"
                            fontFamily='Epilogue'
                            sx={{ mt: 2, mb: 2 }} // Adjusting margins to be a bit smaller
                            inputProps={{ style: { fontSize: 14 } }} // font size of input text
                            InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
                            fullWidth
                            required
                            helperText={error.passwordError ? error.message : ""}
                            error={error.passwordError}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        )}
                        {activeStep === 2 && (
                          <div>
                            <Typography
                              sx={{
                                color: 'red', // Set the text color to red
                                textAlign: 'center', // Center the text
                                textDecoration: 'underline', // Underline the text
                                mb: 2 // Optional: Add some bottom margin
                              }}
                            >
                              DEJAR VACIO SI NO TE ESTÁS REGISTRANDO COMO UN NEGOCIO
                            </Typography>
                            <TextFieldIndex
                              id="businessName"
                              label="Nombre del Negocio"
                              type="text"
                              variant="outlined"
                              size="small" // Makes the TextField smaller
                              topText="Nombre del Negocio"
                              width="100%"
                              fontFamily='Epilogue'
                              sx={{ mt: 2, mb: 2 }} // Adjusting margins to be a bit smaller
                              inputProps={{ style: { fontSize: 14 } }} // font size of input text
                              InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
                              fullWidth
                              //helperText="Dejar vacio si no te estas registrando como un negocio"
                              value={businessName}
                              onChange={(e) => setBusinessName(e.target.value)}
                            />
                            <SelectFieldIndex
                              label="Tipo de Negocio"
                              size="small"
                              topText="Seleccione el tipo de negocio"
                              width="100%"
                              fontFamily='Epilogue'
                              required
                              value={businessType}
                              onChange={handleBusinessTypeChange}
                              options={businessOptions}
                              helperText={error.businessTypeError ? error.message : ""}
                              error={error.businessTypeError}
                            />
                          </div>
                        )}
                      </Box>

                      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{
                            mr: 0,
                            backgroundColor:
                              activeStep === 0 ? "#d3d3d3" : "#4C956C", // Disabled color vs. normal color
                            color: activeStep === 0 ? "#a9a9a9" : "#F2F6FC", // Disabled text color vs. normal text color
                            borderRadius: "50px",
                            minWidth: 0,
                            padding: "8px 24px",
                            width: "auto",
                            marginTop: 0,
                            "&:hover": {
                              backgroundColor:
                                activeStep === 0 ? "#d3d3d3" : "#357a38", // Hover color for disabled and enabled states
                            },
                            fontWeight: "bold",
                            textTransform: "none",
                            fontSize: "18px",
                            // Styling for disabled state
                            "&.Mui-disabled": {
                              opacity: 0.6,
                              cursor: "not-allowed",
                            },
                          }}
                        >
                          ATRÁS
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        {isStepOptional(activeStep) && (
                          <Button
                            color="inherit"
                            onClick={handleSkip}
                            sx={{ mr: 1 }}
                          >
                            Skip
                          </Button>
                        )}

                        <Button
                          color="inherit"
                          onClick={handleNext}
                          sx={{
                            mr: 0,
                            backgroundColor: "#4C956C", // Background color
                            color: "#F2F6FC", // Font color
                            borderRadius: "50px", // Round only the left and right corners (pill shape)
                            minWidth: 0, // Removes default min width
                            padding: "8px 24px", // Adjust padding as needed
                            width: "auto", // Use the width prop or default to auto
                            marginTop: 0, // Apply the marginTop prop or default to 0
                            "&:hover": {
                              backgroundColor: "#357a38", // Slightly darker green on hover (optional)
                            },
                            fontWeight: "bold", // Bold font weight
                            textTransform: "none", // Prevents text from being transformed to uppercase
                            fontSize: "18px",
                          }}
                        >
                          {activeStep === steps.length - 1
                            ? "FINALIZAR"
                            : "SIGUIENTE"}
                        </Button>
                      </Box>
                    </React.Fragment>
                  )}
                  <br />
                  <Button
                    onClick={toggleForm}
                    variant="text"
                    color="black" // Note: 'black' should be lowercase
                    fontFamily='Epilogue'
                    sx={{
                      mt: 2,
                      fontWeight: "bold", // Apply bold font weight
                      fontFamily: 'Epilogue',
                      textDecoration: "underline", // Apply underline to the text
                      textTransform: "none", // Prevent text from being uppercase (default behavior in Material-UI buttons)
                      color: "#000000", // Ensure the text color is black
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                </Card>
              </Box>
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
}

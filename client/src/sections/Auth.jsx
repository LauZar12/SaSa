import * as React from "react";
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

export default function Auth() {
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

  const [businessType, setBusinessType] = React.useState('');

  const handleBusinessTypeChange = (event) => {
    setBusinessType(event.target.value);
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

  const handleRegister = () => {
    console.log("Email: " + email);
    console.log("Username: " + username);
    console.log("Password: " + password);
    console.log("Business Name: " + businessName);
    console.log("Business Type: " + businessType);

    if (businessName) {
      setIsBusiness(true);
      console.log("Registered as a business");
    } else {
      setIsBusiness(false);
      console.log("Registered as client");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      setError({
        emailError: false,
        passwordError: false,
        message: "",
      });
      console.log("Login Successful");
      // Verificación de usuario y contraseña con DynamoDB se realizará aquí
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
                  >
                    Iniciar Sesion
                  </ButtonIndex>
                </Box>
                <Button
                  onClick={toggleForm}
                  variant="text"
                  color="black" // Note: 'black' should be lowercase
                  sx={{
                    mt: 2,
                    fontWeight: "bold", // Apply bold font weight
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
                      fontFamily: "Roboto",
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
                      fontFamily: "Roboto",
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
                          backgroundColor: "#418441", // Background color
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
                      Finalizar
                    </Button>
                    <Button
                        color="inherit"
                        onClick={handleReset}
                        sx={{
                          mt: 1,
                          ml: 1,
                          backgroundColor: "#418441", // Background color
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
                      Reiniciar Formulario
                    </Button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Box component="form" sx={{ mt: 3 }}>
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
                          <TextFieldIndex
                            id="businessName"
                            label="Nombre del Negocio"
                            type="text"
                            variant="outlined"
                            size="small" // Makes the TextField smaller
                            topText="Nombre del Negocio"
                            width="100%"
                            sx={{ mt: 2, mb: 2 }} // Adjusting margins to be a bit smaller
                            inputProps={{ style: { fontSize: 14 } }} // font size of input text
                            InputLabelProps={{ style: { fontSize: 15 } }} // font size of input label
                            fullWidth
                            helperText="Dejar vacio si no te estas registrando como un negocio"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                          />
                          <SelectFieldIndex
                            label="Tipo de Negocio"
                            size="small"
                            topText="Seleccione el tipo de negocio"
                            width="100%"
                            required
                            value={businessType}
                            onChange={handleBusinessTypeChange}
                            options={[
                                { value: '', label: 'Ninguna' },
                                { value: 0, label: 'Empresa' },
                                { value: 1, label: 'Granja o Sector agro' },
                                { value: 2, label: 'Entidad sin animo de lucro' },
                            ]}
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
                            activeStep === 0 ? "#d3d3d3" : "#418441", // Disabled color vs. normal color
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
                        Atrás
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
                          backgroundColor: "#418441", // Background color
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
                          ? "Finalizar"
                          : "Siguiente"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
                <br/>
                <Button
                  onClick={toggleForm}
                  variant="text"
                  color="black" // Note: 'black' should be lowercase
                  sx={{
                    mt: 2,
                    fontWeight: "bold", // Apply bold font weight
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

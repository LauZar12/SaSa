import * as React from 'react';
import { Box, Typography, Button, Container, Divider } from '@mui/material';
import ButtonIndex from '../components/ButtonIndex';
import Logo2 from '../assets/images/Logo Sasa-2.png';
import '../index.css';
import { useNavigate } from 'react-router-dom';

// Import your logo image
import Logo from '../assets/images/Logo-SaSa-1.png';
import Help from '../assets/images/HELP.png';
import Porvenir from '../assets/images/ContactImages/Donations/El Porvenir.webp';

export default function Home() {
    const navigate = useNavigate();

    return (
        <Container
            maxWidth="100%"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '100vh',
                padding: 0,
                margin: 0,
            }}
        >
            {/* Top bar */}
            <Box
                sx={{
                    bgcolor: '#4C956C',
                    mb: 30,
                    height: '80px',
                    width: '100%',
                    top: 0,
                    left: 0,
                    p: 0,
                    overflow: 'hidden',
                    position: 'fixed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}
            >
                <img src={Logo2} alt="Logo" style={{ height: '50px', cursor: 'pointer' }} />
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'row', // Change to row for horizontal layout
                    justifyContent: 'space-between', // Adjust as needed
                    padding: 2, // Add padding for spacing
                }}
            >
                {/* Left Column (Logo) */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: {
                            xs: '0%', // Para pantallas pequeñas
                            sm: '0%', // Para pantallas medianas
                            md: '40%', // Para pantallas más grandes
                            lg: '40%', // Para pantallas muy grandes
                            xl: '40%', // Para pantallas extremadamente grandes
                        },
                    }}
                >
                    <img src={Logo} alt="Logo" style={{ width: '100%', height: 'auto' }} />
                </Box>

                {/* Right Column (Text and Buttons) */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        //alignItems: 'flex-start', // Align content to the left
                        justifyContent: 'center',
                        padding: 2,
                        ml: {
                            xs: 0,
                            sm: 0,
                            md: 10,
                            lg: 10,
                            xl: 10,
                        },
                        width: {
                            xs: '100%',
                            sm: '100%',
                            md: '60%',
                            lg: '60%',
                            xl: '60%',
                        },
                    }}
                >

                    {/* Welcome Message */}
                    <Typography variant="h1" component="div" sx={{
                        mb: 0,
                        color: '#4AD66D',
                        fontWeight: 'bold',
                        fontFamily: 'Epilogue',
                        fontSize: { xs: '44px', sm: '62px', md: '76px', lg: '78px', xl: '86px' },
                        justifyContent: {
                            xs: 'center',
                            sm: 'center',
                            md: 'left',
                            lg: 'left',
                            xl: 'left',
                        },
                        textAlign: {
                            xs: 'center',
                            sm: 'center',
                            md: 'left',
                            lg: 'left',
                            xl: 'left',
                        },
                        width: '100%'
                    }}>
                        Bienvenido a <span style={{ color: '#418441' }}>SaSa</span>
                    </Typography>

                    <Typography
                        sx={{
                            mt: 0,
                            mb: 1,
                            color: '#737373',
                            fontWeight: 'bold',
                            fontFamily: 'Epilogue',
                            fontSize: { xs: '14px', sm: '20px', md: '24px', lg: '24px', xl: '30px' },
                            fontStyle: 'italic',
                            fontFamily: 'Epilogue',
                            lineHeight: 1.2,
                            display: 'flex',
                            justifyContent: {
                                xs: 'center',
                                sm: 'center',
                                md: 'left',
                                lg: 'left',
                                xl: 'left',
                            },
                            textAlign: {
                                xs: 'center',
                                sm: 'center',
                                md: 'left',
                                lg: 'left',
                                xl: 'left',
                            },
                            width: '100%'
                        }}
                    >
                        Salvar con sabor
                    </Typography>

                    <Box sx={{
                        backgroundColor: '#4C956C',
                        height: '10px',
                        width: {
                            xs: '100%',
                            sm: '100%',
                            md: '90%',
                            lg: '90%',
                            xl: '90%',
                        },
                        mt: 1,
                        mb: 2,
                    }}></Box>

                    <Typography
                        sx={{
                            mt: 7,
                            mb: 7,
                            color: '#737373',
                            fontWeight: 'normal',
                            fontFamily: 'Epilogue',
                            fontSize: { xs: '15px', sm: '15px', md: '19px', lg: '19px', xl: '25px' },
                            lineHeight: 1.2,
                            display: 'flex',
                            justifyContent: {
                                xs: 'center',
                                sm: 'center',
                                md: 'left',
                                lg: 'left',
                                xl: 'left',
                            },
                            textAlign: {
                                xs: 'center',
                                sm: 'center',
                                md: 'left',
                                lg: 'left',
                                xl: 'left',
                            },
                            width: {
                                xs: '100%',
                                sm: '100%',
                                md: '80%',
                                lg: '80%',
                                xl: '80%',
                            },
                        }}
                    >
                        ¡Haz parte de este movimiento para luchar contra el desperdicio de comida de la forma más deliciosa posible!
                    </Typography>

                    {/* Call to Action 
                    <Typography variant="h6" sx={{ mt: 10, mb: 2, color: '#4C956C', fontWeight: 'bold', fontSize: { xs: '14px', sm: '20px', md: '24px', lg: '24px', xl: '30px' } }}>
                        ¡Haz click para cambiar el mundo!
                    </Typography> */}
                    <ButtonIndex variant="contained" padding="12px 20px" borderRadius="50px" backgroundColor="#4C956C" fontFamily='Epilogue'
                        width={{
                            xs: '100%',
                            sm: '100%',
                            md: '60%',
                            lg: '50%',
                            xl: '40%',
                        }}
                        fontSize={{
                            xs: '15px', sm: '15px', md: '19px', lg: '19px', xl: '25px'
                        }}
                        onClick={() => navigate('/businesses')}
                        sx={{
                            justifyContent: {
                                xs: 'center',
                                sm: 'center',
                                md: 'left',
                                lg: 'left',
                                xl: 'left',
                            },
                            textAlign: {
                                xs: 'center',
                                sm: 'center',
                                md: 'left',
                                lg: 'left',
                                xl: 'left',
                            },
                        }}>
                        Ver Restaurantes
                    </ButtonIndex>
                    <br />
                    <ButtonIndex variant="contained" padding="12px 20px" borderRadius="50px" backgroundColor="#737373" fontFamily='Epilogue'
                        width={{
                            xs: '100%',
                            sm: '100%',
                            md: '60%',
                            lg: '50%',
                            xl: '40%',
                        }}
                        fontSize={{
                            xs: '15px', sm: '15px', md: '19px', lg: '19px', xl: '25px'
                        }}
                        onClick={() => navigate('/auth')}
                        sx={{
                            justifyContent: {
                                xs: 'center',
                                sm: 'center',
                                md: 'left',
                                lg: 'left',
                                xl: 'left',
                            },
                            textAlign: {
                                xs: 'center',
                                sm: 'center',
                                md: 'left',
                                lg: 'left',
                                xl: 'left',
                            },
                        }}>
                        Iniciar Sesión
                    </ButtonIndex>

                </Box>
            </Box>

            {/* Bottom bar */}
            <Box
                sx={{
                    bgcolor: '#4C956C',
                    height: '50px',
                    width: '120%',
                    bottom: 0, // Position at the bottom of the page
                    position: 'fixed',
                    ml: '-10%',
                    p: 0,
                }}
            >
                {/* Your content here */}
            </Box>
        </Container>
    );
}


export function NotHome() {
    return (
        <Container
            maxWidth="100%"

            sx={{
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '100vh',
                padding: 0,
                margin: 0,
            }}
        >


            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                {/* Welcome Message */}
                <Typography variant="h1" component="div" sx={{ mb: 2, color: '#4AD66D', fontFamily: 'Epilogue', fontWeight: 'bold', fontSize: { xs: '44px', sm: '62px', md: '80px', lg: '88px', xl: '96px' } }}>
                    Bienvenido a <span style={{ color: '#418441' }}>SaSa</span>
                </Typography>

                <Typography
                    sx={{
                        mt: 1,
                        mb: 1,
                        color: '#737373',
                        fontWeight: 'bold',
                        fontFamily: 'Epilogue',
                        fontSize: { xs: '14px', sm: '20px', md: '24px', lg: '24px', xl: '30px' },
                        lineHeight: 1.2,
                        display: 'flex',
                        justifyContent: 'center',
                        width: {
                            xs: '90%', // Para pantallas pequeñas
                            sm: '80%', // Para pantallas medianas
                            md: '70%', // Para pantallas más grandes
                            lg: '60%', // Para pantallas muy grandes
                            xl: '35%', // Para pantallas extremadamente grandes
                        },
                    }}
                >
                    ¡Haz parte de este movimiento para luchar contra el desperdicio de comida de la forma más deliciosa posible!
                </Typography>

                {/* Call to Action */}
                <Typography variant="h6" sx={{ mt: 10, mb: 2, color: '#4C956C', fontFamily: 'Epilogue', fontWeight: 'bold', fontSize: { xs: '14px', sm: '20px', md: '24px', lg: '24px', xl: '30px' } }}>
                    ¡Haz click para cambiar el mundo!
                </Typography>
                <ButtonIndex variant="contained" padding="10px 20px" fontSize="40px" borderRadius="15px" width="25%">
                    Comenzar
                </ButtonIndex>
            </Box>

            {/* Bottom bar */}
            <Box
                sx={{
                    bgcolor: '#4C956C',
                    height: '50px',
                    width: '120%',
                    ml: '-10%',
                    p: 0, // Remove box padding
                    overflow: 'hidden',
                    position: 'fixed'
                }}
            />
        </Container>
    );
}

//import React from 'react';
//import { Box, Typography, Container } from '@mui/material';
//import ButtonIndex from '../components/ButtonIndex';
//import Logo2 from '../assets/images/Logo Sasa-2.png';
//import Logo from '../assets/images/Logo Sasa-1.png';
//import '../index.css';
//import { useNavigate } from 'react-router-dom';
//
//export default function Home() {
//  const navigate = useNavigate();
//
//  return (
//    <Container
//      maxWidth="xl"
//      sx={{
//        display: 'flex',
//        flexDirection: 'column',
//        justifyContent: 'space-between',
//        minHeight: '100vh',
//        padding: 0,
//      }}
//    >
//      {/* Barra superior */}
//      <Box
//        sx={{
//          bgcolor: '#4C956C',
//          height: '80px',
//          position: 'fixed',
//          top: 0,
//          left: 0,
//          width: '100%',
//          display: 'flex',
//          alignItems: 'center',
//          justifyContent: 'center',
//          zIndex: 10,
//        }}
//      >
//        <img
//          src={Logo2}
//          alt="Logo SaSa"
//          style={{ height: '50px', cursor: 'pointer' }}
//          onClick={() => navigate('/')}
//        />
//      </Box>
//
//      {/* Contenido principal */}
//      <Box
//        sx={{
//          flexGrow: 1,
//          display: 'flex',
//          flexDirection: { xs: 'column', md: 'row' },
//          alignItems: 'center',
//          justifyContent: 'space-between',
//          mt: '80px', // Compensa la barra superior
//          padding: { xs: '20px', md: '40px' },
//          gap: { xs: 4, md: 0 },
//        }}
//      >
//        {/* Columna izquierda */}
//        <Box
//          sx={{
//            display: { xs: 'none', md: 'flex' },
//            justifyContent: 'center',
//            alignItems: 'center',
//            width: '40%',
//          }}
//        >
//          <img src={Logo} alt="Logo principal SaSa" style={{ width: '80%', maxHeight: '100%' }} />
//        </Box>
//
//        {/* Columna derecha */}
//        <Box
//          sx={{
//            width: { xs: '100%', md: '60%' },
//            display: 'flex',
//            flexDirection: 'column',
//            alignItems: { xs: 'center', md: 'flex-start' },
//            textAlign: { xs: 'center', md: 'left' },
//            gap: 2,
//          }}
//        >
//          <Typography
//            variant="h1"
//            sx={{
//              color: '#4AD66D',
//              fontWeight: 'bold',
//              fontFamily: 'Epilogue',
//              fontSize: { xs: '44px', sm: '62px', md: '76px', xl: '86px' },
//              lineHeight: 1.2,
//            }}
//          >
//            Bienvenido a <span style={{ color: '#418441' }}>SaSa</span>
//          </Typography>
//
//          <Typography
//            sx={{
//              color: '#737373',
//              fontWeight: 'bold',
//              fontStyle: 'italic',
//              fontFamily: 'Epilogue',
//              fontSize: { xs: '14px', sm: '20px', md: '24px', xl: '30px' },
//              lineHeight: 1.5,
//            }}
//          >
//            Salvar con sabor
//          </Typography>
//
//          <Box
//            sx={{
//              width: '100%',
//              maxWidth: '90%',
//              height: '10px',
//              backgroundColor: '#4C956C',
//              borderRadius: '5px',
//              my: 2,
//            }}
//          />
//
//          <Typography
//            sx={{
//              color: '#737373',
//              fontFamily: 'Epilogue',
//              fontSize: { xs: '15px', md: '19px', xl: '25px' },
//              lineHeight: 1.8,
//              maxWidth: '90%',
//            }}
//          >
//            ¡Haz parte de este movimiento para luchar contra el desperdicio de comida de la forma
//            más deliciosa posible!
//          </Typography>
//
//          {/* Botones */}
//          <Box
//            sx={{
//              display: 'flex',
//              flexDirection: 'column',
//              gap: 2,
//              width: '100%',
//              maxWidth: { xs: '100%', md: '60%' },
//            }}
//          >
//            <ButtonIndex
//              variant="contained"
//              sx={{
//                padding: '12px 20px',
//                borderRadius: '50px',
//                backgroundColor: '#4C956C',
//                fontFamily: 'Epilogue',
//                fontSize: { xs: '15px', xl: '20px' },
//                width: '100%',
//              }}
//              onClick={() => navigate('/businesses')}
//            >
//              Ver Restaurantes
//            </ButtonIndex>
//
//            <ButtonIndex
//              variant="contained"
//              sx={{
//                padding: '12px 20px',
//                borderRadius: '50px',
//                backgroundColor: '#737373',
//                fontFamily: 'Epilogue',
//                fontSize: { xs: '15px', xl: '20px' },
//                width: '100%',
//              }}
//              onClick={() => navigate('/auth')}
//            >
//              Iniciar Sesión
//            </ButtonIndex>
//          </Box>
//        </Box>
//      </Box>
//
//      {/* Barra inferior */}
//      <Box
//        sx={{
//          bgcolor: '#4C956C',
//          height: '50px',
//          width: '100%',
//          position: 'fixed',
//          bottom: 0,
//          left: 0,
//        }}
//      />
//    </Container>
//  );
//}
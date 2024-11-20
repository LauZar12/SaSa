import React, { useState, useEffect, useRef } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import BusinessCard from '../components/BusinessCard';
import Grid from '@mui/material/Grid2';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Logo2 from '../assets/images/Logo-SaSa-2.png';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterDialog from '../components/Dialog';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Cookies from 'js-cookie';
import SearchIcon from '@mui/icons-material/Search';

export default function Businesses() {
    const navigate = useNavigate();
    const [businesses, setBusinesses] = useState([]);
    const [recBusinesses, setRecBusinesses] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredBusinesses, setFilteredBusinesses] = useState([]);
    const donationScrollRef = useRef(null);
    const farmsScrollRef = useRef(null);
    const compostScrollRef = useRef(null);
    const cardWidth = 420;

    const fetchBusinesses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/businesses');
            setBusinesses(response.data);
        } catch (error) {
            console.error('Error fetching businesses:', error);
        }
    };

    useEffect(() => {
        fetchRecommendedBusinesses();
        fetchBusinesses();
    }, []);

    const handleBusinessClicked = (event) => {
        const encodedBusinessId = encodeURIComponent(event.PK);

        let recommendations = Cookies.get('recommendations');
        recommendations = recommendations ? JSON.parse(recommendations) : [];
        if (!recommendations.includes(event.PK)) {
            recommendations.push(event.PK);

            if (recommendations.length > 8) {
                recommendations.shift();
            }

            Cookies.set('recommendations', JSON.stringify(recommendations), { expires: 7 });
        }

        navigate('/businesses/' + encodedBusinessId);
    };

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleApplyFilters = (filters) => {
        setSelectedFilters(filters);
    };

    // Scroll functions for each section
    const scrollLeft = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = (ref) => {
        if (ref.current) {
            ref.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
    };

    const fetchRecommendedBusinesses = async () => {
        const recommendations = Cookies.get('recommendations');
        if (recommendations) {
            const businessIds = JSON.parse(recommendations);
            const businessPromises = businessIds.map((id) => {
                const encodedBusinessId = encodeURIComponent(id);
                return axios.get(`http://localhost:5000/admin/businesses/${encodedBusinessId}`);
            });

            try {
                const results = await Promise.all(businessPromises);
                const fetchedBusinesses = results.map((res) => res.data);
                setRecBusinesses(fetchedBusinesses);
            } catch (error) {
                console.error('Error fetching business info:', error);
            }
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === "") {
            setFilteredBusinesses([]);
        } else {
            const filtered = businesses.filter((business) =>
                business.Business_Name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredBusinesses(filtered);
        }
    };

    return (
        <>
            <div style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '100px', paddingBottom: '100px' }}>
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
                    <Link to="/businesses">
                        <img src={Logo2} alt="Logo" style={{ height: '50px', cursor: 'pointer' }} />
                    </Link>
                </Box>

                {/* Donation Section */}
                <Box sx={{ mt: 1 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Lugares para Donar
                    </Typography>
                    <Typography variant='h6' align='center' gutterBottom color='#888888'>
                        Dona tus alimentos y aporta tu granito de arena a nuestro pais
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => scrollLeft(donationScrollRef)}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Box
                            ref={donationScrollRef}
                            sx={{
                                display: 'flex',
                                overflowX: 'auto',
                                whiteSpace: 'nowrap',
                                maxWidth: '100%',
                                '&::-webkit-scrollbar': {
                                    display: 'none',
                                },
                            }}
                        >
                            {/* Filtra los negocios por Business_Type igual a Entidad sin animo de lucro */}
                            {businesses
                                .filter(business => business.Business_Type === 3) // Filtrado por Business_Type
                                .map((business, index) => (
                                    <Box key={index} sx={{ width: `${cardWidth}px`, mx: 1 }}>
                                        <BusinessCard
                                            image={business.Business_Logo_Url}
                                            onClick={() => handleBusinessClicked(business)}
                                            title={business.Business_Name}
                                            location={business.Business_Address}
                                            city={business.Business_City}
                                            rating={business.Business_Type}
                                            schedule={`Horarios: ${business.Business_Hours}`}
                                        />
                                    </Box>
                                ))
                            }
                        </Box>
                        <IconButton onClick={() => scrollRight(donationScrollRef)}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* Farms Section */}
                <Box sx={{ mt: 1 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Fincas
                    </Typography>
                    <Typography variant='h6' align='center' gutterBottom color='#888888'>
                        Aprovecha estos alimentos ofreciendolos para la alimentacion de animales o para la ayuda en el campo
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => scrollLeft(farmsScrollRef)}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Box
                            ref={farmsScrollRef}
                            sx={{
                                display: 'flex',
                                overflowX: 'auto',
                                whiteSpace: 'nowrap',
                                maxWidth: '100%',
                                '&::-webkit-scrollbar': {
                                    display: 'none',
                                },
                            }}
                        >
                            {/* Filtra los negocios por Business_Type igual a Granja o Sector Agro */}
                            {businesses
                                .filter(business => business.Business_Type === 2) // Filtrado por Business_Type
                                .map((business, index) => (
                                    <Box key={index} sx={{ width: `${cardWidth}px`, mx: 1 }}>
                                        <BusinessCard
                                            image={business.Business_Logo_Url}
                                            onClick={() => handleBusinessClicked(business)}
                                            title={business.Business_Name}
                                            location={business.Business_Address}
                                            city={business.Business_City}
                                            rating={business.Business_Type}
                                            schedule={`Horarios: ${business.Business_Hours}`}
                                        />
                                    </Box>
                                ))
                            }
                        </Box>
                        <IconButton onClick={() => scrollRight(farmsScrollRef)}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* Compost Section */}
                <Box sx={{ mt: 1 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Compostaje
                    </Typography>
                    <Typography variant='h6' align='center' gutterBottom color='#888888'>
                        ¡Haz buen uso de ese desperdicio que no te genera valor y ayuda a Empresas a darle un mejor uso a los restos!
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => scrollLeft(compostScrollRef)}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Box
                            ref={compostScrollRef}
                            sx={{
                                display: 'flex',
                                overflowX: 'auto',
                                whiteSpace: 'nowrap',
                                maxWidth: '100%',
                                '&::-webkit-scrollbar': {
                                    display: 'none',
                                },
                            }}
                        >
                            {/* Filtra los negocios por Business_Type igual a Empresa */}
                            {businesses
                                .filter(business => business.Business_Type === 1) // Filtrado por Business_Type
                                .map((business, index) => (
                                    <Box key={index} sx={{ width: `${cardWidth}px`, mx: 1 }}>
                                        <BusinessCard
                                            image={business.Business_Logo_Url}
                                            onClick={() => handleBusinessClicked(business)}
                                            title={business.Business_Name}
                                            location={business.Business_Address}
                                            city={business.Business_City}
                                            rating={business.Business_Type}
                                            schedule={`Horarios: ${business.Business_Hours}`}
                                        />
                                    </Box>
                                ))
                            }
                        </Box>
                        <IconButton onClick={() => scrollRight(compostScrollRef)}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </Box>
            </div>
        </>
    );
}

import React, { useState, useEffect, useRef } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import BusinessCard from '../components/BusinessCard';
import Grid from '@mui/material/Grid2';
import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo2 from '../assets/images/Logo Sasa-2.png';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterDialog from '../components/Dialog'; 
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Businesses() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);  
  const [selectedFilters, setSelectedFilters] = useState({});
  const scrollRef = useRef(null);
  const cardWidth = 420; // Adjusted width for responsiveness

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/businesses');
      setBusinesses(response.data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleBusinessClicked = (event) => {
    const encodedBusinessId = encodeURIComponent(event.PK);
    navigate('/businesses/' + encodedBusinessId);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleApplyFilters = (filters) => {
    console.log('Selected Filters:', filters);
    setSelectedFilters(filters);
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '100px', paddingBottom: '100px' }}>
        <Box
          sx={{
            bgcolor: '#4C956C',
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
          <img src={Logo2} alt="Logo" style={{ height: '50px' }} />
        </Box>

        {/* "Restaurantes Recomendados" Section */}
        <Box sx={{ mt: 1 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Restaurantes Recomendados
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={scrollLeft}>
              <ArrowBackIcon />
            </IconButton>
            <Box
              ref={scrollRef}
              sx={{
                display: 'flex',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
                '&::-webkit-scrollbar': {
                  display: 'none', // Hide scrollbar
                },
              }}
            >
              {Array.isArray(businesses) && businesses.length > 0 ? (
                businesses.map((business, index) => (
                  <Box key={index} sx={{ width: `${cardWidth}px`, mx: 1 }}> {/* Adjusted width for responsiveness */}
                    <BusinessCard
                      image={business.Business_Logo_Url}
                      onClick={() => handleBusinessClicked(business)}
                      title={business.Business_Name}
                      location={`${business.Business_City}, ${business.Business_Address}`}
                      rating={business.Business_Type}
                      schedule={`Horarios: ${business.Business_Hours}`}
                    />
                  </Box>
                ))
              ) : (
                <p>No businesses available</p>
              )}
            </Box>
            <IconButton onClick={scrollRight}>
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>

        {/* "Todos los restaurantes" Section */}
        <Box sx={{ mt: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Todos los restaurantes
            </Typography>
            <IconButton onClick={handleClickOpen}>
              <FilterListIcon />
            </IconButton>
          </Box>

          <Grid container spacing={2} justifyContent="center">
            {Array.isArray(businesses) && businesses.length > 0 ? (
              businesses.map((business, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <BusinessCard
                    image={business.Business_Logo_Url}
                    onClick={() => handleBusinessClicked(business)}
                    title={business.Business_Name}
                    location={`${business.Business_City}, ${business.Business_Address}`}
                    rating={business.Business_Type}
                    schedule={`Horarios: ${business.Business_Hours}`}
                  />
                </Grid>
              ))
            ) : (
              <p>No businesses available</p>
            )}
          </Grid>
        </Box>

        {/* Filter Dialog */}
        <FilterDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onApply={handleApplyFilters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />

        <BottomNavBar value={0} />
      </div>
    </>
  );
}

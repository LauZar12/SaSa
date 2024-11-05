import React, { useState, useEffect, useRef } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import BusinessCard from '../components/BusinessCard';
import Grid from '@mui/material/Grid2';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Logo2 from '../assets/images/Logo Sasa-2.png';
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
    fetchRecommendedBusinesses();
    fetchBusinesses();
  }, []);

  useEffect(() => {
    console.log('Recommended businesses updated:', recBusinesses);
  }, [recBusinesses]);

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

    // Print all the current cookies
    console.log('All current recommendations:', Cookies.get('recommendations'));

    // Navigate to the business details page
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
          <Link to="/home"> 
            <img src={Logo2} alt="Logo" style={{ height: '50px', cursor: 'pointer' }} />
          </Link>
        </Box>

        {/* Barra de búsqueda */}
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 2,
          }}
        > */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', p: 2 }}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 1.9 }} />
          <TextField id="input-with-sx" sx={{ width: '30%'}} label="Busca tu restaurante favorito!" variant="outlined" onChange={(e) => handleSearch(e.target.value)} />
        </Box>
          {/* <TextField
            variant="outlined"
            placeholder="Buscar negocio..."
            onChange={(e) => handleSearch(e.target.value)}  // Maneja la búsqueda
            sx={{ width: '50%'}}
          /> */}

        {searchQuery ? (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Resultados de búsqueda
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((business, index) => (
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
                      location={business.Business_Address}
                      city={business.Business_City}
                      rating={business.Business_Type}
                      schedule={`Horarios: ${business.Business_Hours}`}
                    />
                  </Grid>
                ))
              ) : (
                <Typography>No se encontraron resultados</Typography>
              )}
            </Grid>
          </Box>
        ) : (
          <>
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
                      display: 'none',
                    },
                  }}
                >
                  {businesses.slice(0, 5).map((business, index) => (
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
                  ))}
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
                {businesses.map((business, index) => (
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
                      location={business.Business_Address}
                      city={business.Business_City}
                      rating={business.Business_Type}
                      schedule={`Horarios: ${business.Business_Hours}`}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}

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



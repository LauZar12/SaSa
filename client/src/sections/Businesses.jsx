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
  const [showLeftArrow, setShowLeftArrow] = useState(false);
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

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (scrollRef.current.scrollLeft > 0) {
      setShowLeftArrow(true);
    } else {
      setShowLeftArrow(false);
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  // Función para hacer scroll hacia la derecha
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

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
    console.log('Filters:', selectedFilters);
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
          <Link to="/">
            <img src={Logo2} alt="Logo" style={{ height: '50px', cursor: 'pointer' }} />
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', p: 2}}>
          <SearchIcon sx={{ color: 'action.active', mr: 1, my: 1.9 }} />
          <TextField id="input-with-sx" sx={{ width: '30%' }} label="Busca tu restaurante favorito!" variant="outlined" onChange={(e) => handleSearch(e.target.value)} />
        </Box>

        {searchQuery ? (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" align="center" gutterBottom sx={{ fontFamily: "'Epilogue', sans-serif" }}>
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
                <Typography sx={{ fontFamily: "'Epilogue', sans-serif" }}>No se encontraron resultados</Typography>
              )}
            </Grid>
          </Box>
        ) : (
          <>
            {/* "Restaurantes Recomendados" Section */}
            <Box sx={{ mt: 1 }}>
              <Typography variant="h5" align="center" gutterBottom sx={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 500, paddingRight: 120}}>
                Restaurantes Recomendados para ti!!
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2}}>
                {showLeftArrow && (
                  <IconButton onClick={scrollLeft}>
                    <ArrowBackIcon />
                  </IconButton>
                )}

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
                  {businesses.slice(5, 9).map((business, index) => (
                    <Box key={index} sx={{ width: `${cardWidth}px`, mx: 1 }}>
                      <BusinessCard
                        image={business.Business_Logo_Url}
                        onClick={() => handleBusinessClicked(business)}
                        title={business.Business_Name}
                        location={business.Business_Address}
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
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2,  }}>
                <Typography variant="h5" align="center" gutterBottom sx={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 500 }}>
                  Todos los restaurantes
                </Typography>
                <IconButton onClick={handleClickOpen}>
                  <FilterListIcon />
                </IconButton>
              </Box>

              <Grid container spacing={2} justifyContent="center">
                {businesses
                  .filter((business) => {
                    if (selectedFilters.distance) {
                      return business.Business_City === "Medellín";
                    }
                    return true; // Si no hay filtro, mostrar todos los restaurantes
                  })
                  .map((business, index) => (
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



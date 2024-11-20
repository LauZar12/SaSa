import React, { useState, useEffect, useRef } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import BusinessCard from '../components/BusinessCard';
import Grid from '@mui/material/Grid2';
import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Logo2 from '../assets/images/Logo Sasa-2.png';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterDialog from '../components/Dialog';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Cookies from 'js-cookie';
import SearchIcon from '@mui/icons-material/Search';
import BurgerIcon from '../assets/icons/cheese-burger.png'
import CoffeeIcon from '../assets/icons/coffee-cup.png'
import CroissantIcon from '../assets/icons/croissant.png'
import ChickenIcon from '../assets/icons/fried-chicken.png'
import PizzaIcon from '../assets/icons/pizza.png'

export default function Businesses() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [recBusinesses, setRecBusinesses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('all');
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const scrollRef = useRef(null);
  const cardWidth = 420; // Adjusted width for responsiveness

  const categories = [
    { label: 'hamburguesa', icon: BurgerIcon },
    { label: 'pizza', icon: PizzaIcon },
    { label: 'café', icon: CoffeeIcon },
    { label: 'pollo', icon: ChickenIcon },
    { label: 'panadería', icon: CroissantIcon },
  ];

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

  useEffect(() => {
    console.log('View mode updated:', viewMode);
  }, [viewMode]);

  useEffect(() => {
    if (viewMode === 'all') {
      fetchBusinesses();  // Recargar todos los restaurantes
    }
  }, [viewMode]);

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

  const fetchBusinessesByCategory = async (category) => {
    try {
      const response = await axios.get(`http://localhost:5000/businesses/category/${category}`);
      setBusinesses(response.data);  // Actualizar los restaurantes filtrados
      setSelectedCategory(category);
      setViewMode('category');
      console.log(viewMode);
    } catch (error) {
      console.error('Error fetching businesses by category:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setViewMode(query === '' ? 'all' : 'search');
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

        {viewMode !== 'category' && (
          <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', p: 2}}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 1.9 }} />
            <TextField id="input-with-sx" sx={{ width: '30%' }} label="Busca tu restaurante favorito!" variant="outlined" onChange={(e) => handleSearch(e.target.value)} />
          </Box>
        )}

        {viewMode === 'category' ? (
          <Box sx={{ mt: 5 }}>
            {/* Botón para regresar */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <Button 
                variant="contained" 
                onClick={() => setViewMode('all')} 
                startIcon={<ArrowBackIcon />} // Icono de flecha hacia atrás
                sx={{
                  textTransform: 'none', // Texto en formato natural
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: '1rem',
                  backgroundColor: "#4C956C",
                }}
              >
                Volver a Restaurantes
              </Button>
            </Box>
          
            {/* Título de la categoría */}
            <Typography 
              variant="h5" 
              align="center" 
              gutterBottom 
              sx={{ fontFamily: "'Epilogue', sans-serif", mb: 2 }}
            >
              Restaurantes de {selectedCategory}
            </Typography>
          
            {/* Ícono de la categoría */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mb: 4 // Espaciado adicional debajo del ícono
              }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img 
                  src={categories.find(cat => cat.label === selectedCategory)?.icon} 
                  alt={selectedCategory} 
                  style={{ width: '70%', height: '70%', objectFit: 'contain' }} 
                />
              </Box>
            </Box>
          
            {/* Grid de restaurantes */}
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
                    schedule={`Horarios: ${business.Business_Hours}`}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : viewMode === 'search' ? (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" align="center" gutterBottom sx={{ fontFamily: "'Epilogue', sans-serif" }}>
              Resultados de búsqueda
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((business, index) => (
                  <Grid key={index} item xs={12} sm={6} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <BusinessCard
                      image={business.Business_Logo_Url}
                      onClick={() => handleBusinessClicked(business)}
                      title={business.Business_Name}
                      location={business.Business_Address}
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
        ) : viewMode === 'all' ? (
          <>
            {/* "Restaurantes Recomendados" Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" align="center" gutterBottom sx={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 500}}>
                Restaurantes Recomendados para ti!!
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 3}}>
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

            {/* Categories Section */}

            <Typography variant="h5" align="center" gutterBottom sx={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 500, mb: 5, mt: 10}}>
                Qué tipo de comida quieres salvar hoy??
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 12, mt: 5 }}>
              {categories.map((category) => (
                <IconButton
                  key={category.label}
                  sx={{
                    backgroundColor: '#f1f1f1',
                    borderRadius: '50%',
                    width: 110, // Aumentar el tamaño al doble
                    height: 110,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Agregar sombra para un diseño más atractivo
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)', // Efecto de agrandar al pasar el mouse
                    },
                  }}
                  onClick={() => fetchBusinessesByCategory(category.label)}
                >
                  <img 
                    src={category.icon} 
                    alt={category.label} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                </IconButton>
              ))}
            </Box>

            {/* "Todos los restaurantes" Section */}
            <Box sx={{ mt: 10 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, mt: 6 }}>
                <Typography variant="h5" align="center" gutterBottom sx={{ fontFamily: "'Epilogue', sans-serif", fontWeight: 500}}>
                  Todos los restaurantes
                </Typography>
                <IconButton onClick={handleClickOpen} >
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
        ): null }

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



import React from 'react';
import BottomNavBar from '../components/BottomNavBar';
import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Typography, Divider, Button } from '@mui/material';
import { useNavigate, useParams, Link } from 'react-router-dom'; 
import axios from 'axios';
import Logo2 from '../assets/images/Logo-SaSa-2.png';
import SurpriseBoxCard from '../components/SurpriseBoxCard'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Business() {
  const { businessId } = useParams(); 
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [surpriseBoxContent, setSurpriseBoxContent] = useState([]);

  const fetchProducts = async () => {
    console.log("Fetching products");

    const encodedBusinessId = encodeURIComponent(businessId);

    try {
      const response = await axios.get(`http://localhost:5000/businesses/${encodedBusinessId}/products`);
      setProducts(response.data);  // Assuming response.data contains the list of products
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchSurpriseBox = async () => {
    console.log("Fetching surprise box");

    const encodedBusinessId = encodeURIComponent(businessId);

    const response = await axios.get(`http://localhost:5000/admin/businesses/${encodedBusinessId}/surprise-boxes`);
    setSurpriseBoxContent(response.data.result || []);
    console.log("Surprise boxes:", response.data.result);
  };

  useEffect(() => {
    if (businessId) {
      fetchProducts(); // Fetch products when the component mounts
      fetchSurpriseBox();
    }
  }, [businessId]);

  const handleProductClicked = (product) => {
    // Implement the logic for handling the product click event
    console.log("Product clicked:", product);
  };

  const handleSurpriseBoxClicked = (surpriseBox) => {
    // Implement the logic for handling the surprise box click event
    console.log("Surprise Box clicked:", surpriseBox);
  };

  const handleGoBack = () => {
    navigate('/businesses'); // Redirige a la ruta de /businesses
  };

  return (
    <div style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '100px', paddingBottom: '100px', minHeight: '100vh' }}>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <Button 
          variant="contained" 
          onClick={handleGoBack} 
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

      {/* Top bar */}
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
        <Link to="/">
          <img src={Logo2} alt="Logo" style={{ height: '50px' }} />
        </Link>
      </Box>

      {/* h2 title for the products */}
      <Typography variant="h4" sx={{
        marginTop: '10px',
        marginBottom: '30px',
        color: '#666666',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        Todos los productos
      </Typography>

      {/* Products Grid */}
      <Grid container spacing={2} justifyContent="center">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={12}
              md={2}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ProductCard
                image={'https://www.distrecol.com/wp-content/themes/456repair/assets//img/no-product-image.png'}
                onClick={() => handleProductClicked(product)}
                title={product.Product_Name}
                discount={product.Discount}
                price={product.Price}
                description={product.Product_Description}
                width={{
                  xs: '300px',
                  sm: '350px',
                  md: '400px',
                }}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            No hay productos disponibles
          </Typography>
        )}
      </Grid>

      {/* Divider line */}
      <Divider sx={{ marginTop: '40px', marginBottom: '40px' }} />

      {/* h2 title for the surprise boxes */}
      <Typography variant="h4" sx={{
        marginTop: '10px',
        marginBottom: '30px',
        color: '#666666',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        Cajas sorpresas
      </Typography>

      {/* Surprise Boxes Grid */}
      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '30px' }}>
        {Array.isArray(surpriseBoxContent) && surpriseBoxContent.length > 0 ? (
          surpriseBoxContent.map((surpriseBox, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={12}
              md={2}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <SurpriseBoxCard
                title={surpriseBox.Product_Name}
                price={surpriseBox.Price}
                count={surpriseBox.Available_Quantity}
                onClick={() => handleSurpriseBoxClicked(surpriseBox)}
                width={{
                  xs: '225px',
                  sm: '275px',
                  md: '325px',
                }}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            No hay cajas sorpresas disponibles
          </Typography>
        )}
      </Grid>

      <BottomNavBar />
    </div>
  );
}

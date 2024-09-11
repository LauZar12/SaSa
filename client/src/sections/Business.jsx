import React from 'react';
import BottomNavBar from '../components/BottomNavBar';
import BusinessCard from '../components/BusinessCard';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom'; // useParams to get route params
import axios from 'axios';
import Logo2 from '../assets/images/Logo Sasa-2.png';
import ProductCard from '../components/ProductCard';

export default function Business() {
  const navigate = useNavigate();
  const { businessId } = useParams(); // Get businessId from route parameters

  const [products, setProducts] = useState([]);

  // Function to fetch products for the specific businessId
  const fetchProducts = async () => {
    console.log("Fetching products");

    const encodedBusinessId = encodeURIComponent(businessId);

    try {
      // Update URL to include businessId
      const response = await axios.get(`http://localhost:5000/businesses/${encodedBusinessId}`);
      setProducts(response.data);  // Assuming response.data contains the list of products
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (businessId) {
      fetchProducts(); // Fetch products when the component mounts
    }
  }, [businessId]);

  const handleProductClicked = (product) => {
    // Implement the logic for handling the product click event
    console.log("Product clicked:", product);
  };

  return (
    <div style={{ paddingLeft: '30px', paddingRight: '30px', paddingTop: '100px', paddingBottom: '100px' }}>

      {/* Top bar */}
      <Box
        sx={{
          bgcolor: '#4C956C',
          height: '80px',
          width: '100%', // Ensure the bar covers the full width of the screen
          top: 0, // Stick to the top of the screen
          left: 0, // Stick to the left side
          p: 0, // Remove padding inside the box
          overflow: 'hidden',
          position: 'fixed', // Make it sticky
          display: 'flex', // Align items horizontally
          alignItems: 'center', // Vertically center the logo
          justifyContent: 'center', // Horizontally center the logo (optional)
          zIndex: 1000 // Ensure it's above other elements
        }}
      >
        {/* Logo inside the top bar */}
        <img src={Logo2} alt="Logo" style={{ height: '50px' }} /> {/* Adjust the height as needed */}
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product, index) => (
            <Grid
              key={index}
              item
              xs={12} // 1 column on small devices
              sm={12}  // 1 column on medium devices
              md={2}  // 4 columns on larger devices
              sx={{ display: 'flex', justifyContent: 'center' }} // Center each card
            >
              <ProductCard
                image={'https://www.distrecol.com/wp-content/themes/456repair/assets//img/no-product-image.png'} // Ensure this field exists in your product data
                onClick={() => handleProductClicked(product)}
                title={product.Product_Name}
                discount={product.Discount} // Assuming discount is available in your product data
                price={product.Price} // Assuming price is available in your product data
                description={product.Product_Description} // Assuming description is available in your product data
                width={{
                  xs: '300px',
                  sm: '350px',
                  md: '400px',
                }}
              />
            </Grid>
          ))
        ) : (
          <p>No products available</p>
        )}
      </Grid>
      <BottomNavBar />
    </div>
  );
}

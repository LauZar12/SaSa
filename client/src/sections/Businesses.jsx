import React from 'react'
import BottomNavBar from '../components/BottomNavBar';
import BusinessCard from '../components/BusinessCard';
import BusinessImage from '../assets/images/BusinessImages/Caracas Fried Chicken.jpeg';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import axios from 'axios';

import Logo2 from '../assets/images/Logo Sasa-2.png';

export default function Businesses() {
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState([]);

  // Function to fetch businesses
  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/businesses');
      setBusinesses(response.data);  // Assuming response.data contains the list of businesses
    } catch (error) {
      console.error('Error fetching businesses:', error);
    }
  };

  useEffect(() => {
    fetchBusinesses(); // Fetch businesses when the component mounts
  }, []);
  

  const handleBusinessClicked = (event) => {
    // Implement the logic for handling the business click event
    console.log("Business clicked:", event);

    const user = Cookies.get('user');
    if (user) {
      const userData = JSON.parse(user);
      console.log("User Data:", userData);
    }else{
      console.log("No user cookies")
    }

    const encodedBusinessId = encodeURIComponent(event.PK);
    navigate('/businesses/' + encodedBusinessId);
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
        {Array.isArray(businesses) && businesses.length > 0 ? (
          businesses.map((business, index) => (

            
            <Grid
              key={index}
              item
              xs={12} // 1 column on small devices
              sm={12}  // 1 columns on medium devices
              md={2}  // 4 columns on larger devices
              sx={{ display: 'flex', justifyContent: 'center' }} // Center each card
            >
              <BusinessCard
                image={business.Business_Logo_Url}
                onClick={() => handleBusinessClicked(business)}
                title={business.Business_Name}
                location={`${business.Business_City}, ${business.Business_Address}`}
                rating={business.Business_Type}
                schedule={`Horarios: ${business.Business_Hours}`}
                width={{
                  xs: '300px',
                  sm: '350px',
                  md: '400px',
                  sx: '500px',
                }}
              />
            </Grid>
          ))
        ) : (
          <p>No businesses available</p>
        )}
      </Grid>
      <BottomNavBar />
    </div>
  );
}
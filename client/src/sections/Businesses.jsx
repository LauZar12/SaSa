import React from 'react'
import BottomNavBar from '../components/BottomNavBar';
import BusinessCard from '../components/BusinessCard';
import BusinessImage from '../assets/images/BusinessImages/Caracas Fried Chicken.jpeg';
import { useState, useEffect } from 'react';

import axios from 'axios';

export default function Businesses () {
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
  };

  return (
    <div>
    {Array.isArray(businesses) && businesses.length > 0 ? (
      businesses.map((business, index) => (
        <BusinessCard
          key={index}
          image={BusinessImage}
          onClick={() => handleBusinessClicked(business)}
          title={business.Business_Name}
          width='400px'
          location={`${business.Business_City}, ${business.Business_Address}`}
          rating={business.Business_Type}
          schedule={business.Business_Hours}
        />
      ))
    ) : (
      <p>No businesses available</p>
    )}
    <BottomNavBar />
  </div>
  );
}
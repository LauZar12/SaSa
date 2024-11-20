
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button,TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const EditLocation = () => {
  const { businessId } = useParams();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState('');

  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Maps API loaded");
      };
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  window.initMap = () => {
    const input = document.getElementById("placeInput"); // Input HTML element
    const autocomplete = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: "CO" },
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address && place.geometry?.location) {
        setSelectedPlace({
          formattedAddress: place.formatted_address,
          location: place.geometry.location,
        });
        setFormattedAddress(place.formatted_address);
      } else {
        setSelectedPlace(null);
        setFormattedAddress('');
      }
    });
  };

  const saveLocation = async () => {
    console.log(selectedPlace.formattedAddress);
    try {
      const encodedBusinessId = encodeURIComponent(businessId);
      const user = JSON.parse(Cookies.get('user'));
      const PK = user.PK;
      
      if (selectedPlace && selectedPlace.formattedAddress) {
        const businessData = {
          Business_Address: selectedPlace.formattedAddress,
          PK,
        };

        await axios.put(`http://localhost:5000/admin/businesses/${encodedBusinessId}/edit-address`, businessData, {
          withCredentials: true,
        });

        toast.success('La ubicación ha sido asignada con éxito!');
      } else {
        toast.error('Por favor selecciona una ubicación.');
      }
    } catch (error) {
      console.error('Error asignando ubicación:', error);
      toast.error('Tuvimos problemas para asignar la ubicación');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" component="h2">
        Asignar Ubicación
      </Typography>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Selecciona una ubicación para el negocio:
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id="placeInput"
          placeholder=""
          label="Escribe la dirección"
          variant="standard"
          fullWidth
          value={formattedAddress}
          onChange={(e) => setFormattedAddress(e.target.value)}
          sx={{ mt: 2 }}
        />
      </Box>
      
      <Button
        variant="contained"
        color="primary"
        onClick={saveLocation}
        sx={{ mt: 7 }}
      >
        Guardar Ubicación
      </Button>
    </Box>
  );
};

export default EditLocation;

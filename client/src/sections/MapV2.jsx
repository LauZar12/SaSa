import React, {useState, useCallback, useEffect} from 'react'; 
import axios from 'axios';

import {
  APIProvider, 
  Map, 
  Pin, 
  AdvancedMarker, 
  useMap,
  InfoWindow 
} from '@vis.gl/react-google-maps';
  
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    zIndex: 9999, // Asegura que esté por encima de todo
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px 40px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  text: {
    margin: 0,
    fontFamily: "'Epilogue', sans-serif",
    color: '#333',
  },
};

const PoiMarkers = (props) => {
  const map = useMap();
  const [selectedPoi, setSelectedPoi] = useState(null);
  // const infoWindow = InfoWindow();

  const handleClick = useCallback((poi) => {
    if (!map) return;
    setSelectedPoi(poi);
    map.panTo(poi.location);

  }, [map]);

  const handleClose = () => {
    setSelectedPoi(null);
  };

  return (
    <>
      {props.pois.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          clickable={true}
          onClick={() => handleClick(poi)}
          title={poi.key}
        >
          <Pin />
        </AdvancedMarker>
      ))}

      {selectedPoi && (
        <InfoWindow
          position={selectedPoi.location}
          onCloseClick={handleClose}
        >
          <div>
            <h3>{selectedPoi.key}</h3>
            <p>Horario: {selectedPoi.hours}</p>
          </div>
        </InfoWindow>
      )}

    </>
  );
};

const MapV2 = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndGeocode = async () => {
      try {
        // Paso 1: Realiza la consulta para obtener todos los negocios
        const response = await axios.get('http://3.144.21.138:5000/businesses/get-info');
        const businesses = response.data;
        console.log("Businesses: ",businesses);
        
        // Paso 2: Filtra y geolocaliza cada dirección válida
        const geocodedLocations = await Promise.all(
          businesses.map(async (business) => {
            if (business.Business_Address && business.Business_Address !== "None") {
              const geocodeResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                  address: business.Business_Address,
                  key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Inserta aquí tu clave segura
                },
              });
              const location = geocodeResponse.data.results[0]?.geometry.location;
              if (location) {
                return {
                  key: business.Business_Name,
                  location, // { lat, lng }
                  hours: business.Business_Hours,
                };
              }
            }
            return null; // Ignora direcciones inválidas o sin datos
          })
        );

        // Paso 3: Filtra ubicaciones válidas y actualiza el estado
        setLocations(geocodedLocations.filter((loc) => loc !== null));
        setLoading(false);

        console.log("Locations:",locations);

      } catch (error) {
        console.error('Error al obtener o geolocalizar los datos:', error);
        setLocations([]); // Si hay error, establece un arreglo vacío
        setLoading(false);
      }
    };

    fetchDataAndGeocode();
  }, []);

  if (loading) {
    return (
      <div style={styles.overlay}>
        <div style={styles.modal}>
          <h2 style={styles.text}>Cargando Mapa...</h2>
        </div>
      </div>
    );
  }


  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        defaultZoom={13.5}
        defaultCenter={{ lat: 6.249316, lng: -75.560616 }}
        style={{ width: '100vw', height: '100vh' }}
        gestureHandling="greedy"
        disableDefaultUI={true}
        mapId="f84cb2d1ea92e997"
        options={{
          minZoom: 13, // Zoom mínimo
          maxZoom: 16, // Zoom máximo
          restriction: {
            latLngBounds: {
              north: 6.455, // Límite norte
              south: 5.947, // Límite sur
              west: -75.829, // Límite oeste
              east: -75.338, // Límite este
            },
            strictBounds: true, // Restringir estrictamente al área
          },
        }}
      >
        <PoiMarkers pois={locations} /> 
      </Map>
    </APIProvider>
  );
};

export default MapV2;

// <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#137333'} />

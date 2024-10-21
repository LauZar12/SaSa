// import React from 'react'
// import BottomNavBar from '../components/BottomNavBar'

// const MapV2 = () => {
//   return (
//     <BottomNavBar />
    
//   )
// }

// export default MapV2

// 


/* global google */
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";
import "../Map.css";

const MapV2 = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBbOxklM1Vcm_wT6wzSnhKJa4LvR1jvYnk',
  });
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const markers = [
    { address: "Las vegas con 7 sur, El Poblado, Medellín, Antioquia", lat: 6.199387481828809, lng: -75.57807649683409 },
    { address: "Calle 39B, Cq. 73B #N° - 67, Medellín, Antioquia", lat: 6.244928475806693, lng: -75.59537447538722 },
    { address: "Zona 1, Envigado, Antioquia", lat: 6.1781810867482605, lng: -75.59119123892503 }
  ];

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onMapLoad}
          onClick={() => setIsOpen(false)}
        >
          {markers.map(({ address, lat, lng }, ind) => (
            <Marker
              key={ind}
              position={{ lat, lng }}
              onClick={() => {
                handleMarkerClick(ind, lat, lng, address);
              }}
            >
              {isOpen && infoWindowData?.id === ind && (
                <InfoWindow
                  onCloseClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <h3>{infoWindowData.address}</h3>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default MapV2;
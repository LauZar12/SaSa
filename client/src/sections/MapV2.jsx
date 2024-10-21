import React from 'react';
import {APIProvider, Map, Pin, AdvancedMarker} from '@vis.gl/react-google-maps';

const locations = [
    {key: 'Frisby Eafit', location: { lat: 6.199387481828809, lng: -75.57807649683409  }},
    {key: 'McDonalds Laureles', location: { lat: 6.244928475806693, lng: -75.59537447538722 }},
    {key: 'SportsTown VivaEnvigado', location: { lat: 6.1781810867482605, lng: -75.59119123892503 }},

];
  

const PoiMarkers = (props) => {
  return (
    <>
      {props.pois.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          // clickable={true}
          // onClick={handleClick}
        >
          <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      ))}
    </>
  );
};


// const handleClick = useCallback((ev) => {
//   if (!map) return;
//   if (!ev.latLng) return;
//   console.log('marker clicked:', ev.latLng.toString());
//   map.panTo(ev.latLng);
// }, [map]);



const MapV2 = () => (
 <APIProvider apiKey={'AIzaSyBbOxklM1Vcm_wT6wzSnhKJa4LvR1jvYnk'} onLoad={() => console.log('Maps API has loaded.')}>
    <Map
      defaultZoom={13}
      defaultCenter={ { lat: 6.249316307398763, lng: -75.5606163100253 } }
      mapId='274f8ffa0113d548'
      style={{width: '100vw', height: '100vh'}}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    >
    <PoiMarkers pois={locations} />
    </Map>
 </APIProvider>
);

export default MapV2;

//     { address: "Las vegas con 7 sur, El Poblado, Medellín, Antioquia", lat: 6.199387481828809, lng: -75.57807649683409 },
//     { address: "Calle 39B, Cq. 73B #N° - 67, Medellín, Antioquia", lat: 6.244928475806693, lng: -75.59537447538722 },
//     { address: "Zona 1, Envigado, Antioquia", lat: 6.1781810867482605, lng: -75.59119123892503 }
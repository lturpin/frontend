import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
// import DeckGL, { GeoJsonLayer } from 'deck.gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

const EventsMap = ({ evt }) => {
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 50.793278,
    longitude: -0.002972,
    width: '100%',
    height: '500px',
    zoom: 12,
  });

  const mapRef = useRef();

  const handleOnResult = (event) => {
    console.log('event.result', event.result.geometry);
  };

  const handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = {
      transitionDuration: 1000,
    };

    console.log('Updating');

    return setViewport({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

  const getGeocode = async () => {
    const encodedAddress = encodeURIComponent(evt.address);
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}`
    );
    const geocodeData = await res.json();
    const geometry = geocodeData.features[0].geometry;

    setViewport({
      latitude: geometry.coordinates[1],
      longitude: geometry.coordinates[0],
      zoom: 15,
      transitionDuration: 100,
    });
    handleGeocoderViewportChange(viewport);
  };

  useEffect(() => {
    getGeocode();
    setLoading(false);
  }, []);

  if (loading) return false;

  return (
    <>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={mapboxToken}
        onViewportChange={setViewport}
      >
        <Marker
          key={evt.id}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
        >
          <Image src="/images/pin.svg" width={30} height={30} />
        </Marker>
      </ReactMapGL>
    </>
  );
};

export default EventsMap;
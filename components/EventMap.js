import Image from 'next/image';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

const EventsMap = ({ evt }) => {
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState(null);
  const [error, setError] = useState(null);


  const getGeocode = async () => {
    const encodedAddress = encodeURIComponent(evt.address);
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxToken}`
      );
      const geocodeData = await res.json();
      const geometry = geocodeData.features[0].geometry;
      if (!viewport) {
        setViewport({
          latitude: geometry.coordinates[1],
          longitude: geometry.coordinates[0],
          width: '100%',
          height: '500px',
          zoom: 15,
          transitionDuration: 100,
        });
      }
      setError(null);
    } catch (err) {
      setViewport(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getGeocode();
  }, [viewport]);

  return (
    <>
      {loading && <div>A moment please ...</div>}
      {error && (
        <div>{`There is a error fetching the post data - ${error}`}</div>
      )}
      {viewport && (
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={(viewport) => setViewport(viewport)}
        >
          <Marker
            key={evt.id}
            latitude={viewport.latitude}
            longitude={viewport.longitude}
          >
            <Image
              src="/images/pin.svg"
              width={30}
              height={30}
              alt="marker"
            />
          </Marker>
        </ReactMapGL>
      )}
    </>
  );
};

export default EventsMap;

import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import targetService from '../services/targets';

require('react-leaflet-markercluster/dist/styles.min.css');

function MainMap() {
  const [targets, setTargets] = useState([]);

  const getTargets = async () => {
    const data = await targetService.getAllTargets();
    data.features.sort((a, b) => (a.properties.name > b.properties.name ? 1 : -1));
    setTargets(data.features);
  };

  useEffect(() => {
    getTargets();
  }, []);

  return (
    <div>
      <MapContainer
        style={{ height: '480px', width: '100%', opacity: '0.9' }}
        zoom={5}
        maxZoom={20}
        center={[64.1, 25.0]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          spiderfyDistanceMultiplier={1}
          showCoverageOnHover={false}
        >
          {targets.map((target) => (
            <Marker
              key={target.properties.id}
              position={target.geometry.coordinates.reverse()}
            >
              <Popup direction="right" offset={[-8, -2]} opacity={1}>
                {target.properties.id}
                <br />
                {target.properties.name}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default MainMap;

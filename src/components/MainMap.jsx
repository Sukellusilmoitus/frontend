import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  LayersControl,
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
        style={{ height: '480px', width: '100%' }}
        zoom={5}
        maxZoom={18}
        center={[64.1, 25.0]}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satelliitti">
            <TileLayer
              attribution='&copy; <a href="https://www.esri.com/en-us/legal/overview">Esri</a> contributors'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name="Merimerkit">
            <TileLayer
              attribution='&copy; <a href="https://openseamap.org/index.php?id=imprint&L=1">OpenSeaMap</a> contributors'
              url="https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
            />
          </LayersControl.Overlay>
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
        </LayersControl>
      </MapContainer>
    </div>
  );
}

export default MainMap;

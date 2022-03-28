import React from 'react';
import {
  MapContainer, LayersControl, TileLayer, Marker, Popup,
} from 'react-leaflet';

function TargetLocationMap({ target }) {
  const coordinates = [target.geometry.coordinates[1], target.geometry.coordinates[0]];
  return (
    <MapContainer center={coordinates} zoom={8} style={{ height: '250px', width: '100%' }}>
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
        <Marker position={coordinates}>
          <Popup>
            {target.properties.name}
          </Popup>
        </Marker>
      </LayersControl>
    </MapContainer>
  );
}

export default TargetLocationMap;

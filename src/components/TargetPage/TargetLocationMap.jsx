import React from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

function TargetLocationMap({ target }) {
  const coordinates = target.geometry.coordinates.reverse();
  return (
    <MapContainer center={coordinates} zoom={8}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates}>
        <Popup>
          {target.properties.name}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default TargetLocationMap;

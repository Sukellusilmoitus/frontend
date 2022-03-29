import React from 'react';
import {
  MapContainer, LayersControl, TileLayer, Marker, Popup,
} from 'react-leaflet';
import LoadingSpinner from '../LoadingSpinner';

function UserTargetLocationMap({ dives }) {
  if (dives === 'loading...') {
    return (
      <section data-testid="user-target-map">
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <MapContainer center={[64.7, 25.0]} zoom={4} style={{ height: '250px', width: '100%' }}>
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
        {(dives.length > 0)
          && dives.map((dive) => (
            <Marker position={dive.target.geometry.coordinates.reverse()}>
              <Popup>
                {dive.target.properties.name}
              </Popup>
            </Marker>
          ))}
      </LayersControl>
    </MapContainer>
  );
}

export default UserTargetLocationMap;

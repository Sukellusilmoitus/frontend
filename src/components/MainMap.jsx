import React from 'react';
import { useHistory } from 'react-router-dom';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Popup,
  Marker,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Button } from 'react-bootstrap';
import lightMarker from '../assets/images/marker-icon-light.png';
import MapLegend from './MapLegend';

require('react-leaflet-markercluster/dist/styles.min.css');

function MainMap(props) {
  const { targets } = props;
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/hylyt/${id}`);
  };

  const userCreatedMarker = L.icon({
    iconUrl: lightMarker,
  });

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
            {targets.map((target) => {
              if (target.properties.source === 'museovirasto') {
                return (
                  <Marker
                    key={target.properties.id}
                    position={target.geometry.coordinates.reverse()}
                  >
                    <Popup direction="right" offset={[-8, -2]} opacity={1}>
                      <h6>
                        ID:
                        {target.properties.id}
                      </h6>
                      <h6>{target.properties.name}</h6>
                      <Button onClick={() => handleClick(target.properties.id)}>
                        Tee sukellusilmoitus
                      </Button>
                    </Popup>
                  </Marker>
                );
              }
              return (
                <Marker
                  icon={userCreatedMarker}
                  key={target.properties.id}
                  position={target.geometry.coordinates.reverse()}
                >
                  <Popup direction="right" offset={[-8, -2]} opacity={1}>
                    <h6>
                      ID:
                      {target.properties.id}
                    </h6>
                    <h6>{target.properties.name}</h6>
                    <Button onClick={() => handleClick(target.properties.id)}>
                      Tee sukellusilmoitus
                    </Button>
                  </Popup>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        </LayersControl>
        <MapLegend position="bottomleft" />
      </MapContainer>
    </div>
  );
}

export default MainMap;

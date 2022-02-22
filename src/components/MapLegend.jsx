import React from 'react';
import lightMarker from '../assets/images/marker-icon-light.png';
import darkMarker from '../assets/images/marker-icon.png';

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

function MapLegend({ position }) {
  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">
        <div className="leaflet-control-layers-expanded">
          <h6>Lähde:</h6>
          <img src={lightMarker} alt="user created marker" width="10px" />
          <span> Käyttäjän ilmoitus</span>
          <br />
          <img src={darkMarker} alt="user created marker" width="10px" />
          <span> Museovirasto</span>
        </div>
      </div>
    </div>
  );
}

export default MapLegend;

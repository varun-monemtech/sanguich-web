import React from 'react'

import mapMarker from './map-marker.png'
import './style.scss'

function Marker(props) {
  return (
    <div className="map-marker">
      <img src={mapMarker.src} alt="Map marker" />
    </div>
  )
}

export default Marker
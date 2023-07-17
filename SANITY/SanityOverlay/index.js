import React from 'react'

//import './style.scss'

function SanityOverlay(props) {

	// Overlay
	const { bgOverlayColor, bgOverlay } = props

	// Returning Section
  return bgOverlay && bgOverlay > 0 ? (
		<div className='bg-overlay' style={{ opacity: bgOverlay, backgroundColor: bgOverlayColor }} />
  ) : false
}

export default SanityOverlay
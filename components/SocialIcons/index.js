import React from 'react'
import './style.scss'

function SocialIcons(props) {
	
  return (
		<>
			<div className='social-icons font1'>
				<div className='social-icon hint--rounded hint--top' data-hint='@sanguich'>
					<a href="https://www.facebook.com/sanguichdemiami/" target='_blank' rel='noopener noreferrer'>
						FaceBook
					</a>
				</div>
				<div className='social-icon hint--rounded hint--top' data-hint='@sanguich'>
					<a href="https://www.instagram.com/sanguichdemiami/" target='_blank' rel='noopener noreferrer'>
						Instagram
					</a>
				</div>
			</div>
		</>
  )
}

export default SocialIcons
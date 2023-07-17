// 'use client'

import React from 'react'
import './style.scss'
import WPSlider from '../../WP/ACF/Slider'
import Image from 'next/image'

async function getOptions() {
	const res = await fetch('https://evgreen.unixstorm.org/FRS-3/wp-json/acf/v3/options/options/',
		{
			// cache: 'no-store',
			next: {
				revalidate: 600
			}
		}
	)
	return res.json()
}


export const Footer = async() => {

	const options = await getOptions()

	const d = new Date()
	const year = d.getFullYear()

	const logo = options.acf?.logo_light
	const copy = options?.acf?.copy
	const slides = options?.acf?.slider

  return (
		<footer className='master-footer'>

			<div className="logo-positioner padd-left padd-bottom-half">
				<div className="logo">
					<Image
						width={500}
						height={200}
						alt={logo?.alt}
						src={logo?.url}
					/>
				</div>
			</div>

			<div className="copy-positioner padd-right padd-bottom-half">
				<div className='copy'>
					<p>&copy; {year}. {copy}</p>
				</div>
			</div>

			{/* <div
				className=""
				dangerouslySetInnerHTML={{ __html: slides }}
			/> */}

			{/* <WPSlider payload={slides} controlsLight={true} fade={true} /> */}

			{/* <pre>
				<code>{JSON.stringify(slides, null, 2)}</code>
			</pre> */}

		</footer>
  )
}
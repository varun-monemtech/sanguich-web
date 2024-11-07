'use client'

import React from 'react'
import './style.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import Newsletter from '../Form/CF7/Newsletter'

export const Footer = ({options}: {options: any}) => {
	const [io, ioInView] = useInView({ triggerOnce: false })


	const d = new Date()
	const year = d.getFullYear()

	const logo = options.acf?.footer_image

  return (
		<footer ref={io} id='master-footer' className={`border-type-5 c5 grid-12 is-inview ${ioInView ? 'inview' : ''}`}>
								
			<div className="decor-wrap">
				<div className="decor-top">
					<div className="decor-top-left"></div>
					<div className="decor-top-center with-extra">
						<div className="decor-top-center-extra-left"></div>
						<div className="decor-top-center-extra-center"></div>
						<div className="decor-top-center-extra-right"></div>
					</div>
					<div className="decor-top-right"></div>
				</div>
				<div className="decor-center with-extra">
					<div className="decor-center-left">
						<div className="decor-center-left-extra-top"></div>
						<div className="decor-center-left-extra-center"></div>
						<div className="decor-center-left-extra-bottom"></div>
					</div>
					<div className="decor-center-right">
						<div className="decor-center-right-extra-top"></div>
						<div className="decor-center-right-extra-center"></div>
						<div className="decor-center-right-extra-bottom"></div>
					</div>
				</div>
				<div className="decor-bottom">
					<div className="decor-bottom-left"></div>
					<div className="decor-bottom-center with-extra">
						<div className="decor-bottom-center-extra-left"></div>
						<div className="decor-bottom-center-extra-center"></div>
						<div className="decor-bottom-center-extra-right"></div>
					</div>
					<div className="decor-bottom-right"></div>
				</div>
			</div>

			{ logo ?
				<Image
					width={500}
					height={200}
					alt={logo?.alt}
					src={logo?.url}
					className="footer-logo"
				/>
			: null }

			<div id="contact" className="contact padd-2 fs-85">
				<Newsletter />
			</div>

			<div className="footer-navi uppercase">
				<p className="font3 h6"><a href="https://www.facebook.com/sanguichdemiami/" target="_blank" rel="noreferrer noopener">FaceBook</a></p>
				<p className="font3 h6"><a href="https://www.instagram.com/sanguichdemiami/" target="_blank" rel="noreferrer noopener">Instagram</a></p>
				<p className="font3 h6"><a href="https://www.tripadvisor.com/Restaurant_Review-g34438-d13076164-Reviews-Sanguich_De_Miami-Miami_Florida.html" target="_blank" rel="noreferrer noopener">TripAdvisor</a></p>
				<p className="font3 h6">
					<Link href="/contact">Contact</Link>
				</p>
			</div>

			<div className='copy'>
				<p className="uppercase h5">Soñado en 2014. Establecido en 2015</p>
				<p className="uppercase h6">Copyright &copy; {year}. SITE BY <a href="https://www.deepsleepstudio.com" title="DeepSleep Studio, a Design and Public Relations agency." target="_blank" style={{wordSpacing: '.5em'}}>ds/s</a>.</p>
			</div>

		</footer>
  )
}
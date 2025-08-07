'use client'

import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import Newsletter from '../../form/CF7/Newsletter'
import { LoadImage } from '@/components/new/LoadImage'
import './style.scss'

export const Footer = () => {
	const [io, ioInView] = useInView({ triggerOnce: false })


	const d = new Date()
	const year = d.getFullYear()

	const logo = {
		url: '/logo-footer.png',
		alt: 'Sanguich Logo',
		width: 500,
		height: 200
	}

	return (
		<footer ref={io} id='master-footer' className={`frs-grid-full relative border-type-1 c5  is-inview ${ioInView ? 'inview' : ''}`}>
			<div className='frs-grid'>
				<div className='flex flex-col items-center max-md:pt-13'>
					<div className="decor-wrap">
						<div className="decor-top with-extra">
							<div className="decor-top-left"></div>
							<div className="decor-top-center with-extra">
								<div className="decor-top-center-extra-left"></div>
								<div className="decor-top-center-extra-right"></div>
							</div>
							<div className="decor-top-right"></div>
						</div>
						<div className="decor-center">
							<div className="decor-center-left"></div>
							<div className="decor-center-right"></div>
						</div>
						<div className="decor-bottom">
							<div className="decor-bottom-left"></div>
							<div className="decor-bottom-center with-extra">
								<div className="decor-bottom-center-extra-left"></div>
								<div className="decor-bottom-center-extra-right"></div>
							</div>
							<div className="decor-bottom-right"></div>
						</div>
					</div>
					{logo ?
						<LoadImage
							width={500}
							height={200}
							alt={logo?.alt}
							src={logo?.url}
							className="max-w-[20rem] w-full h-auto [&_img]:!relative"
						/>
						: null}

					<div id="contact" className="contact padd-2 ">
						<Newsletter />
					</div>
					<div className="footer-navi uppercase">
						<p className="font3 h6 font-thin"><a href="https://www.facebook.com/sanguichdemiami/" target="_blank" rel="noreferrer noopener">FaceBook</a></p>
						<p className="font3 h6 font-thin"><a href="https://www.instagram.com/sanguichdemiami/" target="_blank" rel="noreferrer noopener">Instagram</a></p>
						<p className="font3 h6 font-thin">
							<Link href="/careers">Careers</Link>
						</p>
					</div>
					<p className='my-[1.25rem] font1 uppercase text-xl md:text-2xl text-[#e0b981]'>Show us some love on:</p>
					
					<div className="footer-navi uppercase">
					<p className="font3 h6 font-thin">
							<a href="https://www.google.com/maps/search/Sanguich/@25.7909184,-80.2627823,13z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDcyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer noopener">Google</a>
						</p>
						<p className="font3 h6 font-thin">
							<a href="https://www.tripadvisor.com/Restaurant_Review-g34438-d13076164-Reviews-Sanguich_De_Miami-Miami_Florida.html" target="_blank" rel="noreferrer noopener">Trip Advisor</a>
						</p>
						<p className="font3 h6 font-thin">
							<a href="https://www.yelp.com/biz/sanguich-miami" target="_blank" rel="noreferrer noopener">Yelp</a>
						</p>

					</div>
					<LoadImage
						width={500}
						height={200}
						alt={"Crafted con Amor"}
						src={'/crafted.png'}
						contain
						className="max-w-[9rem] w-full h-auto [&_img]:!relative my-5"
					/>

					<div className='copy'>
						<p className="uppercase h5 !m-0">SonaÑdo en 2014. Establecido en 2015</p>
						{/* <p className="uppercase h6">Copyright &copy; {year}. SITE BY <a href="https://www.deepsleepstudio.com" title="DeepSleep Studio, a Design and Public Relations agency." target="_blank" style={{ wordSpacing: '.5em' }} className='h5'>ds/s</a>.</p> */}
						<p className="!text-[0.75rem] uppercase h5 pb-1 !m-0 text-[#70b994]">MADE WITH LOVE BY  <a href="https://www.deepsleepstudio.com" title="DeepSleep Studio, a Design and Public Relations agency." target="_blank" className='hover:opacity-60 hover:underline'>DEEPSLEEP STUDIO</a>.</p>

					</div>
				</div>
			</div>
		</footer>
	)
}
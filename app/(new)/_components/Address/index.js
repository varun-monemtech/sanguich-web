'use client'
import { useState, useEffect } from 'react'
import MultiButton from './MultiButton'
import GMap from '@/components/GMap'
import { LoadImage } from '@/components/new/LoadImage'
import Intro from '@/animations/Intro_Framer'
import './style.scss'
import BorderHeading from '../BorderHeading'

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const updateDeviceType = () => {
			const mobile = window.innerWidth < 768 || (window.innerWidth <= 1368 && window.innerHeight < 768)
			setIsMobile(mobile)
		}

		updateDeviceType()
		window.addEventListener('resize', updateDeviceType)

		return () => {
			window.removeEventListener('resize', updateDeviceType)
		}
	}, [])

	return isMobile
}

function AddressNew(props) {
	const [hoveredIndex, setHoveredIndex] = useState(null)
	const [selectedIndex, setSelectedIndex] = useState(null)
	const isMobile = useIsMobile()
	// const [mobileView, setMobileView] = useState('list') // 'list' or 'map'

	const anchor = props.anchor
	const classes = props.classes

	const itemsMap = props.items?.map((node, i) => {
		let image = node.img

		let ph1 = node.phone?.slice(0, 3)
		let ph2 = node.phone?.slice(3, 6)
		let ph3 = node.phone?.slice(6, node.phone.length + 1)
		return (
			<div
				key={i}
				className={`span-12  cursor-pointer flex gap-2 md:gap-3 p-[0.5em] md:py-[1.5em] md:px-[1em] tile grid-item rounded-lg ${(hoveredIndex === i || selectedIndex === i) ? 'hovered' : ''}`}
				onMouseEnter={() => !isMobile && setHoveredIndex(i)}
				onMouseLeave={() => !isMobile && setHoveredIndex(null)}
				onClick={() => setSelectedIndex(i)}
			>

				<div className="span-12-tablet span-5 relative overflow-hidden">
					{image?.url &&
						<LoadImage
							src={image.url}
							width={image.width}
							height={image.height}
							alt={image.alt}
							quality="90"
							className='[&_img]:relative rounded-lg gold-border aspect-[16/10]'
						/>
					}
					{/* {i >= 3 ? <div className='coming-soon'><h2>COMING SOON</h2></div> : null} */}
				</div>
				<div className="content-container span-12-tablet  span-7">
					<h3 className='max-md:!text-sm uppercase font3 heading md:pb-1 !text-md !leading-[1]'>{node.name}</h3>
					<div className='text-sm pt-1'>
					<p className={` uppercase  pb-1`}>
						{node?.map?.place_id ? <a target='_blank' className={`leading-[1.4] ${node.map ? 'border-b border-current' : ''}`} href={`https://www.google.com/maps/place/?q=place_id:${node?.map?.place_id}`} dangerouslySetInnerHTML={{__html: node.address}}></a> : <span className=' block leading-[1.4]' dangerouslySetInnerHTML={{__html: node.address}}></span>}
					</p>
					<p className='pt-1'>
				
						{node.phone ? <a className="lighten-green" href={`tel:${node.phone}`}>{`${ph1} ${ph2} ${ph3} `}</a> : null}
						|
						<a className="green uppercase" href={`mailto:${node.mail}`}>{` ${node.mail}`}</a>
					</p>
					<p className="pt-1 uppercase marg-bottom-off">{node.hours}</p>
					{node.name === "Little Haiti - La Ventanita" ? <p className='text-md pt-1 font-bold'>TAKEOUT ONLY</p> : null}

					</div>
					<div className='span-12 flex pt-2'>
						{/* <MultiButton links={node.links} /> */}
						{node.links?.[1] && 
							<a href={node.links?.[1].url} target='_blank' className='hover:!border-[#3e805f] hover:!bg-[#3e805f] hover:!text-white border !border-white border-solid rounded-md  px-3 py-1  text-sm'>
								<span className='translate-y-[0.1em] relative block uppercase  text-xs leading-[1] vertical-bottom'>{node.links?.[1].title}</span>
							</a>
						}
						
					</div>
				</div>
	

			</div>


		)
	})

	return (
		<>
			{classes ?
				<section id={`section-${anchor}-new`} style={{ zIndex: 101 }} className={`frs-grid content c4  border-type-7  ${classes}  `}>

					{anchor ?
						<div id={anchor} className="anchor"></div>
						: null}
					<BorderHeading>
						<h2 className={`c4 !text-[#dcba7b] font2 px-[0.1em] !m-0 z-[1001]`}>Locations</h2>
					</BorderHeading>

						{/* <div className='mobile-view-switcher'>
							<button
								className={`switcher-btn ${mobileView === 'list' ? 'active' : ''}`}
								onClick={() => setMobileView('list')}
							>
								<span>
								List View

								</span>
							</button>
							<button
								className={`switcher-btn ${mobileView === 'map' ? 'active' : ''}`}
								onClick={() => setMobileView('map')}
							>
								<span>
								Map View
								</span>
							</button>
						</div> */}

						<div className='grid-12 max-md:gap-y-4 md:gap-10'>
							<div className={`main-grid md:bg-[#000] lg:aspect-[3/4] max-md:!p-0  span-12-tablet span-5 rounded-lg padd `}>
								<div className='scroll-container grid-12 lg:h-full lg:overflow-y-auto'>
									{itemsMap}
								</div>
							</div>
							<div className={`max-md:-order-1 span-7 span-12-tablet`}>
								<div className='max-lg:aspect-square lg:w-full lg:h-full  overflow-hidden rounded-lg gold-border'>
									<GMap 
                  allVenues={props.items} 
                  hoveredIndex={hoveredIndex} 
                  setHoveredIndex={setHoveredIndex}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
								</div>
							</div>
						</div>


				</section>
				: null}
		</>
	)
}

export default AddressNew
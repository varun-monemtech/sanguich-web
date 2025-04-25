'use client'
import { useState } from 'react'
import MultiButton from './MultiButton'
import GMap from '@/components/GMap'
import { LoadImage } from '@/components/new/LoadImage'
import Intro from '@/animations/Intro_Framer'
import './style.scss'

function AddressNew(props) {
	const [hoveredIndex, setHoveredIndex] = useState(null)
	const [selectedIndex, setSelectedIndex] = useState(null)
	const [mobileView, setMobileView] = useState('list') // 'list' or 'map'

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
				className={`span-12 flex gap-5 tile grid-item rounded-lg ${(hoveredIndex === i || selectedIndex === i) ? 'hovered' : ''}`}
				onMouseEnter={() => setHoveredIndex(i)}
				onMouseLeave={() => setHoveredIndex(null)}
				onClick={() => setSelectedIndex(i)}
			>

				<div className="span-12-tablet span-5 relative aspect-video rounded-lg gold-border overflow-hidden">
					{image?.url &&
						<LoadImage
							src={image.url}
							width={image.width}
							height={image.height}
							alt={image.alt}
							style={{ objectFit: "cover" }}
							quality="90"
							className=''
						/>
					}
					{/* {i >= 3 ? <div className='coming-soon'><h2>COMING SOON</h2></div> : null} */}
				</div>
				<div className="content-container span-12-tablet mt-2  span-7">
					<h3 className='uppercase font3 heading pb-1'>{node.name}</h3>
					<p className={`uppercase ${node.map ? 'underline' : ''}  m-top-off`}>
						{node?.map?.place_id ? <a target='_blank' href={`https://www.google.com/maps/place/?q=place_id:${node?.map?.place_id}`}>{node.address}</a> : <span className=' block'>{node.address}</span>}
					</p>
					<p>
						{i === 1 ? "NO DINE-IN | " : null}
						{node.phone ? <a className="lighten-green" href={`tel:${node.phone}`}>{`${ph1} ${ph2} ${ph3} `}</a> : null}
						|
						<a className="green uppercase" href={`mailto:${node.mail}`}>{` ${node.mail}`}</a>
					</p>
					<p className="uppercase marg-bottom-off">{node.hours}</p>
					<div className='span-12 flex pt-2'>
						{/* <MultiButton links={node.links} /> */}
						{node.links?.[1] && 
							<a href={node.links?.[1].url} target='_blank' className='hover:!border-[#3e805f] border !border-white border-solid rounded-lg  px-4 py-2  text-sm'>
								<span className='uppercase  text-xs leading-[1] vertical-bottom'>{node.links?.[1].title}</span>
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
					<Intro delay={50}>
						<div className='heading-section'>
							<h2 className="title c4 font2"><span className="capitalize" style={{ textTransform: "none !important" }}>l</span>ocations</h2>
							<div className="decor-wrap">
								<div className="decor-top with-extra">
									<div className="decor-top-left"></div>
									<div className="decor-top-center with-extra">
										<div className="decor-top-center-extra-left"></div>
										<div id="space-logo" className="decor-top-center-extra-center"></div>
										<div className="decor-top-center-extra-right"></div>
									</div>
									<div className="decor-top-right"></div>
								</div>
							</div>
						</div>
						<div className='mobile-view-switcher'>
							<button
								className={`switcher-btn ${mobileView === 'list' ? 'active' : ''}`}
								onClick={() => setMobileView('list')}
							>
								List View
							</button>
							<button
								className={`switcher-btn ${mobileView === 'map' ? 'active' : ''}`}
								onClick={() => setMobileView('map')}
							>
								Map View
							</button>
						</div>

						<div className='grid-12 gap-2'>
							<div className={`main-grid span-12-tablet span-5 rounded-lg padd  ${mobileView === 'list' ? 'mobile-visible' : 'mobile-hidden'}`}>
								<div className='scroll-container grid-12 '>
									{itemsMap}
								</div>
							</div>
							<div className={`span-7 span-12-tablet ${mobileView === 'map' ? 'mobile-visible' : 'mobile-hidden'}`}>
								<div className='aspect-square overflow-hidden rounded-lg gold-border'>
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
					</Intro>


				</section>
				: null}
		</>
	)
}

export default AddressNew
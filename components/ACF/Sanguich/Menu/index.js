'use client'
import React, {useState, useContext} from 'react'
import './style.scss'
import Image from 'next/image'

import { Transition, SwitchTransition } from 'react-transition-group'
import { useInView } from 'react-intersection-observer'
import anime from 'animejs'
import NaviContext from '../../../../context/NaviContext'

function Menu(props) {
	const [io, ioInView] = useInView({ triggerOnce: false })
	const naviContext = useContext(NaviContext)
	const content = props.wysiwyg
	const anchor = props.anchor
	const classes = props.classes
	const image = props.img

  // Animations
	const baseDuration = 150
	const baseDurationQuick = 150
	// Animating fade in/out
	const fadeIn = element => {
   
		anime
			.timeline()
			.add({
				targets: element,
				opacity: [0, 1],
				translateX: ['1em', 0],
				duration: baseDuration,
				easing: 'cubicBezier(.5,.08,.54,.9)',
			})
	}
	const fadeOut = element => {
		anime
			.timeline()
			.add({
				targets: element,
				opacity: [1, 0],
				translateX: [0,'-1em'],
				duration: baseDuration,
				easing: 'cubicBezier(.5,.08,.54,.9)'
			})
	}
	// Animating fade in/out
	const fadeInY = element => {
		anime
			.timeline()
			.add({
				targets: element,
				opacity: [0, 1],
				translateY: ['1em', 0],
				duration: baseDuration,
				easing: 'cubicBezier(.5,.08,.54,.9)',
			})
	}
	const fadeOutY = element => {
		anime
			.timeline()
			.add({
				targets: element,
				opacity: [1, 0],
				translateY: [0,'-1em'],
				duration: baseDuration,
				easing: 'cubicBezier(.5,.08,.54,.9)'
			})
	}
	// Animating fade in/out quick
	const fadeInQuick = element => {
		anime
			.timeline()
			.add({
				targets: element,
				opacity: [0, 1],
				duration: baseDurationQuick,
				easing: 'cubicBezier(.5,.08,.54,.9)',
			})
	}
	const fadeOutQuick = element => {
		anime
			.timeline()
			.add({
				targets: element,
				opacity: [1, 0],
				duration: baseDurationQuick,
				easing: 'cubicBezier(.5,.08,.54,.9)'
			})
	}

	// Menus
	const menus = props.menus

	const [currentTab, setCurrentTab] = useState(0)
	const [currentTabTab, setCurrentTabTab] = useState(0)
	const [currentImage, setCurrentImage] = useState(0)


	// Images
	const ImageCurrent = menus.map((menu, i) => {
		if (i === currentTabTab) {
			const image = menu.items[currentImage]?.img
			return (
				<div key={`menu-images-key-${i}`} >

					{ image ?
              <Image 
                src={image.url}
                width={1200}
                height={1600}
                alt={image.alt}
                style={{objectFit: "cover"}}
                className="image"
                quality="90"
              />
					: null }
				</div>
			)
		}
	})

	// Parent Tabs
	const TabTabPack = menus.map((menu, i) => {

		const numberOfItems = menu.items.length

		if (i === currentTabTab) {
			const ImagesTabPack = menu.items.map((item, i) => {
				if (item.subgroup) {
					return (
						<div key={`menu-items-key-a-${i}`} className="col-1 subgroup fs-85">
							<h4 className="uppercase text-center">{item.subgroup}</h4>
						</div>
					)
				} else {
					return (
						<div key={`menu-items-key-a-${i}`} className={`menu-item onmouseenter ${numberOfItems > 5 ? 'col-2' : ''} ${currentImage === i ? 'current' : null}`} onMouseEnter={() => setCurrentImage(i)} onClick={() => setCurrentImage(i)} onKeyDown={() => setCurrentImage(i)} role="button" tabIndex={0}>
							<div className="description">
								<h6 className="uppercase">{item.name}</h6>
								<p>{item.description}</p>
							</div>
							<div className="price">
								<h6>{item.price ? `$${item.price}` : null}</h6>
							</div>
							{ naviContext?.windowSize?.mobile && currentImage === i ?
								<SwitchTransition>
									<Transition
										key={[currentImage,currentTabTab]}
										timeout={baseDurationQuick}
										appear={true}
										onEntering={fadeInY}
										onExiting={fadeOutY}
									>
										<div className="image">
											{ImageCurrent}
										</div>
									</Transition>
								</SwitchTransition>
							: null }
						</div>
					)
				}
			})
			return (
				<div key={`menu-items-key-b-${i}`} className="menu-specific-wrap">
					<div className={`menu-specific onclick padd-1 ${currentTab === i ? 'current' : null}`}>
						<h4 className="uppercase">{menu.title}</h4>
					</div>
					<div className="menu-specific-items">
						{ImagesTabPack}
					</div>
				</div>
			)
		}
		
		return false
	})

	// GrandParent Tabs
	// const TabTabTabPack = menus.map((menu, i) => {

	// 	return (
	// 		<div className={`menu-general-tabs onlick padd-1 ${currentTabTab === i ? 'current' : null}`} onClick={() => {setCurrentImage(0); onTabTabChange(i)}} onKeyDown={() => {setCurrentImage(0); onTabTabChange(i)}} role="button" tabIndex={0}>
	// 			<h6>{menu.title}</h6>
	// 		</div>
	// 	)
	// })

	// On Parent Tab Change
	function onTabChange(i) {
		setCurrentTab(i)
	}

	// On Grandparent Tab Change
	function onTabTabChange(i) {
		setCurrentTabTab(i)
	}

	// Update Tab Based on Grandparent Change
	// useEffect(() => {
	// 	const newTab = menus.findIndex((e) => e.node.location_type[0] === currentTabTab)
	// 	setCurrentTab(newTab)
	// },[currentTabTab,menus])

  return (
		<>
			{ anchor ? 
				<section ref={io} id={`section-${anchor}`} className={`content c5 grid-12 is-inview ${ioInView ? 'inview' : ''} ${classes}`}>
					
					{anchor ?
						<div id={anchor} className="anchor"></div>
					: null}

					{ image ?
						<Img fluid={image}
							imgStyle={{objectFit: 'cover'}}
							objectPosition='50% 50%'
						/>
					: null }

					<div className='content-box'>
						<div className='content-holder animated'>

							<div className="menu-general">
								<h2 className="menu-title font2"><span className="capitalize">M</span>enu</h2>
								<div
									className={`arrow-prev onmouseenter ${currentTabTab === 0 ? 'disabled' : null}`}
									onClick={() => {
										onTabTabChange((current) => current > 0 ? current - 1 : 0)
										setCurrentImage(0)
									}}
									onKeyDown={() => {
										onTabTabChange((current) => current > 0 ? current - 1 : 0)
										setCurrentImage(0)
									}}
									role="button"
									tabIndex={0}
								></div>
								<div
									className={`arrow-next onmouseenter ${currentTabTab === menus.length - 1 ? 'disabled' : null}`}
									onClick={() => {
										onTabTabChange((current) => current < menus.length - 1 ? current + 1 : menus.length - 1)
										setCurrentImage(0)
									}}
									onKeyDown={() => {
										onTabTabChange((current) => current < menus.length - 1 ? current + 1 : menus.length - 1)
										setCurrentImage(0)
									}}
									role="button"
									tabIndex={0}
								></div>
								
								<div className="decor-wrap">
									<div className="decor-top">
										<div className="decor-top-left"></div>
										<div className="decor-top-center"></div>
										<div className="decor-top-right"></div>
									</div>
									<div className="decor-center">
										<div className="decor-center-left"></div>
										<div className="decor-center-right"></div>
									</div>
									<div className="decor-bottom">
										<div className="decor-bottom-left"></div>
										<div className="decor-bottom-center"></div>
										<div className="decor-bottom-right"></div>
									</div>
								</div>

								{/* <SwitchTransition>
									<Transition
										key={currentTab}
										timeout={baseDuration}
										appear={true}
										onEntering={fadeIn}
										onExiting={fadeOut}
									>
										<>
											{TabTabTabPack}
										</>
									</Transition>
								</SwitchTransition> */}

								<SwitchTransition>
									<Transition
										key={currentTabTab}
										timeout={baseDuration}
										appear={true}
										onEntering={fadeIn}
										onExiting={fadeOut}
									>
										<div className="menu-specific-wrap">
											{TabTabPack}
										</div>
									</Transition>
								</SwitchTransition>
							</div>

							{ !naviContext?.windowSize?.mobile ?

							<div className="menu-specific-item-image c4">
								<SwitchTransition>
									<Transition
										key={[currentImage,currentTabTab]}
										timeout={baseDurationQuick}
										appear={true}
										onEntering={fadeInQuick}
										onExiting={fadeOutQuick}
									>
										<div className="flex center">
											{ImageCurrent}
											{/* <MenuImage { ...menus[currentTab] } /> */}
										</div>
									</Transition>
								</SwitchTransition>
							</div>

							: null }

						</div>
					</div>

				</section>
			: null }
		</>
  )
}

export default Menu
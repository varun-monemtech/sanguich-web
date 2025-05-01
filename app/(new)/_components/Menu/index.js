'use client'
import React, { useState, useContext, useRef } from 'react'
import './style.scss'
import Intro from '@/animations/Intro_Framer'
import { Transition, SwitchTransition } from 'react-transition-group'
import anime from 'animejs'
import NaviContext from '../../../../context/NaviContext'
import { LoadImage } from '@/components/new/LoadImage'
import Link from 'next/link'
import MobileMenu from './MobileMenu'

function Menu(props) {
	const naviContext = useContext(NaviContext)
	const content = props.wysiwyg
	const anchor = props.anchor
	const classes = props.classes
	const image = props.img
	const isMobile = naviContext?.windowSize?.mobile
	
	// If mobile, render the mobile menu instead
	if (isMobile) {
		return <MobileMenu {...props} />
	}

	const nodeRef = useRef(null);
	const nodeRef2 = useRef(null);
	const nodeRef3 = useRef(null);

	// Animations
	const baseDuration = 150
	const baseDurationQuick = 15
	// Animating fade in/out
	const fadeIn = () => {

		anime
			.timeline()
			.add({
				targets: nodeRef2.current,
				opacity: [0, 1],
				translateX: ['1em', 0],
				duration: baseDuration,
				easing: 'cubicBezier(.5,.08,.54,.9)',
			})
	}
	const fadeOut = () => {
		anime
			.timeline()
			.add({
				targets: nodeRef2.current,
				opacity: [1, 0],
				translateX: [0, '-1em'],
				duration: baseDuration,
				easing: 'cubicBezier(.5,.08,.54,.9)'
			})
	}
	// Animating fade in/out
	const fadeInY = () => {
		anime
			.timeline()
			.add({
				targets: nodeRef.current,
				opacity: [0, 1],
				translateY: ['1em', 0],
				duration: baseDuration,
				easing: 'cubicBezier(.5,.08,.54,.9)',
			})
	}
	const fadeOutY = () => {
		anime
			.timeline()
			.add({
				targets: nodeRef.current,
				opacity: [1, 0],
				translateY: [0, '-1em'],
				duration: baseDuration,
				easing: 'cubicBezier(.5,.08,.54,.9)'
			})
	}
	// Animating fade in/out quick
	const fadeInQuick = () => {
		anime
			.timeline()
			.add({
				targets: nodeRef3.current,
				opacity: [0, 1],
				duration: baseDurationQuick,
				easing: 'cubicBezier(.5,.08,.54,.9)',
			})
	}
	const fadeOutQuick = () => {
		anime
			.timeline()
			.add({
				targets: nodeRef3.current,
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
				image ?
					<LoadImage
						key={`menu-images-key-${i}`}
						src={image.url}
						width={image.width}
						height={image.height}
						alt={image.alt}
						// quality={75}
						className='lg:[&_img]:relative aspect-[3/3.5] bg-[#c0b7a8] [&_img]:!duration-[300ms]'
					/>
					: null
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
						<div key={`menu-items-key-a-${i}`} className="col-1 subgroup fs-85 ">
							<h4 className="uppercase text-center ">{item.subgroup}</h4>
						</div>
					)
				} else {
					return (
						<div key={`menu-items-key-a-${i}`} className={`menu-item  cursor-pointer ${numberOfItems > 5 ? 'col-2' : ''} ${currentImage === i ? 'current' : null}`} onMouseEnter={() => setCurrentImage(i)} onClick={() => setCurrentImage(i)} onKeyDown={() => setCurrentImage(i)} role="button" tabIndex={0}>
							<div className="description text-center">
								<h4 className="uppercase">{item.name}</h4>
								<p>{item.description}</p>
							</div>
							{/* <div className="price">
								<h4>{item.price ? `$${item.price}` : null}</h4>
							</div> */}
							{naviContext?.windowSize?.mobile && currentImage === i ?
								<SwitchTransition>
									<Transition
										key={[currentImage, currentTabTab]}
										timeout={baseDurationQuick}
										appear={true}
										onEntering={fadeInY}
										onExiting={fadeOutY}
										nodeRef={nodeRef}
									>
										<div ref={nodeRef} className="image bg-[#c0b7a8]">
											{ImageCurrent}
										</div>
									</Transition>
								</SwitchTransition>
								: null}
						</div>
					)
				}
			})
			return (
				<div key={`menu-items-key-b-${i}`} className="menu-specific-wrap">
					<div className={`menu-specific flex flex-col items-center cursor-pointer padd-1 ${currentTab === i ? 'current' : null}`}>
						
						<h3 className=" text-center !p-0 !m-0 !text-[#274F37] font2 !text-[4.5em]">{menu.title}</h3>
						<Link href={`#${menu.title}`} className='btn  hover:opacity-80'>
							<span>ORDER NOW</span>
							</Link>
					</div>
					
					<div className="menu-specific-items max-w-[50rem] mx-auto text-[#274F37]">
						<div className='w-full flex justify-center'>
						<div className='hr-decor' />

						</div>

						{ImagesTabPack}
					</div>
				</div>
			)
		}

		return false
	})


	// // On Parent Tab Change
	// function onTabChange(i) {
	// 	setCurrentTab(i)
	// }

	// On Grandparent Tab Change
	function onTabTabChange(i) {
		setCurrentTabTab(i)
	}


	return (
		<>
			{/* Hidden container for preloading all menu images */}
			<div style={{ display: 'none' }} aria-hidden="true">
				{menus?.map((menu, menuIndex) => (
					menu.items?.map((item, itemIndex) => {
						const image = item?.img
						return image ? (
							<LoadImage
								key={`preload-${menuIndex}-${itemIndex}`}
								src={image.url}
								width={image.width}
								height={image.height}
								alt=""
								loading="lazy"
								priority={false}
							/>
						) : null
					})
				))}
			</div>

			{anchor ?
				<section id={`section-${anchor}`} className={`frs-grid frs-grid-ultrawide bg-[#D0C8B9]  border-type-8 ${classes}`}>
					<Intro delay={50}>
						{anchor ?
							<div id={anchor} className="anchor"></div>
							: null}

						<div className='content-box'>
							<div className='flex max-lg:flex-col animated'>

								<div className="menu-general flex flex-wrap justify-center content-between">
									{/* <h2 className="menu-title text-[4.5em] !text-[#274F37] text-center m-0 lg:pt-8 font2"><span className="capitalize">M</span>enu</h2> */}
									<div
										className={`arrow-prev cursor-pointer ${currentTabTab === 0 ? 'opacity-0 cursor-auto' : null}`}
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
										aria-label='Previous Tab'
									></div>
									<div
										className={`arrow-next cursor-pointer ${currentTabTab === menus.length - 1 ? 'opacity-0 cursor-auto' : null}`}
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
										aria-label='Next Tab'
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

									<SwitchTransition>
										<Transition
											key={currentTabTab}
											timeout={baseDuration}
											appear={true}
											onEntering={fadeIn}
											onExiting={fadeOut}
											nodeRef={nodeRef2}
										>
											<div ref={nodeRef2} className="menu-specific-wrap">
												{TabTabPack}
											</div>
										</Transition>
									</SwitchTransition>
									{/* Slider dots */}
									<div className="slider-dots flex justify-center gap-2 w-full my-4 z-[1001]">
										{menus.map((menu, i) => (
											<div
												key={`slider-dot-${i}`}
												className={`group w-2 h-2  cursor-pointer  `}
												onClick={() => {
													onTabTabChange(i)
													setCurrentImage(0)
												}}
												onKeyDown={(e) => {
													if (e.key === 'Enter' || e.key === ' ') {
														onTabTabChange(i)
														setCurrentImage(0)
													}
												}}
												role="button"
												tabIndex={0}
												aria-label={`Go to menu tab ${menu.title}`}
											>

												<span className={`block w-full h-full  transition-all duration-300 rounded-full ${currentTabTab === i ? 'bg-[#274F37] scale-110' : 'bg-[#8B8476] group-hover:bg-[#274F37]/50'}`}></span>
											</div>
										))}
									</div>
								</div>

								{!naviContext?.windowSize?.mobile ?

									<div className="relative basis-[42%] max-lg:pb-[56%] max-lg:flex-col c4 !bg-[#c0b7a8]">
										<SwitchTransition>
											<Transition
												key={[currentImage, currentTabTab]}
												timeout={baseDurationQuick}
												appear={true}
												onEntering={fadeInQuick}
												onExiting={fadeOutQuick}
												nodeRef={nodeRef3}
											>
												<div ref={nodeRef3} className="">
													{ImageCurrent}
												</div>
											</Transition>
										</SwitchTransition>
									</div>

									: null}

							</div>
						</div>
					</Intro>
				</section>
				: null}
		</>
	)
}

export default Menu
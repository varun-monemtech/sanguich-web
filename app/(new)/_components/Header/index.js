'use client'
import React, { useContext, useRef, useState, useEffect } from 'react'
import './style.scss'
import NaviContext from '@/context/NaviContext'
import { Transition } from 'react-transition-group'
import anime from 'animejs'
import { useScroll } from 'framer-motion'
import Link from 'next/link'

import Hamburger from './Hamburger'
import CartIndicator from './CartIndicator'
import Navi from './Navi'
import Logo from './Logo'
import SocialIcons from '@/components/SocialIcons'
import { usePathname } from 'next/navigation'
function Header(props) {
	const naviContext = useContext(NaviContext)
	const nodeRef1 = useRef(null);
	const nodeRef2 = useRef(null);
	const nodeRef3 = useRef(null);
	const nodeRef4 = useRef(null); // Ref for Order Now button

	const pathname = usePathname()
	const showHeaderBarBasedOnPath = pathname.startsWith('/news') || pathname === '/about'

	// Use Framer Motion's useScroll hook to track scroll position
	const { scrollY } = useScroll();
	const [showHeaderBar, setShowHeaderBar] = useState(false);

	// Update headerBar visibility based on scroll position
	useEffect(() => {
		const unsubscribe = scrollY.on('change', (latest) => {
			// Show header bar when scrolled past a threshold (e.g., 100px)
			setShowHeaderBar(latest > 100);
		});

		return () => unsubscribe();
	}, [scrollY]);

	// Animating fade in/out
	const baseDuration = 500
	const fadeInLogo = element => {
		const links = nodeRef1.current.querySelectorAll('.nav-item, .social-icons a')
		anime
			.timeline()
			.add({
				targets: nodeRef1.current,
				opacity: [0, 1],
				//translateX: [-100, 0],
				duration: baseDuration,
				easing: 'easeInOutSine',
			})
			.add({
				targets: links,
				opacity: [0, 1],
				translateX: [-32, 0],
				duration: baseDuration / 2,
				easing: 'easeInOutSine',
				delay: anime.stagger(75)
			}, `-=${baseDuration / 3}`)
	}
	const fadeOutLogo = element => {
		anime
			.timeline()
			.add({
				targets: nodeRef1.current,
				opacity: [1, 0],
				duration: baseDuration / 2,
				easing: 'linear'
			})
	}

	const fadeInBg = element => {
		anime
			.timeline()
			.add({
				targets: nodeRef2.current,
				opacity: [0, 1],
				translateY: [-100, 0],
				duration: baseDuration,
				easing: 'easeOutSine',
			})
	}
	const fadeOutBg = element => {
		anime
			.timeline()
			.add({
				targets: nodeRef2.current,
				opacity: [1, 0],
				translateY: [0, -100],
				duration: baseDuration / 2,
				easing: 'linear'
			})
	}

	const fadeIn = element => {
		anime
			.timeline()
			.add({
				targets: nodeRef3.current,
				opacity: [0, 1],
				duration: baseDuration,
				easing: 'easeInOutSine',
			})
	}
	const fadeOut = element => {
		anime
			.timeline()
			.add({
				targets: nodeRef3.current,
				opacity: [1, 0],
				duration: baseDuration / 2,
				easing: 'linear'
			})
	}

	// Animation for Order Now button
	const slideInOrderBtn = element => {
		anime({
			targets: nodeRef4.current,
			translateY: [-50, 0],
			opacity: [0, 1],
			duration: baseDuration / 2,
			easing: 'easeOutSine'
		})
	}

	const slideOutOrderBtn = element => {
		anime({
			targets: nodeRef4.current,
			translateY: [0, -50],
			opacity: [1, 0],
			duration: baseDuration / 2,
			easing: 'easeInSine'
		})
	}

	return (
		<>
			{!naviContext.windowSize?.mobile ?
				<div className='frs-grid-full'>
					<Hamburger />
				</div>
				: null}

			{/* Order Now button for mobile with animation */}
			<Transition
				in={naviContext.windowSize?.mobile && showHeaderBar}
				timeout={baseDuration / 2}
				appear={true}
				onEntering={slideInOrderBtn}
				onExiting={slideOutOrderBtn}
				mountOnEnter
				unmountOnExit
				nodeRef={nodeRef4}
			>
				<div ref={nodeRef4} className="fixed z-500 w-full flex justify-center top-[60px] drop-shadow-[0_-2rem_0_#2b4b2e]">
					<Link href="/#order" className="w-full py-2 px-6 bg-[#2b4b2e] uppercase font-intensa text-[#D0C8B9] text-center font-bold drop-shadow-[0_3px_6px_rgba(0,0,0,0.16)]">
						<h5>
							Order Now
						</h5>
					</Link>
				</div>
			</Transition>

			<Transition
				in={naviContext.isHamburgerActive && !naviContext.windowSize?.mobile ? true : false}
				timeout={baseDuration}
				appear={true}
				onEntering={fadeInLogo}
				onExiting={fadeOutLogo}
				mountOnEnter
				unmountOnExit
				nodeRef={nodeRef1}
			>
				<header ref={nodeRef1} className={'frs-grid-full master-header border-type-1 skip-animation c5'}>

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
					<div className='frs-grid frs-grid-wider h-full'>
						<div className={`navi-animator`}>

							<div role='navigation' id='navi' className="navi-wrap">
								<Logo />
								<Navi {...props} />
							</div>
							<SocialIcons />
							<div className='absolute right-[6em] top-[6em]'>
								<Hamburger />
							</div>

						</div>
					</div>
				</header>
			</Transition>


			<Transition
				in={naviContext.windowSize?.mobile || showHeaderBar || showHeaderBarBasedOnPath ? true : false}
				timeout={baseDuration}
				appear={true}
				onEntering={fadeInBg}
				onExiting={fadeOutBg}
				mountOnEnter
				unmountOnExit
				nodeRef={nodeRef2}
			>
				<div ref={nodeRef2} className={`frs-grid-full header-bar-new rounded-b-[37px] drop-shadow-[0_3px_6px_rgba(0,0,0,0.16)] c5 max-md:!bg-[#D0C8B9] md:border-2 md:border-[#DCBA7B] ${naviContext.windowSize?.mobile ? 'onmobile' : ''} ${naviContext.isHamburgerActive ? 'open inview' : ''}`}>
					<div className='frs-grid  '>
						<div role='navigation' id='navi-bar' className={`regular  ${naviContext.windowSize?.mobile ? 'onmobile' : ''}`}>
							{naviContext.windowSize?.mobile ?
								<Hamburger />
								: null}
							<Logo />
							{!naviContext.windowSize?.mobile ?
								<div className="header-bar-navi-new  " onMouseLeave={() => naviContext.setActive(false)}>
									<Navi {...props} />
								</div>
								: null}
							{!naviContext.windowSize?.mobile ?
								<CartIndicator />
								: null}
						</div>
					</div>
					<Transition
						in={naviContext.windowSize?.mobile && naviContext.isHamburgerActive ? true : false}
						timeout={baseDuration}
						appear={true}
						onEntering={fadeIn}
						onExiting={fadeOut}
						mountOnEnter
						unmountOnExit
						nodeRef={nodeRef3}
					>
						<div ref={nodeRef3} className="mobile c5 border-type-1">
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
							<div className="navi-wrap">
								<Navi {...props} />
								<SocialIcons />
							</div>
						</div>
					</Transition>
				</div>
			</Transition>

		</>
	)
}

export default Header
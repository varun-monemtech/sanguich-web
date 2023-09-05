'use client'
import React, {useContext, useEffect} from 'react'
import './style.scss'
import NaviContext from '../../context/NaviContext'
import { Transition } from 'react-transition-group'
import anime from 'animejs'

import Hamburger from './Hamburger'
import CartIndicator from './CartIndicator'
import Navi from './Navi'
import Logo from './Logo'
import SocialIcons from '../SocialIcons'

function Header(props) {
	const naviContext = useContext(NaviContext)

	// Animating fade in/out
	const baseDuration = 500
	const fadeInLogo = element => {
		const links = element.querySelectorAll('.nav-item, .social-icons a')
		anime
			.timeline()
			.add({
				targets: element,
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
				targets: element,
				opacity: [1, 0],
				duration: baseDuration / 2,
				easing: 'linear'
			})
	}

	const fadeIn = element => {
		anime
			.timeline()
			.add({
				targets: element,
				opacity: [0, 1],
				duration: baseDuration,
				easing: 'easeInOutSine',
			})
	}
	const fadeOut = element => {
		anime
			.timeline()
			.add({
				targets: element,
				opacity: [1, 0],
				duration: baseDuration / 2,
				easing: 'linear'
			})
	}

  return (
		<>
			{!naviContext.windowSize?.mobile ?
				<Hamburger />
			: null }

			<Transition
				in={naviContext.isHamburgerActive && !naviContext.windowSize?.mobile ? true :	false}
				timeout={baseDuration}
				appear={true}
				onEntering={fadeInLogo}
				onExiting={fadeOutLogo}
				mountOnEnter
				unmountOnExit
			>
				<header className={'master-header border-type-1 skip-animation c5'}>
			
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
					
					<div className={`navi-animator`}>
					
						<div className="navi-wrap">
							<Logo />
							<Navi {...props} />
						</div>
						<SocialIcons />
						<Hamburger />

					</div>
				</header>
			</Transition>
		
			
			<Transition
				in={naviContext.windowSize?.mobile || !naviContext.beforeHeaderBreakpoint ? true :	false}
				timeout={baseDuration}
				appear={true}
				onEntering={fadeIn}
				onExiting={fadeOut}
				mountOnEnter
				unmountOnExit
			>
				<div className={`header-bar-new ${naviContext.windowSize?.mobile ? 'onmobile' : ''} ${naviContext.isHamburgerActive ? 'open inview' : ''}`}>
					<div className={`regular c5 ${naviContext.windowSize?.mobile ? 'onmobile' : ''}`}>
						{naviContext.windowSize?.mobile ?
							<Hamburger />
						: null }
						<Logo />
						{!naviContext.windowSize?.mobile ?
							<div className="header-bar-navi-new c5"  onMouseLeave={() => naviContext.setActive(false)}>
								<Navi {...props} />
							</div>
						: null }
						{!naviContext.windowSize?.mobile ?
							<CartIndicator />
						: null }
					</div>

					<Transition
						in={naviContext.windowSize?.mobile && naviContext.isHamburgerActive ? true :	false}
						timeout={baseDuration}
						appear={true}
						onEntering={fadeIn}
						onExiting={fadeOut}
						mountOnEnter
						unmountOnExit
					>
						<div className="mobile c5 border-type-1">
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
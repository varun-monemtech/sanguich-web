import React, {useContext, useEffect} from 'react'
import './style.scss'
import NaviContext from '../../../context/NaviContext'
import { Transition } from 'react-transition-group'
import anime from 'animejs'

import Logo from '../Logo'

function Hamburger(props) {
	const naviContext = useContext(NaviContext)

	// Keeping track of Header Logo Width
	useEffect(() => {
		const logo = document.getElementById('master-logo')
		const hamburger = document.getElementById('master-hamburger-container')
	}, [])

	// Animations
	const baseDuration = 500
	// Animating fade in/out
	const fadeInLogo = element => {
		const hamburger = document.getElementById('master-hamburger-container')
		const mainframe = document.getElementById('mainframe')
		const mainframecover = document.getElementById('mainframe-cover')
		const mainframestripes = document.getElementById('mainframe-stripes')
		const mainframecoverbg = document.getElementById('mainframe-bg-overlay')
		anime
			.timeline()
			.add({
				targets: element,
				opacity: [0, 1],
				delay: baseDuration,
				duration: baseDuration / 2,
				easing: 'easeInOutSine',
			})
			.add({
				targets: mainframe,
				translateX: [0, '10%'],
				duration: baseDuration * .75,
				easing: 'easeInOutSine',
			}, `-=${baseDuration}`)
			.add({
				targets: mainframecoverbg,
				opacity: [0, 1],
				duration: baseDuration * .75,
				easing: 'easeInOutSine'
			}, `-=${baseDuration}`)
			.add({
				targets: element.parentElement.parentElement,
				translateX: ['-100%', 0],
				duration: baseDuration / 2,
				easing: 'easeInOutSine'
			}, `-=${baseDuration}`)
			.add({
				targets: mainframestripes,
				translateX: ['-120%', 0],
				duration: baseDuration * 2,
				easing: 'easeInOutSine',
				delay: function(el, i) {
					el.classList.add('inview-rn')
					mainframecover.classList.add('active')
					mainframe.classList.remove('active')
					return 0
				}
			}, `-=${baseDuration}`)
	}
	const fadeOutLogo = element => {
		const hamburger = document.getElementById('master-hamburger-container')
		const mainframe = document.getElementById('mainframe')
		const mainframecover = document.getElementById('mainframe-cover')
		const mainframestripes = document.getElementById('mainframe-stripes')
		const mainframecoverbg = document.getElementById('mainframe-bg-overlay')
		anime
			.timeline()
			.add({
				targets: mainframestripes,
				translateX: [0, '120%'],
				duration: baseDuration,
				easing: 'easeInOutSine',
				delay: function(el, i) {
					el.classList.remove('inview-rn')
					return 0
				}
			})
			.add({
				targets: element,
				opacity: [1, 0],
				duration: baseDuration * .75,
				easing: 'easeInOutSine'
			})
			.add({
				targets: mainframe,
				translateX: ['10%', 0],
				duration: baseDuration * .75,
				easing: 'easeInOutSine'
			}, `-=${baseDuration}`)
			.add({
				targets: mainframecoverbg,
				opacity: [1, 0],
				duration: baseDuration * .75,
				easing: 'easeInOutSine'
			}, `-=${baseDuration}`)
			.add({
				targets: element.parentElement.parentElement,
				translateX: [0, '-100%'],
				duration: baseDuration * .75,
				easing: 'easeInOutSine',
				delay: function(el, i) {
					mainframe.classList.add('active')
					setTimeout(() => {
						mainframecover.classList.remove('active')
					}, baseDuration * 2);
					return 0
				}
			}, `-=${baseDuration}`)
	}
	
  return (
		<div className="master-hamburger is-inview inview" onClick={() => { naviContext.activeToggle(true); naviContext.hamburgerActiveToggle(true)}} onKeyDown={() => { naviContext.activeToggle(true); naviContext.hamburgerActiveToggle(true)}} role="button" tabIndex={0}>
			<div className={`master-hamburger-container x0 t`}>
				<div className={`hamburger-container hamburger hamburger--close1 ${naviContext.isHamburgerActive ? 'open x1 t' : null }`}>
					<div className="hamburger__icon">
						<div className="hamburger__line hamburger__line--1"></div>
						<div className="hamburger__line hamburger__line--2"></div>
						<div className="hamburger__line hamburger__line--3"></div>
					</div>
				</div>
			</div>
		</div>
  )
}

export default Hamburger
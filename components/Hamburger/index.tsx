'use client'

import React, {useContext} from 'react'
import './style.scss'
import NaviContext from '../../context/NaviContext'

// import Logo from '../Logo'

export const Hamburger = () => {
	const naviContext: any = useContext(NaviContext)

  return (
			<div
				className="c5 master-hamburger h-full"
				onClick={
					() => {
						naviContext.activeToggle(true)
						naviContext.hamburgerActiveToggle(true)
						// console.log('click')
					}
				}
				onKeyDown={
					() => {
						naviContext.activeToggle(true)
						naviContext.hamburgerActiveToggle(true)
						// console.log('keydown')
					}
				}
				role="button"
				tabIndex={0}
			>
				<div className="cover"></div>
				<div className="master-hamburger-positioner">
					<span className="sr-only">Toggle menu</span>
					<div className="master-hamburger-container">
						<div className={`hamburger-container hamburger hamburger--close1 ${naviContext?.isHamburgerActive ? 'open' : null }`}>
							<div className="hamburger__icon">
								<div className="hamburger__line hamburger__line--1"></div>
								<div className="hamburger__line hamburger__line--2"></div>
								<div className="hamburger__line hamburger__line--3"></div>
							</div>
						</div>
					</div>
				</div>
				{/* <Logo /> */}
			</div>
  )
}
'use client'

import React, {useContext} from 'react'
import './style.scss'
import NaviContext from '../../context/NaviContext'


export const Loader = ({className: classes}: {className: string}) => {
	const naviContext: any = useContext(NaviContext)

  return (
		<div
			className={`preloader-positioner ${classes}`}
			// onClick={
			// 	() => {
			// 		naviContext.activeToggle(true)
			// 		naviContext.hamburgerActiveToggle(true)
			// 		// console.log('click')
			// 	}
			// }
			// onKeyDown={
			// 	() => {
			// 		naviContext.activeToggle(true)
			// 		naviContext.hamburgerActiveToggle(true)
			// 		// console.log('keydown')
			// 	}
			// }
			// role="button"
			// tabIndex={0}
		>
			<div className="preloader">
				<div className="layer-0"></div>
				<div className="layer-1"></div>
				<div className="layer-2"></div>
				<div className="layer-3"></div>
				<div className="layer-4"></div>
				<div className="layer-5"></div>
				<div className="layer-6"></div>
			</div>
		</div>
  )
}
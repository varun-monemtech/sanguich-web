'use client'

import React, {useContext} from 'react'
import './style.scss'
import NaviContext from '../../context/NaviContext'
import Link from 'next/link'

// import Logo from '../Logo'

export const Logo = () => {
	const naviContext: any = useContext(NaviContext)

  return (
		<Link href={'/'} 
			className="c5 master-logo h-full no-underline"
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
			<span>Sanguich</span>
		</Link>
  )
}
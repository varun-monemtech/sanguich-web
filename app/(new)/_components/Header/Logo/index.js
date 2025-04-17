'use client'
import React, { useContext } from 'react'
import './style.scss'
import NaviContext from '@/context/NaviContext'
import Link from 'next/link'

function Logo() {
	const naviContext = useContext(NaviContext)

  return (
		<Link href="/" className='logo master-logo' onClick={() => naviContext.setHamburgerActive(false)} aria-label='Go To Homepage' title='Go To Homepage'>
			<div className="aspect-ratio"></div>
		</Link>
  )
}

export default Logo
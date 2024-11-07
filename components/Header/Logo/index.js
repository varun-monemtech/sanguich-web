import React from 'react'
import './style.scss'
//import NaviContext from '../../../context/NaviContext'
import Link from 'next/link'

function Logo(props) {
	//const naviContext = useContext(NaviContext)

  return (
		<Link href="/" className='logo master-logo' aria-label='Go To Homepage' title='Go To Homepage'>
			<div className="aspect-ratio"></div>
		</Link>
  )
}

export default Logo
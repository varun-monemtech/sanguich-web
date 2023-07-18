import React from 'react'
import './style.scss'
//import NaviContext from '../../../context/NaviContext'
import Link from 'next/link'

function Logo(props) {
	//const naviContext = useContext(NaviContext)

  return (
		<Link href="/" className='logo master-logo'>
			<div className="aspect-ratio"></div>
		</Link>
  )
}

export default Logo
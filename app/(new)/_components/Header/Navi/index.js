import React, { useContext } from 'react'
import './style.scss'
import NaviContext from '@/context/NaviContext'
//import { Transition, TransitionGroup } from 'react-transition-group'
//import anime from 'animejs'

import NaviPrimary from './Primary'

function Navi(props) {
	const naviContext = useContext(NaviContext)

  return (
		<>
			<NaviPrimary { ...props } />
		</>
  )
}

export default Navi
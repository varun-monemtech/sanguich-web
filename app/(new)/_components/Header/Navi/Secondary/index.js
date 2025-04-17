import React, { useContext } from 'react'
import './style.scss'
import NaviContext from '../../../../context/NaviContext'
import { Link } from 'gatsby'
//import { Transition, TransitionGroup } from 'react-transition-group'
//import anime from 'animejs'

function NaviSecondary(props) {
	const naviContext = useContext(NaviContext)

  return (
		<>
			Secondary
		</>
  )
}

export default NaviSecondary
import React, { useContext } from 'react'
import './style.scss'
import NaviContext from '@/context/NaviContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
//import { Transition, TransitionGroup } from 'react-transition-group'
//import anime from 'animejs'

function NaviItem(props) {
	const naviContext = useContext(NaviContext)

	const id = props.id
	const label = props.label
	const title = props.title
	const description = props.description

	// disabled flag
	let enabled = true
	const classes = props?.cssClasses?.map((cssClass) => {
		// if one of the classes is disabled, set the flag
		if (cssClass === 'disabled') {
			enabled = false
		}
		// if it has description, add the hint classes
		if (description) {
			return cssClass + ' hint--rounded hint--bottom'
		} else {
			return cssClass
		}
	}).join(' ')

	const target = props.target
	const path = props.url
	const parentId = props.parentId
	const internal = true //props.connectedNode
	const dropDownClickHandle = props.dropDownClickHandle

	// if ( internal ) {
	// 	return (
	// 		<div
	// 			key={id}
	// 			className={`nav-item ${classes} ${parentId ? 'sub' : ''}`}
	// 			data-hint={description}
	// 		>
	// 			{enabled ?
	// 				<Link
	// 					href={path}
	// 					onClick={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
	// 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
	// 					// onClick={dropDownClickHandle}
	// 					className="linking-int"
	// 				>
	// 					{label}
	// 					{props.itHasChildren ? <FontAwesomeIcon icon={faAngleDown} className="caret" /> : null}
	// 				</Link>
	// 			:
	// 				<div className="disabled">
	// 					{label}
	// 					{props.itHasChildren ? <FontAwesomeIcon icon={faAngleDown} className="caret" /> : null}
	// 				</div>
	// 			}
	// 			{props.children}
	// 		</div>
	// 	)
	// }

	return (
		<div
			key={id}
			className={`nav-item ${classes} ${parentId ? 'sub' : ''}`}
			data-hint={description}
		>
			{enabled ?
        <div className='wrapper'>
					{!path.startsWith('#location-') ? (
          <Link
            href={path}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : null}
            onMouseEnter={props.itHasChildren ?  dropDownClickHandle : null }
            onClick={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
            onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
            className="linking-ext font-outline-custom"
          >
            {label}
          </Link>
					) : (
						<a href={path} target={target} rel={target === '_blank' ? 'noopener noreferrer' : null} onMouseEnter={props.itHasChildren ?  dropDownClickHandle : null } onClick={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }} onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }} className="linking-ext font-outline-custom">
							{label}
						</a>
					)}
					{/* @ts-ignore */}
          {props.itHasChildren ? <FontAwesomeIcon  onClick={props.itHasChildren ? dropDownClickHandle : null} icon={faAngleDown} className={`caret  ${props.isOpen ? 'open' : ""}`} /> : null}
        </div>
			:
				<div className="disabled">
					{label}
					{/* @ts-ignore */}
					{props.itHasChildren ? <FontAwesomeIcon icon={faAngleDown} className="caret" /> : null}
				</div>
			}
			{props.children}
		</div>
	)
}

export default NaviItem
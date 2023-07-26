import React, { useContext, useState } from 'react'
import './style.scss'
import NaviContext from '../../../../context/NaviContext'

import NaviItem from '../NaviItem'
import { Transition } from 'react-transition-group'
import anime from 'animejs'
import Link from 'next/link'

function NaviPrimary(props) {
	const naviContext = useContext(NaviContext)
	const [dropDown, setDropDown] = useState([])

	// Animating fade in/out
	const baseDuration = 500
	const fadeInLogo = element => {
		const links = element.querySelectorAll('.nav-item')
		anime
			.timeline()
			.add({
				targets: element,
				opacity: [0, 1],
				translateY: [-10, 0],
				duration: baseDuration,
				easing: 'easeInOutSine',
			})
			.add({
				targets: links,
				opacity: [0, 1],
				duration: baseDuration,
				easing: 'easeInOutSine',
				delay: anime.stagger(300)
			}, `-=${baseDuration/2}`)
	}
	const fadeOutLogo = element => {
		anime
			.timeline()
			.add({
				targets: element,
				opacity: [1, 0],
				duration: baseDuration / 2,
				easing: 'linear'
			})
	}

	// Menu feed
	const menuNodes = props.wpgraphql?.wpNaviPrimary?.nodes[0]?.menuItems.nodes
	
	// Re-organized menu feed
	let usedNodes = [
		[]
	]

	function executeDropDown(e,lvl,id) {
		e.preventDefault()
		// Copy parents
		let newArr = [...dropDown]
		// Set currently open
		newArr[lvl] = id
		// Cut the already open subitems, if we're rolling back
		newArr.length = lvl + 1
		// Put into state
		setDropDown(newArr)
	}

	function executeBlur(e) {
		if ( !e.currentTarget.contains( e.relatedTarget ) ) {
			setDropDown([])
    }
	}

	// Mark navi items that have children
	function markParent(id, array) {
		for (var key in array) {
			if(array.hasOwnProperty(key)) {
				array[key].map((item) => {
					if(item.id === id) {
						return item['itHasChildren'] = id
					}
				})
			}
		}
	}

	// Organize all menu items into arrays of parents
	function organizeMenuNodes(item) {
		const parent = item.parentId

		if(parent) {
			// Mark navi item that have children
			markParent(parent, usedNodes)
			// Has parent that already has its array, add to it
			if(usedNodes[parent]) {
				usedNodes[parent].push(item)
			// Has parent that doesn't have its array, create array for said parent, put it there
			} else {
				usedNodes[parent] = [item]
			}
		// No parents (First level)
		} else {
			usedNodes[0].push(item)
		}

		return item
	}

	const menuNodesMap = menuNodes?.map(organizeMenuNodes)

	function menuServe(naviNodes, key, lvl) {
		let result = []
		lvl++
		
		result.push(naviNodes[key].map((item) => {
			return [(
				<NaviItem
					key={item.id}
					{ ...item }
					dropDownClickHandle={item.itHasChildren ? (e) => executeDropDown(e,lvl,item.id) : () => { 
						setDropDown([])
						naviContext.setActive(false)
						naviContext.setHamburgerActive(false)
					}}
				>
					{item.itHasChildren && dropDown[lvl] === item.id ?
					<Transition
						in={naviContext.isActive ? true :	false}
						timeout={baseDuration}
						appear={true}
						onEntering={fadeInLogo}
						onExiting={fadeOutLogo}
						mountOnEnter
						unmountOnExit
					>
						<div className={`sub-nav-items level-${lvl}`}>
							{menuServe(naviNodes, item.itHasChildren, lvl)}
						</div>
					</Transition>
					: null}
				</NaviItem>
			)]
		}))

		return result
	}

  return (
		<nav className='navi navi-primary'>
			<div
				className='navi-items font1'
				onBlur={(e) => executeBlur(e)}
			>
				{menuServe(usedNodes, 0, 0)}
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<Link href="#homepage-menu" scroll={false}>Menu</Link>
				</div>
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<Link href="#order-now" scroll={false}>Order Online</Link>
				</div>
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<Link href="#catering" scroll={false}>Catering</Link>
				</div>
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<Link href="#address" scroll={false}>Hours &amp; Locations</Link>
				</div>
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<Link href="#our-story" scroll={false}>Our &amp; Story</Link>
				</div>
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<Link href="#news" scroll={false}>News</Link>
				</div>
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<Link href="/contact">Contact</Link>
				</div>
				{/* <div className="nav-item  "><a href="mailto:mail@mail.mail">Contact Us</a></div> */}
			</div>
		</nav>
  )
}

export default NaviPrimary
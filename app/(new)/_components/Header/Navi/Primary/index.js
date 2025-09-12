'use client'
import React, { useContext, useState, useRef } from 'react'
import './style.scss'
import NaviContext from '@/context/NaviContext'

import NaviItem from '../NaviItem'
import { Transition } from 'react-transition-group'
import anime from 'animejs'
import Link from 'next/link'

function NaviPrimary(props) {
	const naviContext = useContext(NaviContext)
	const [dropDown, setDropDown] = useState([])
	const nodeRef = useRef(null);
	// Animating fade in/out
	const baseDuration = 500
	const fadeInLogo = element => {
		const links = nodeRef.current.querySelectorAll('.nav-item')
		anime
			.timeline()
			.add({
				targets: nodeRef.current,
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
				delay: anime.stagger(100)
			}, `-=${baseDuration/3}`)
	}
	const fadeOutLogo = element => {
		anime
			.timeline()
			.add({
				targets: nodeRef.current,
				opacity: [1, 0],
				duration: baseDuration / 2,
				easing: 'linear'
			})
	}

	// Menu feed
	// const menuNodes = props.wpgraphql?.wpNaviPrimary?.nodes[0]?.menuItems.nodes
  const menuNodes = [
		{
      "id": "order-id",
      "label": "Order Now",
      "url": "https://order.sanguich.com/",
      "parentId": null,
			"target": "_blank"
    },
    {
      "id": "menu-id",
      "label": "Our Menu",
      "url": "/#homepage-menu",
      "parentId": null,
    },
    {
      "id": "catering-id",
      "label": "Catering Menu",
      "url": "/#catering",
      "parentId": null,
    },
    {
      "id": "hours-id",
      "label": "Locations",
      "url": "#address",
      "parentId": null,
      "itHasChildren": "little-haiti-id",
    }, 
    {
      "id": "calle-ocho-id",
      "label": "Calle Ocho",
      "url": "#location-1",
      "parentId": "hours-id",
    },
		{
      "id": "little-haiti-id",
      "label": "Little Haiti",
      "url": "#location-2",
      "parentId": "hours-id",
    },

    {
      "id": "coral-gables-id",
      "label": "Coral Gables",
      "url": "#location-3",
      "parentId": "hours-id",
    },
		{
      "id": "bayside-id",
      "label": "Bayside",
      "url": "#location-4",
      "parentId": "hours-id",
    },
		{
      "id": "aventura-id",
      "label": "Aventura",
      "url": "#location-5",
      "parentId": "hours-id",
    },
		{
      "id": "careers-id",
      "label": "Careers",
      "url": "/careers",
      "parentId": null,
    },
    {
      "id": "story-id",
      "label": "Our Ingredients",
      "url": "/#our-story",
      "parentId": null,
    },
		{
      "id": "about-id",
      "label": "About Us",
      "url": "/about",
      "parentId": "story-id",
    },
		// {
		// 	"id": "stories-id",
		// 	"label": "Sanguich Stories",
		// 	"url": "/#our-story",
		// 	"parentId": null,
		// },
    // {
    //   "id": "news-id",
    //   "label": "News",
    //   "url": "/#news",
    //   "parentId": null,
    // },
    // {
    //   "id": "shop-id",
    //   "label": "Shop",
    //   "url": "/#shop",
    //   "parentId": null,
    // },

    {
      "id": "contact-id",
      "label": "Contact",
      "url": "#contact",
      "parentId": null,
    },
  ]
	
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
					dropDownClickHandle={item.itHasChildren ? (e) => {executeDropDown(e,lvl,item.id); naviContext.setActive(true) } : () => { 
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
						nodeRef={nodeRef}
					>
						<div ref={nodeRef} className={`sub-nav-items level-${lvl}`}>
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
				className='navi-items font1 gap-x-4'
				onBlur={(e) => executeBlur(e)}
			>
				{menuServe(usedNodes, 0, 0)}
				{/* <div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<a href="/#homepage-menu">Menu</a>
				</div>
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<a href="/#order-now">Order Online</a>
				</div>
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<a href="/#catering" >Catering</a>
				</div>
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<a href="/#address" >Hours &amp; Locations</a>
				</div>
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<a href="/#our-story" >Our Story</a>
				</div>
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<a href="/#news" >News</a>
				</div>
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<a href="/#shop" >Shop</a>
				</div>
				<div className="nav-item" 	onClick={() => { 
					naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
 					onKeyDown={() => { naviContext.setHamburgerActive(false); naviContext.setActive(false); }}
				>
					<a href="/contact">Contact</a>
				</div> */}
				{/* <div className="nav-item  "><a href="mailto:mail@mail.mail">Contact Us</a></div> */}
			</div>
		</nav>
  )
}

export default NaviPrimary
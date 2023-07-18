'use client'
import React, {useContext} from 'react'

import './style.scss'

import Video from './Video'
import NaviContext from '../../../context/NaviContext'
import { useInView } from 'react-intersection-observer'

function Hero(props) {

  const [io, ioInView] = useInView({ triggerOnce: true })
	const naviContext = useContext(NaviContext)
	const slides = props.slides
	const classes = props.classes
	const anchor = props.anchor
	const min_height = props.min_height

  const SlidesMap = slides?.map((node, i) => {
		const type = node.type
		if (type === 'video') {
			return (
				<Video key={`videohero - ${i}`} { ...node } />
			)
		}
		return false
	})

	return (
		// <section id={`${anchor ? anchor : ''}`} className={`hero is-inview ${classes ? classes : ''} ${naviContext.windowSize?.mobile ? 'onmobile' : ''}`}>
		<section ref={io} id={`${anchor ? anchor : ''}`} className={`hero is-inview ${ioInView ? 'inview' : ''} ${classes ? classes : ''} `}>

			<div className={slides && slides.length > 1 ? 'hero-slider' : 'hero-single'} style={{minHeight: min_height}}>
				{SlidesMap}
			</div>

		</section>
  )
}

export default Hero
import React from 'react'
import Image from 'next/image'

//import PropTypes from 'prop-types'
import './style.scss'

import Slider from "react-slick"
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"

function Gallery(props) {
	const slides = props.nodes
	const settings = {
		dots: false,
		arrows: true,
		infinite: true,
		speed: 800,
		pauseOnFocus: true,
		autoplay: true,
		autoplaySpeed: 8000,
		slidesToShow: 1,
		slidesToScroll: 1,
		accessibility: false,
		fade: false,
		focusOnSelect: true,
		adaptiveHeight: false,
		centerMode: false,
		variableWidth: false
	}

	const SlidesPack = props.images?.map((slide, i) => {
		
		const image = slide.src
		
		return (
			<div key={`slide-${i}`} className="slide x1">
				{ image ?
					<Image src={image}
						width={2560}
						height={1200}
						alt={slide.altText ? slide.altText : 'Shop Item'}
						objectPosition='50% 50%'
						loading='eager'
						className="image"
					/>
				: null }
			</div>
		)
	})

	return (
		<Slider {...settings}>
			{SlidesPack}
		</Slider>
  )
}

export default Gallery
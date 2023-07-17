'use client'
import React from 'react'

import { useInView } from 'react-intersection-observer'

import SlickSlider from 'react-slick'
import './style.scss'
import WPImage from '../Image'
import WPVideo from '../Video'
import WPWYSIWYG from '../WYSIWYG'

interface WPSliderProps {
  _id?: string,
	children?: React.ReactNode,
  animateIn?: Object,
  slug?: any,
  title?: string,
  classes?: string,
  payload?: any,
  aspectRatio?: string,
  aspectRatioResponsive?: string,
  quickHTML?: any,
  inheritedDelay?: string,
  skipAnimation?: boolean,
  fade?: boolean,
  arrows?: boolean,
  dots?: boolean,
  customPaging?: any,
  thumbnails?: boolean,
  controlsLight?: boolean,
  pauseOnFocus?: boolean,
  pauseOnHover?: boolean,
  infinite?: boolean,
  slidesToShow?: number,
  slidesToScroll?: number,
  centerMode?: boolean,
  variableWidth?: boolean,
  transitionSpeed?: number,
  autoplay?: boolean,
  autoplaySpeed?: number,
}

function WPSlider(props: WPSliderProps) {
	const [io, ioInView] = useInView({ triggerOnce: true })
  const {
		_id: id,
		animateIn = { fade: 500 },
		slug,
		//title,
		classes,
		payload: slides,
		aspectRatio,
		aspectRatioResponsive,
		quickHTML,
		inheritedDelay,
    skipAnimation,
    fade,
    arrows,
    dots,
    customPaging,
    //thumbnails,
    controlsLight,
    pauseOnFocus,
    pauseOnHover,
    infinite,
    slidesToShow,
    slidesToScroll,
    centerMode,
    variableWidth,
    transitionSpeed,
    autoplay,
    autoplaySpeed,
	} = props

	// Slider
	//const [refSlider, refSliderInView] = useInView({ triggerOnce: true })

  const SliderArrowNext = ({to, onClick}: {to?: string, onClick?: any}) => {
    return (
      <div role="button" tabIndex={-100} onClick={onClick} onKeyDown={onClick} className={`slider-control-next-positiner hover-trigger`} aria-label={to}>
        {/* <div className="text">NEXT</div> */}
        <div className="icon"></div>
      </div>
    )
  }

  const SliderArrowPrev = ({to, onClick}: {to?: string, onClick?: any}) => {
    return (
      <div role="button" tabIndex={-100} onClick={onClick} onKeyDown={onClick} className={`slider-control-prev-positiner hover-trigger`} aria-label={to}>
        <div className="icon"></div>
        {/* <div className="text">PREVIOUS</div> */}
      </div>
    )
  }


	const settings = {
		fade: fade != null ? fade : false,
		dots: dots != null ? dots : false,
    ...(customPaging && {
      customPaging: function(i: number) {
        return (
          <span>
            {i}
          </span>
        )
      },
    }),
    arrows: arrows != null ? arrows : true,
    pauseOnFocus: pauseOnFocus != null ? pauseOnFocus : true,
    pauseOnHover: pauseOnHover != null ? pauseOnHover : true,
		infinite: infinite != null ? infinite : true,
		speed: transitionSpeed ? transitionSpeed : 500,
		autoplay: autoplay != null ? autoplay : true,
    autoplaySpeed: autoplaySpeed ? autoplaySpeed : 5000,
    nextArrow: <SliderArrowNext to="next"/>,
    prevArrow: <SliderArrowPrev to="prev"/>,
		slidesToShow: slidesToShow ? slidesToShow : 1,
		slidesToScroll: slidesToScroll ? slidesToScroll : 1,
    centerMode: centerMode != null ? centerMode : false,
    variableWidth: variableWidth != null ? variableWidth : false,
    pauseOnDotsHover: true,
		adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
	}


  const nodes = slides?.map((node: any,i: number) => {
		let slide = node
    slide.skipIntro = true
		//console.log('Slide:', slide.content)

    // Prepare Image Slide, be ready for WYSIWYG Blocks
    const image = slide.image ?
      <WPImage payload={slide.image} />
      // <SanityImage
      //   key={`image-${i}`}
      //   {...node}
      //   inheritedAspectRatio={aspectRatio}
      //   inheritedAspectRatioResponsive={aspectRatioResponsive}
      //   image={{asset: {gatsbyImageData: getGatsbyImageData(slide?.image?.asset._id || slide?.image?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
      //   imageResponsive={{asset: {gatsbyImageData: getGatsbyImageData(slide?.imageResponsive?.asset._id || slide?.imageResponsive?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
      // />
    : null

    // Prepare Video Slide, be ready for WYSIWYG Blocks
    const video = slide.video ?
      <WPVideo payload={slide.video} />
      // <SanityVideo
      //   key={`video-${i}`}
      //   {...slide}
      //   inheritedAspectRatio={aspectRatio}
      //   inheritedAspectRatioResponsive={aspectRatioResponsive}
      //   image={{asset: {gatsbyImageData: getGatsbyImageData(slide?.image?.asset._id || slide?.image?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
      //   imageResponsive={{asset: {gatsbyImageData: getGatsbyImageData(slide?.imageResponsive?.asset._id || slide?.imageResponsive?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
      // />
    : null

    // Prepare Content Slide, be ready for WYSIWYG Blocks
    const content = slide.wysiwyg ?
      // <SanityContent key={`content-${i}`} {...slide} />
      <WPWYSIWYG payload={slide.wysiwyg} />
    : null

    return (
      <div key={i} className="slide">
				{image}
        {video}
    		{content}
      </div>
    )
  })

  const slider = 
    <SlickSlider {...settings}>
      {nodes}
    </SlickSlider>
  

	// Returning Section
  return (

		<div
      key={id}
      ref={io}
      className={`slider-wrap ${classes} ${controlsLight ? 'controls-light' : 'controls-dark'}`}
    >

			{slug?.current ?
				<div id={`block-${slug.current}`} className="anchor"></div>
			: null}

      {slider}

			{quickHTML?.code ?
				<div
					dangerouslySetInnerHTML={{ __html: quickHTML.code }}
				/>
			: null }

		</div>

  )
}

export default WPSlider
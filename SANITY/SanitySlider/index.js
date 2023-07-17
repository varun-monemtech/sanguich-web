import React from 'react'

import { useInView } from 'react-intersection-observer'

import Intro from '../../animations/Intro'
import SlickSlider from 'react-slick'
import SanityVideo from '../SanityVideo'
import SanityImage from '../SanityImage'
import SanityContent from '../SanityContent'
import './style.scss'

import { getGatsbyImageData } from 'gatsby-source-sanity'

function SanitySlider(props) {
	const [io, ioInView] = useInView({ triggerOnce: true })
  const {
		_id: id,
		animateIn = { fade: 500 },
		slug,
		//title,
		classes,
		slides,
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

  const sanityProjectId = process.env.GATSBY_SANITY_PROJECT_ID
  const sanityDataset = process.env.GATSBY_SANITY_DATASET

	// Slider
	//const [refSlider, refSliderInView] = useInView({ triggerOnce: true })

  const SliderArrowNext = ({to, onClick}) => {
    return (
      <div role="button" tabIndex={-100} onClick={onClick} onKeyDown={onClick} className={`slider-control-next-positiner hover-trigger`} aria-label={to}>
        {/* <div className="text">NEXT</div> */}
        <div className="icon"></div>
      </div>
    )
  }

  const SliderArrowPrev = ({to, onClick}) => {
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
      customPaging: function(i) {
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


  const nodes = slides?.map((node,i) => {
		let slide = node
    slide.skipIntro = true
		//console.log('Slide:', slide.content)

    // Prepare Image Slide, be ready for WYSIWYG Blocks
    const image = slide._type === 'builderImage' ?
      <SanityImage
        key={`image-${i}`}
        {...node}
        inheritedAspectRatio={aspectRatio}
        inheritedAspectRatioResponsive={aspectRatioResponsive}
        image={{asset: {gatsbyImageData: getGatsbyImageData(slide?.image?.asset._id || slide?.image?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
        imageResponsive={{asset: {gatsbyImageData: getGatsbyImageData(slide?.imageResponsive?.asset._id || slide?.imageResponsive?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
      />
    : node.__typename === 'SanityBuilderImage' ?
      <SanityImage key={`image-${i}`} {...node} inheritedAspectRatio={aspectRatio} inheritedAspectRatioResponsive={aspectRatioResponsive} />
    : null

    // Prepare Video Slide, be ready for WYSIWYG Blocks
    const video = slide._type === 'builderVideo' ?
      <SanityVideo
        key={`video-${i}`}
        {...slide}
        inheritedAspectRatio={aspectRatio}
        inheritedAspectRatioResponsive={aspectRatioResponsive}
        image={{asset: {gatsbyImageData: getGatsbyImageData(slide?.image?.asset._id || slide?.image?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
        imageResponsive={{asset: {gatsbyImageData: getGatsbyImageData(slide?.imageResponsive?.asset._id || slide?.imageResponsive?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
      />
    : slide.__typename === 'SanityBuilderVideo' ?
      <SanityVideo key={`video-${i}`} {...slide} inheritedAspectRatio={aspectRatio} inheritedAspectRatioResponsive={aspectRatioResponsive} />
    : null

    // Prepare Content Slide, be ready for WYSIWYG Blocks
    const content = slide.content && slide._type === 'builderContent' ?
      <SanityContent key={`content-${i}`} {...slide} />
    : slide.__typename === 'SanityBuilderContent' ?
      <SanityContent key={`content-${i}`} {...slide} />
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

			{slides ?
				<Intro skipAnimation={skipAnimation} visible={ioInView} in={animateIn} delayIn={inheritedDelay} mounted={true} stay={true}>
					{slider}
				</Intro>
			: null }

			{quickHTML?.code ?
				<div
					dangerouslySetInnerHTML={{ __html: quickHTML.code }}
				/>
			: null }

		</div>

  )
}

export default SanitySlider
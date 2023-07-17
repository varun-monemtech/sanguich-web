import React, {useContext, useEffect, useState} from 'react'

import { useInView } from 'react-intersection-observer'
import FSLightBoxContext from '../../context/FSLightBoxContext'

import Intro from '../../animations/Intro'
import VideoHTML from '../../components/Video/HTML'

import './style.scss'

function SanityVideo(props) {
	const [io, ioInView] = useInView({ triggerOnce: true })
	const lightBoxContext = useContext(FSLightBoxContext)
  const {
		_id: id,
		classes,
		animateIn = classes?.indexOf(' t') > -1 ? { bg: 500, fade: 500 } : { fade: 500 }, // If the classes on block have "t" (transparent bg), then animate bg since we know there is contrasting color going on
		slug,
		title,
    mode,
		aspectRatio,
		aspectRatioResponsive,
    inheritedAspectRatio,
    inheritedAspectRatioResponsive,
		parallaxFrom = 0,
		parallaxTo = 0,
		_rawCaption: caption,
		captionClasses,
		image,
		imageResponsive,
    video,
    videoResponsive,
		quickHTML,
		//skipIntro,
		//aspectOff,
		inheritedDelay,
    bgOverlayColor,
    bgOverlay,
    skipAnimation
	} = props


	// General Settings
	const responsiveBreakpoint = 1024
	const [windowSize, setWindowSize] = useState({width: null, height: null})

	// Take care of parallax and image alternative modes for responsive
	useEffect(() => {
		// RAF to update parallax position, it gets lost sometimes otherwise, especially on page changes
		// window.requestAnimationFrame(() => {
		// 	props.parallaxController.update()
		// })

		// Checking window size, dropping values into state
		function updateSize() {
			setWindowSize({width: window.innerWidth, height: window.innerHeight})
		}
		window.addEventListener('resize', updateSize)
		updateSize()

		// Kill off listener
		return () => window.removeEventListener('resize', updateSize)
	},[])

	// Image
	const imageAlt = title ? title : ''
	const extension = image?.asset?.extension
	// Image
	const imageResponsiveAlt = title ? title : ''
	const extensionResponsive = image?.asset?.extension
	// Lightbox
	//const imgFullSizeUrl = image?.asset?.url
	//const imgFullSizeUrlResponsive = imageResponsive?.asset?.url

	// Look if the classes specify if the image is supposed to have decor
	let decor = classes?.search('decor')
	
	function thumbClicked(lightboxSlidesArray) {
    if(mode === 'lightbox') {
			lightBoxContext.setSources(() => lightboxSlidesArray)
			setTimeout(() => {
				lightBoxContext.setToggler((toggle) => !toggle)
			}, 50)
		}
	}

  const videoLightbox = <div className='lightbox-video-wrap'>
    <video controls={true} muted={false} loop playsInline disablePictureInPicture allow="autoplay">
      <source src={video?.asset?.url} type="video/mp4" />
      <track
        default kind="captions"
        srcLang="en"
        src={null} />
    </video>
  </div>

  const ar = inheritedAspectRatio ? inheritedAspectRatio : aspectRatio
  const arr = inheritedAspectRatioResponsive ? inheritedAspectRatioResponsive : aspectRatioResponsive


	// Returning Section
  return video ? (

		<div
      key={id}
      ref={io}
      className={`video-wrap ${classes ? classes : ''} ${mode === 'lightbox' ? 'hover-trigger' : ''} ${((ar && (windowSize.width && windowSize.width >= responsiveBreakpoint)) || (arr && (windowSize.width && windowSize.width < responsiveBreakpoint))) ? 'aspect-ratio' : ''} ${extension === 'png' || extensionResponsive === 'png' ? 'png' : ''}`}
      onClick={() => thumbClicked([videoLightbox])}
      aria-label="Lightbox trigger"
      onKeyDown={() => thumbClicked([videoLightbox])}
      role="button"
      tabIndex={0}
      style={{
        paddingBottom: ar && (windowSize.width && windowSize.width >= responsiveBreakpoint) ? ar + '%' : arr && (windowSize.width && windowSize.width < responsiveBreakpoint) ? arr + '%' : null
      }}
    >

      {slug?.current ?
        <div id={`block-${slug.current}`} className="anchor"></div>
      : null}

      <Intro visible={ioInView} in={animateIn} delayIn={inheritedDelay} mounted={true} stay={true} skipAnimation={skipAnimation}>
        <VideoHTML
          file={video?.asset?.url}
          fileResponsive={videoResponsive?.asset?.url}
          image={image?.asset?.gatsbyImageData}
          imageResponsive={imageResponsive?.asset?.gatsbyImageData}
          alt={
            (imageResponsive && (windowSize.width && windowSize.width < responsiveBreakpoint)) || mode === 'lightbox' ?
              imageResponsiveAlt
            :
              imageAlt
            }
          mode={mode}
          onMobile={windowSize.width && windowSize.width !== null && windowSize.width && windowSize.width < responsiveBreakpoint ? true : false}
          caption={caption}
          captionClasses={captionClasses}
          parallaxFrom={parallaxFrom}
          parallaxTo={parallaxTo}
          bgOverlayColor={bgOverlayColor}
          bgOverlay={bgOverlay}
          disableInteraction={mode === 'lightbox' || mode === 'bg' ? true : false}
				>
					{props.children}
				</VideoHTML>
      </Intro>

			{decor >= 0 ?
				<div className="decor-wrap">
					<Intro visible={ioInView} in={{fade: 3000}} delayIn={inheritedDelay} mounted={true} stay={true} className="c5 t">
						<div className="decor-inside c4"></div>
					</Intro>
				</div>
			: null }

			{quickHTML?.code ?
				<div
					dangerouslySetInnerHTML={{ __html: quickHTML.code }}
				/>
			: null }

		</div>

  ) : false
}

export default SanityVideo
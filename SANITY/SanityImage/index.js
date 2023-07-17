import React, {useContext, useEffect, useState} from 'react'

import { useInView } from 'react-intersection-observer'
import FSLightBoxContext from '../../context/FSLightBoxContext'

import Intro from '../../animations/Intro'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Parallax } from 'react-scroll-parallax'
import SanityOverlay from '../SanityOverlay'
import PortableText from 'react-portable-text'
import DeepLink from '../../components/DeepLink'

import './style.scss'

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function SanityImage(props) {
	const [io, ioInView] = useInView({ triggerOnce: true })
	const lightBoxContext = useContext(FSLightBoxContext)
  const {
		_id: id,
		classes,
		animateIn = classes?.indexOf(' t') > -1 ? { bg: 500, fade: 500 } : { fade: 500 }, // If the classes on block have "t" (transparent bg), then animate bg since we know there is contrasting color going on
		slug,
		title,
		lightboxOn,
		aspectRatio,
		aspectRatioResponsive,
    inheritedAspectRatio,
    inheritedAspectRatioResponsive,
		parallaxFrom = 0,
		parallaxTo = 0,
		_rawCaption: caption,
		captionRaw: captionAPI,
		caption: deepCaption,
		captionClasses,
		image,
		imageResponsive,
		fit = 'cover',
		fitPosition,
		link,
		forceExternal = false,
		loading = 'lazy',
		quickHTML,
		//skipIntro,
		//aspectOff,
		inheritedDelay,
		skipAnimation
	} = props

	// const quality = 90
	const imageFromSanityToImprove = image?.asset?.gatsbyImageData
	// imageFromSanityToImprove.images.fallback.src = imageFromSanityToImprove?.images?.fallback?.src?.replace('/auto=format/g', `auto=format&q=${quality}`)
	// imageFromSanityToImprove.images.fallback.srcSet = imageFromSanityToImprove?.images?.fallback?.srcSet?.replaceAll('auto=format', `auto=format&q=${quality}`)

	//console.log('SanityImage:', caption, captionAPI)

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
	const imgFullSizeUrl = image?.asset?.url
	//const imgFullSizeUrlResponsive = imageResponsive?.asset?.url

	// Look if the classes specify if the image is supposed to have decor
	let decor = classes?.search('decor')
	
	function thumbClicked(lightboxSlidesArray,e) {
		e?.preventDefault()
		if(lightboxOn) {
			lightBoxContext.setSources(() => lightboxSlidesArray)
			setTimeout(() => {
				lightBoxContext.setToggler((toggle) => !toggle)
			}, 50)
		}
	}

	let extendedClasses
	if (classes?.indexOf('superwide') > -1) {
		extendedClasses = 'padd c5 avoidable'
	}

	const ar = inheritedAspectRatio ? inheritedAspectRatio : aspectRatio
	const arr = inheritedAspectRatioResponsive ? inheritedAspectRatioResponsive : aspectRatioResponsive

	const inlineStyle = ar && image && (windowSize.width && windowSize.width >= responsiveBreakpoint) ? {paddingBottom: ar + '%'} : arr && (windowSize.width && windowSize.width < responsiveBreakpoint) ? {paddingBottom: arr + '%'} : null

	const internals = 
		<>
			{slug?.current ?
				<div id={`block-${slug.current}`} className="anchor"></div>
			: null}

			{ parallaxFrom && parallaxFrom !== 0 && parallaxTo && parallaxTo !== 0 ?
				<Intro skipAnimation={skipAnimation} visible={ioInView} in={animateIn} delayIn={inheritedDelay} mounted={true} stay={true} className="has-parallax">
					<Parallax className="parallax" translateY={[parallaxFrom, parallaxTo]}>
						{ imageFromSanityToImprove && (!imageResponsive?.asset?.gatsbyImageData || (windowSize.width >= responsiveBreakpoint)) ?
							<div className='parallax-inner' style={{
								height: 100 + (Math.abs(parallaxFrom) + Math.abs(parallaxTo)) * 0.5 + '%'
							}}>
								<GatsbyImage image={imageFromSanityToImprove} alt={imageAlt} objectFit={fit} objectPosition={fitPosition} loading={loading} />
							</div>
						: null }
						{ imageResponsive?.asset?.gatsbyImageData && (windowSize.width < responsiveBreakpoint) ?
							<div className='parallax-inner' style={{
								height: 100 + (Math.abs(parallaxFrom) + Math.abs(parallaxTo)) * 0.5 + '%'
							}}>
								<GatsbyImage image={imageResponsive?.asset?.gatsbyImageData} alt={imageResponsiveAlt} objectFit={fit} objectPosition={fitPosition} loading={loading} />
							</div>
						: null }
					</Parallax>
				</Intro>
			:
				<>
					{ imageFromSanityToImprove && (!imageResponsive?.asset?.gatsbyImageData || (windowSize.width >= responsiveBreakpoint)) ?
						<Intro skipAnimation={skipAnimation} visible={ioInView} in={animateIn} delayIn={inheritedDelay} mounted={true} stay={true}>
							<GatsbyImage image={imageFromSanityToImprove} alt={imageAlt} objectFit={fit} objectPosition={fitPosition} loading={loading} />
						</Intro>
					: null }
					{ imageResponsive?.asset?.gatsbyImageData && (windowSize.width < responsiveBreakpoint) ?
						<Intro skipAnimation={skipAnimation} visible={ioInView} in={animateIn} delayIn={inheritedDelay} mounted={true} stay={true}>
							<GatsbyImage image={imageResponsive?.asset?.gatsbyImageData} alt={imageResponsiveAlt} objectFit={fit} objectPosition={fitPosition} loading={loading} />
						</Intro>
					: null }
				</>
			}

			<SanityOverlay {...props} />

			{
				caption || captionAPI || deepCaption ? 
					<div className={`caption-img ${captionClasses ? captionClasses : ''}`}>
						<PortableText content={caption || captionAPI || deepCaption} serializers={{
							blockHTML: (props) => <div
								dangerouslySetInnerHTML={{ __html: props.code }}
							/>,
						}} />
					</div>
				:
				null
			}

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
		</>

	const iframed = link && lightboxOn ?
		<iframe
			src={link}
			title="Box containing linked content"
			frameBorder="0"
			allowFullScreen
		/>
	: null


	// Returning Section
  return image ? (
		<>
			{link && validURL(link) ? 
				<a
					key={id}
					ref={io}
					href={link}
					target={`${forceExternal && !lightboxOn ? '_blank' : ''}`}
					className={`image-wrap ${classes ? classes : ''} ${extendedClasses ? extendedClasses : ''} ${lightboxOn ? 'hover-trigger' : ''} ${(ar && image) || (arr && imageResponsive) ? 'aspect-ratio' : ''} ${extension === 'png' || extensionResponsive === 'png' ? 'png' : ''}`}
					onClick={(e) => thumbClicked([iframed ? iframed : link ? link : imgFullSizeUrl], lightboxOn ? e : null)}
					aria-label="Lightbox trigger"
					onKeyDown={(e) => thumbClicked([iframed ? iframed : link ? link : imgFullSizeUrl], lightboxOn ? e : null)}
					role="button"
					tabIndex={0}
					style={inlineStyle}
				>
					{internals}
				</a>
			: link ?
				<DeepLink
				key={id}
					_ref={io}
					to={link}
					target={`${forceExternal && !lightboxOn ? '_blank' : ''}`}
					className={`image-wrap ${classes ? classes : ''} ${extendedClasses ? extendedClasses : ''} ${lightboxOn ? 'hover-trigger' : ''} ${(ar && image) || (arr && imageResponsive) ? 'aspect-ratio' : ''} ${extension === 'png' || extensionResponsive === 'png' ? 'png' : ''}`}
					onClick={(e) => thumbClicked([iframed ? iframed : link ? link : imgFullSizeUrl], lightboxOn ? e : null)}
					aria-label="Lightbox trigger"
					onKeyDown={(e) => thumbClicked([iframed ? iframed : link ? link : imgFullSizeUrl], lightboxOn ? e : null)}
					role="button"
					tabIndex={0}
					style={inlineStyle}
				>
					{internals}
				</DeepLink>
			:
				<div
					key={id}
					ref={io}
					className={`image-wrap ${classes ? classes : ''} ${extendedClasses ? extendedClasses : ''} ${lightboxOn ? 'hover-trigger' : ''} ${(ar && image) || (arr && imageResponsive) ? 'aspect-ratio' : ''} ${extension === 'png' || extensionResponsive === 'png' ? 'png' : ''}`}
					onClick={(e) => thumbClicked([imgFullSizeUrl],e)}
					aria-label="Lightbox trigger"
					onKeyDown={(e) => thumbClicked([imgFullSizeUrl],e)}
					role="button"
					tabIndex={0}
					style={inlineStyle}
				>
					{internals}
				</div>
			}
		</>

  ) : false
}

export default SanityImage
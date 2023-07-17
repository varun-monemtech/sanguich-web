import React from 'react'
import { Link } from 'gatsby'

import { useInView } from 'react-intersection-observer'
import Intro from '../../animations/Intro'

import './style.scss'

import PortableText from 'react-portable-text'
import SanityVideo from '../SanityVideo'
import SanityImage from '../SanityImage'
import SanitySlider from '../SanitySlider'
import { getGatsbyImageData } from 'gatsby-source-sanity'

function SanityContent(props) {

  const sanityProjectId = process.env.GATSBY_SANITY_PROJECT_ID
  const sanityDataset = process.env.GATSBY_SANITY_DATASET
	
	const [io, ioInView] = useInView({ triggerOnce: true })
  const {
		_id: id,
		animateIn = { fade: 500 },
		slug,
		//title,
		classes,
		_rawContent: content,
		contentRaw: contentAPI,
		content: deepContent,
		quickHTML,
		inheritedDelay,
		skipAnimation
	} = props

	// Returning Section
  return (

		<div
      key={id}
      ref={io}
      className={`content-wrap ${classes}`}
    >

			{slug?.current ?
				<div id={`block-${slug.current}`} className="anchor"></div>
			: null}

			{content || deepContent || contentAPI ?
				<Intro skipAnimation={skipAnimation} visible={ioInView} in={animateIn} delayIn={inheritedDelay} mounted={true} stay={true}>
					<PortableText
						content={deepContent || content || contentAPI}
						serializers={{
							blockHTML: (props) => <div
								dangerouslySetInnerHTML={{ __html: props.code }}
							/>,
							builderVideo: (props) =>
								<SanityVideo
									{...props}
									image={{asset: {gatsbyImageData: getGatsbyImageData(props?.image?.asset._id || props?.image?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
									imageResponsive={{asset: {gatsbyImageData: getGatsbyImageData(props?.imageResponsive?.asset._id || props?.imageResponsive?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
								/>
							,
							builderImage: (props) =>
								<SanityImage
									{...props}
									_ref={props?.image?.asset._ref}
									image={{asset: {gatsbyImageData: getGatsbyImageData(props?.image?.asset._id || props?.image?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
									imageResponsive={{asset: {gatsbyImageData: getGatsbyImageData(props?.imageResponsive?.asset._id || props?.imageResponsive?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
								/>
							,
							builderSlider: (props) =>
								<SanitySlider
									{...props}
								/>
							,
							link: ({internal,classes,button,href,children}) => 
								<>
									{internal ? 
										<Link className={`${classes ? classes : ''} ${button ? 'btn' : ''}`} to={href}>
											{button ? 
												<span>
													{children}
												</span>
											: 
												children
											}
										</Link>
									:
										<a href={href} className={classes}>{children}</a>
									}
								</>
						}}
					/>
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

export default SanityContent
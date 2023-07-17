import React from 'react'
import { Link } from 'gatsby'
//import { useInView } from 'react-intersection-observer'

import PortableText from 'react-portable-text'
import SanityVideo from '../SanityVideo'
import { getGatsbyImageData } from 'gatsby-source-sanity'
import SanityImage from '../SanityImage'
import SanitySlider from '../SanitySlider'
import SanityCollection from '../SanityCollection'

//import './style.scss'


// This one is raw version of SanityContent, for direct use in order to display WYSIWYG Content without using Blocks
function SanityWYSIWYGBlock(props) {

  const sanityProjectId = process.env.GATSBY_SANITY_PROJECT_ID
  const sanityDataset = process.env.GATSBY_SANITY_DATASET

	//const [io, ioInView] = useInView({ triggerOnce: true })
	
  const {
		body,
		classes
	} = props


	// Returning Section
  return (

		<div
      //ref={io}
      className={`wysiwyg-wrap ${classes}`}
    >
			{body ?
				<PortableText
					content={body}
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
									image={{asset: {gatsbyImageData: getGatsbyImageData(props?.image?.asset._id || props?.image?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
									imageResponsive={{asset: {gatsbyImageData: getGatsbyImageData(props?.imageResponsive?.asset._id || props?.imageResponsive?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
								/>
						,
						builderSlider: (props) =>
								<SanitySlider
									{...props}
								/>
						,
						builderCollection: (props) =>
								<SanityCollection
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
			: null}

		</div>

  )
}

export default SanityWYSIWYGBlock
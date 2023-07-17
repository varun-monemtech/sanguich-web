import React from 'react'

// import { useInView } from 'react-intersection-observer'

// import Intro from '../../animations/Intro'
import SanityVideo from '../SanityVideo'
import SanityImage from '../SanityImage'
import SanityContent from '../SanityContent'
import './style.scss'

import { getGatsbyImageData } from 'gatsby-source-sanity'

function SanityCollection(props) {
	// const [io, ioInView] = useInView({ triggerOnce: true })
  const {
		_id: id,
		// animateIn = { fade: 500 },
		slug,
		//title,
		classes,
		collection,
		quickHTML,
		// inheritedDelay,
    // skipAnimation,
	} = props

  const sanityProjectId = process.env.GATSBY_SANITY_PROJECT_ID
  const sanityDataset = process.env.GATSBY_SANITY_DATASET


  const nodes = collection?.map((node,i) => {
		let collection = node
    collection.skipIntro = true
		//console.log('Collection Item:', collection.content)

    // Prepare Image Collection Item, be ready for WYSIWYG Blocks
    const image = collection._type === 'builderImage' ?
      <SanityImage
        key={`image-${i}`}
        {...node}
        image={{asset: {gatsbyImageData: getGatsbyImageData(collection?.image?.asset._id || collection?.image?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
        imageResponsive={{asset: {gatsbyImageData: getGatsbyImageData(collection?.imageResponsive?.asset._id || collection?.imageResponsive?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
      />
    : node.__typename === 'SanityBuilderImage' ?
      <SanityImage key={`image-${i}`} {...node} />
    : null

    // Prepare Video Collection Item, be ready for WYSIWYG Blocks
    const video = collection._type === 'builderVideo' ?
      <SanityVideo
        key={`video-${i}`}
        {...collection}
        image={{asset: {gatsbyImageData: getGatsbyImageData(collection?.image?.asset._id || collection?.image?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
        imageResponsive={{asset: {gatsbyImageData: getGatsbyImageData(collection?.imageResponsive?.asset._id || collection?.imageResponsive?.asset._ref, {}, {projectId: sanityProjectId, dataset: sanityDataset})}}}
      />
    : collection.__typename === 'SanityBuilderVideo' ?
      <SanityVideo key={`video-${i}`} {...collection} />
    : null

    // Prepare Content Collection Item, be ready for WYSIWYG Blocks
    const content = collection.content && collection._type === 'builderContent' ?
      <SanityContent key={`content-${i}`} {...collection} />
    : collection.__typename === 'SanityBuilderContent' ?
      <SanityContent key={`content-${i}`} {...collection} />
    : null

    return (
      <div key={i} className="collection-item">
				{image}
        {video}
    		{content}
      </div>
    )
  })
  

	// Returning Section
  return (

		<div
      key={id}
      //ref={io}
      className={`collection-wrap ${classes}`}
    >

			{slug?.current ?
				<div id={`block-${slug.current}`} className="anchor"></div>
			: null}

			{collection ?
				// <Intro skipAnimation={skipAnimation} visible={ioInView} in={animateIn} delayIn={inheritedDelay} mounted={true} stay={true}>
          nodes
				// </Intro>
			: null }

			{quickHTML?.code ?
				<div
					dangerouslySetInnerHTML={{ __html: quickHTML.code }}
				/>
			: null }

		</div>

  )
}

export default SanityCollection
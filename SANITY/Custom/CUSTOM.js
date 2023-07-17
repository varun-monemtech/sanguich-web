import React from 'react'
import './style.scss'

import SanityVideo from '../SanityVideo'
import SanityImage from '../SanityImage'
import SanityContent from '../SanityContent'
import SanitySlider from '../SanitySlider'
import SanityCollection from '../SanityCollection'

import Bro from './Bro'
import FeaturedPost from './FeaturedPost'
import Newsletter from './Newsletter'


function SanityCustom(props) {
	const {blocks, type, refSectionInView} = props

	// Images
	const images = blocks.filter(obj => obj.__typename === 'SanityBuilderImage')
	.map((node,i) => {
		return <SanityImage key={`image-${i}`} {...node} skipAnimation={true} />
	})

	// Files
	const videos = blocks?.filter(obj => obj.__typename === 'SanityBuilderVideo')
		.map((node,i) => {
			return <SanityVideo key={`video-${i}`} {...node} skipAnimation={true} />
		})

	// WYSIWYGS
	const contents = blocks?.filter(obj => obj.__typename === 'SanityBuilderContent')
		.map((node,i) => {
			return <SanityContent key={`content-${i}`} {...node} skipAnimation={true} />
		})

	// WYSIWYGS
	const sliders = blocks?.filter(obj => obj.__typename === 'SanityBuilderSlider')
		.map((node,i) => {
			return <SanitySlider key={`slider-${i}`} {...node} skipAnimation={true} />
		})

	// COLLECTION
	const collections = blocks?.filter(obj => obj.__typename === 'SanityBuilderCollection')
		.map((node,i) => {
			return <SanityCollection key={`collection-${i}`} {...node} skipAnimation={true} />
		})


  const blocksRoute = type === 'custom-section-bro' ?
			<Bro images={images} videos={videos} contents={contents} sliders={sliders} collections={collections} inView={refSectionInView} />
		: type === 'featured-post' ?
			<FeaturedPost images={images} videos={videos} contents={contents} sliders={sliders} collections={collections} inView={refSectionInView} />
		: type === 'newsletter' ?
			<Newsletter images={images} videos={videos} contents={contents} sliders={sliders} collections={collections} inView={refSectionInView} />
		: blocks?.map((node, i) => {
    if (node.__typename === 'SanityBuilderImage') return <SanityImage key={`image-${i}`} {...node} />
    if (node.__typename === 'SanityBuilderVideo') return <SanityVideo key={`video-${i}`} {...node} />
    if (node.__typename === 'SanityBuilderContent') return <SanityContent key={`content-${i}`} {...node} />
    if (node.__typename === 'SanityBuilderSlider') return <SanitySlider key={`slider-${i}`} {...node} />
    if (node.__typename === 'SanityBuilderCollection') return <SanityCollection key={`collection-${i}`} {...node} />
		return false
  })


  return blocksRoute
}

export default SanityCustom
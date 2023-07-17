import React from 'react'
//import './style.scss'

import { useInView } from "react-intersection-observer"

import SanityCustom from '../Custom/CUSTOM'
import SanityContent from '../SanityContent'
import SanitySlider from '../SanitySlider'
import SanityImage from '../SanityImage'
import SanityVideo from '../SanityVideo'
import SanityCollection from '../SanityCollection'


function SanitySection(props) {
	const {_id: id, slug, classes, blocks, type, useAPI, quickHTML} = props
	//console.log('Image:',title, slides)

  const [refSection, refSectionInView] = useInView({ triggerOnce: true })


  // Route blocks, take API delivered content into account
  const blocksRoute = type ?
    <SanityCustom {...props} refSectionInView={refSectionInView} />
  :
    blocks?.map((node, i) => {
      if (node.__typename === 'SanityBuilderImage') return <SanityImage key={`image-${i}`} {...node} />
      if (node.__typename === 'SanityBuilderVideo') return <SanityVideo key={`video-${i}`} {...node} />
      if (node.__typename === 'SanityBuilderContent') return <SanityContent key={`content-${i}`} {...node} />
      if (node.__typename === 'SanityBuilderSlider') return <SanitySlider key={`slider-${i}`} {...node} />
      if (node.__typename === 'SanityBuilderCollection') return <SanityCollection key={`collection-${i}`} {...node} />
      return false
    })


  return (
    <section key={`section-${id}`} id={slug?.current} ref={refSection} className={`sanity-section ${classes} ${useAPI ? 'uses-api' : 'uses-source'}`}>

			{slug?.current ?
				<div id={`section-${slug.current}`} className="anchor"></div>
			: null}

      {blocksRoute}

      {quickHTML?.code ?
        <div
          dangerouslySetInnerHTML={{ __html: quickHTML.code }}
        />
      : null }
      
    </section>
  )
}

export default SanitySection
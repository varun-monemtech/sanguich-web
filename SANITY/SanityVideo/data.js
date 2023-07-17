import { graphql } from 'gatsby'

export const sanityVideo = graphql`
	fragment sanityVideo on SanityBuilderVideo {
		__typename
		_rawCaption(resolveReferences: {maxDepth: 5})
		_id
		title
		slug {
			current
		}
		classes
		captionClasses
		aspectRatio
		aspectRatioResponsive
		parallaxFrom
		parallaxTo
		bgOverlayColor
		bgOverlay
		mode
		quickHTML {
			code
		}
		image {
			...imgFullSanity
		}
		imageResponsive {
			...imgFullSanity
		}
		video {
			asset {
				url
			}
		}
		videoResponsive {
			asset {
				url
			}
		}
	}
`
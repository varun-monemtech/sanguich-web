import { graphql } from 'gatsby'

export const sanityImage = graphql`
	fragment sanityImage on SanityBuilderImage {
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
		lightboxOn
		fit
		fitPosition
		link
		forceExternal
		loading
		quickHTML {
			code
		}
		image {
			...imgFullSanity
		}
		imageResponsive {
			...imgFullSanity
		}
	}
`
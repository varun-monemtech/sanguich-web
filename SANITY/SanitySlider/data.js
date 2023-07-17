import { graphql } from 'gatsby'

export const sanitySlider = graphql`
	fragment sanitySlider on SanityBuilderSlider {
		__typename
		_id
		title
		slug {
			current
		}
		classes
		aspectRatio
		aspectRatioResponsive
		fade
    arrows
    dots
		customPaging
		thumbnails
		controlsLight
		pauseOnFocus
    infinite
    slidesToShow
    slidesToScroll
		centerMode
		variableWidth
    transitionSpeed
		autoplay
    autoplaySpeed
		quickHTML {
			code
		}
		slides {
			...sanityImage
			...sanityVideo
			...sanityContent
		}
	}
`
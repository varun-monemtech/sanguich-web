import { graphql } from 'gatsby'

export const sanityCollection = graphql`
	fragment sanityCollection on SanityBuilderCollection {
		__typename
		_id
		title
		slug {
			current
		}
		classes
		quickHTML {
			code
		}
		collection {
			...sanityImage
			...sanityVideo
			...sanityContent
		}
	}
`
import { graphql } from 'gatsby'

export const sanityContent = graphql`
	fragment sanityContent on SanityBuilderContent {
		__typename
		_rawContent(resolveReferences: {maxDepth: 5})
		_id
		title
		slug {
			current
		}
		classes
		quickHTML {
			code
		}
	}
`
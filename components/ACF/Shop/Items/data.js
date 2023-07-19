import { graphql } from 'gatsby'

export const acfShop = graphql`
	fragment acfShop on WordPressAcf_shop {
		id
		anchor
		classes
	}
`
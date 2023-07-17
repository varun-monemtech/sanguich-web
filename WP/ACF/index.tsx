import WPWYSIWYG from "./WYSIWYG"
import WPImage from "./Image"
import WPVideo from "./Video"

export default function ACF({acf}: {acf: any}) {
	// Get sections from acf
	const { sections } = acf

	// Map through acf sections, create sections html
	const sectionsMapped = sections?.map((node: any,ii: number) => {
		const { anchor, classes, acf_fc_layout: sectionAcf_fc_layout, block: blocks } = node

		// Exit if it's not content block
		if(sectionAcf_fc_layout !== 'content') { return false }

		// Prep inner blocks html
		const blocksMapped = blocks?.map((block: any,jj: number) => {
			const { acf_fc_layout } = block

			if(acf_fc_layout === 'wysiwyg') {
				return <WPWYSIWYG key={`block-${ii}-${jj}`} {...block} />
			}
			if(acf_fc_layout === 'image') {
				return <WPImage key={`block-${ii}-${jj}`} {...block} />
			}
			if(acf_fc_layout === 'video') {
				return <WPVideo key={`block-${ii}-${jj}`} {...block} />
			}
		})

		// Prep section html
		return (
			<section key={`section-${anchor}-${ii}`} className={`section ${classes}`}>

				{anchor ?
					<div id={`section-${anchor}`} className="anchor"></div>
				: null}

				{blocksMapped}
			
			</section>
		)
	})

	// Finished product
	return (
		sectionsMapped
	)
}
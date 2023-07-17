import React from 'react'
import './style.scss'

import Intro from '../../../animations/Intro'

function CustomBlock({inView, images: img, videos: video, contents: content, sliders: slider}) {

	let title = 'And that’s when we came up with the “Crypto King”'

	return (
		<>
			<Intro
				visible={inView}
				in={{ fade: 750 }}
				delayIn={100}
				mounted={true}
				stay={true}
				className={``}
			>
				<div className="flex-12">
					<div className="span-8 span-12-mobile position-relative">
						{img[0]}
					</div>
					<div className="span-4 span-12-mobile padd flex ai-center">
						{title ? (
							<h2>And that’s when we came up with the “Crypto King”</h2>
						) : null}
					</div>
				</div>
			</Intro>
		</>
	)
}

export default CustomBlock
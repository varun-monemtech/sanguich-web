import React from 'react'
import './style.scss'

import Intro from '../../../animations/Intro'
import CF7Basic from '../../../components/Form/CF7/Newsletter'

function CustomBlock({inView, images: img, videos: video, contents: content, sliders: slider}) {

	return (
		<>
			<Intro
				visible={inView}
				in={{ fade: 750 }}
				delayIn={100}
				mounted={true}
				stay={true}
				className={`c5 t span-9 span-12-tablet`}
			>
				<CF7Basic />
			</Intro>
		</>
	)
}

export default CustomBlock
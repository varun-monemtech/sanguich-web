import React from 'react'
import './style.scss'

function CustomBlock({images: img, videos: video, contents: content, sliders: slider}) {

	return (
		<>
			{img[0]}
			{img[1]}
			{content[0]}
			{video[0]}
			{slider[0]}
		</>
	)
}

export default CustomBlock
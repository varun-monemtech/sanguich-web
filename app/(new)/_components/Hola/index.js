
import VideoComponent from '@/components/new/Video'

function Hola(props) {

	const anchor = props.anchor
	const classes = props.classes
	const image = props.img
	const video = props.video_file?.url

	return (
		<>
			{classes ?
				<section id={`section-${anchor}`} className={`c4 relative aspect-video  `}>

					{anchor ?
						<div id={anchor} className="anchor"></div>
						: null}

					<VideoComponent
						url={video}
						// imgCover={{url: image.url, alt: ''}}
						mode="inline"
						wrapperClasses="light [&_button>div]:hidden"
						overlay={
							{
								color: '#44444466',
								content: "<span class='hola'></span>",
								// classes:"",
							}
						}
					/>

				</section>
				: null}
		</>
	)
}

export default Hola
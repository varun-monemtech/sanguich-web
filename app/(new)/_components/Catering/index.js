import './style.scss'

import Image from 'next/image'
import CF7Catering from '../../form/CF7/Catering'
import Intro from '@/animations/Intro_Framer'
function Catering(props) {

	const anchor = props.anchor
	const classes = props.classes
	const image = props.img


	return (
		<>
			{classes ?
				<section id={`section-${anchor}`} className={`content c4   ${classes} `}>
					<Intro delay={50}>
						<div className='grid-12'>
							{anchor ?
								<div id={anchor} className="anchor"></div>
								: null}

							<div className="img span-6 span-12-tablet">

								<Image
									src={image.url}
									width={image.width}
									height={image.height}
									alt={image.alt}
									style={{ objectFit: "cover" }}
									quality="90"
								/>

							</div>

							<div className="catering span-6 span-12-tablet border-type-9 fs-85">

								<div className="decor-wrap">
									<div className="decor-top">
										<div className="decor-top-left"></div>
										<div className="decor-top-center"></div>
										<div className="decor-top-right"></div>
									</div>
									<div className="decor-center">
										<div className="decor-center-left"></div>
										<div className="decor-center-right"></div>
									</div>
									<div className="decor-bottom">
										<div className="decor-bottom-left"></div>
										<div className="decor-bottom-center"></div>
										<div className="decor-bottom-right"></div>
									</div>
								</div>

								<CF7Catering />

							</div>
						</div>
					</Intro >

				</section>
				: null
			}
		</>
	)
}

export default Catering
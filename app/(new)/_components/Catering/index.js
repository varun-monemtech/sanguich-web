import './style.scss'

import CF7Catering from '../../form/CF7/Catering'
import Intro from '@/animations/Intro_Framer'
import { LoadImage } from '@/components/new/LoadImage'

function Catering(props) {

	const anchor = props.anchor
	const classes = props.classes
	const image = props.img


	return (
		<>
			{classes ?
				<section id={`section-${anchor}`} className={`frs-grid frs-grid-ultrawide content c4   ${classes} `}>
					<Intro delay={50}>
						<div className='grid-12'>
							{anchor ?
								<div id={anchor} className="anchor"></div>
								: null}

							<div className="img span-7 span-12-tablet ">

								<LoadImage
									src={image.url}
									width={image.width}
									height={image.height}
									alt={image.alt}
									className='max-md:aspect-[16/10]'
								/>

							</div>

							<div className=" catering span-5 span-12-tablet border-type-9 fs-85 relative flex justify-center">


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
							<div className="span-12">
								<div className={`
									bg-[#DCBA7B]
									flex flex-col items-center 
									  w-full  
									transition-all duration-1000 delay-100 text-[#274F37]
									
									pt-4 pb-5
									`}
									style={{ boxShadow: '0 7px 6px 0 rgba(0, 0, 0, 0.16) inset' }}
								>
									<p className='font1 text-center !m-0  uppercase'>
										For parties less than 20 people
									</p>
									<a href='https://order.sanguich.com/' target='_blank' className='regular font1 px-4  btn-image mt-2 '>
										<span className='text-[0.75rem]'>ORDER HERE</span>
									</a>

								</div>
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
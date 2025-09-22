import './style.scss'
import Intro from '@/animations/Intro_Framer'
import Link from 'next/link'

function OurStory(props) {

	const anchor = props.anchor
	const classes = props.classes
	const header = props.header
	const content = props.content


	return (
		<>
			{classes ?
				<section id={`section-${anchor}`} className={`frs-grid-full relative content border-type-11 c5 ${classes}`}>
					<Intro delay={50}>
						<div className="decor-wrap filter-invert opacity-[1] mix-blend-luminosity">
							<div className="decor-top with-extra">
								<div className="decor-top-left before:hidden"></div>
								<div className="decor-top-center with-extra">
									<div className="decor-top-center-extra-left"></div>
									<div className="decor-top-center-extra-right"></div>
								</div>
								<div className="decor-top-right"></div>
							</div>
							<div className="decor-center">
								<div className="decor-center-left"></div>
								<div className="decor-center-right"></div>
							</div>
							<div className="decor-bottom">
								<div className="decor-bottom-left"></div>
								<div className="decor-bottom-center with-extra">
									<div className="decor-bottom-center-extra-left"></div>
									<div className="decor-bottom-center-extra-right"></div>
								</div>
								<div className="decor-bottom-right"></div>
							</div>
						</div>

						<div className={`frs-grid py-24 md:py-52 z-[1001] relative`}>
							{anchor ?
								<div id={anchor} className="anchor"></div>
								: null}

								<div className="header">
									<h2 className="font2 !m-0  text-[4em] md:text-[5em] !p-0 !text-[#DCBA7B] text-center leading-[1]" dangerouslySetInnerHTML={{ __html: header }} />
									
								</div>

								<div className="content-container max-md:mx-6  max-w-5xl mx-auto span-12 pt-5 flex flex-col ">
									<div className='content-holder text-sm md:text-[1.25em]  leading-[1.4] !text-[#D0C8B9] text-center !font-[100] [&_span]:inline-block [&_span]:py-1' dangerouslySetInnerHTML={{ __html: content }} />
									<Link className='text-sm md:text-[1.25em] text-center underline  !text-[#DCBA7B] hover:!text-white transition w-fit mx-auto mt-5' href="/about">Read More</Link>
								</div>

						</div>
					</Intro>

				</section>
				: null}
		</>
	)
}

export default OurStory
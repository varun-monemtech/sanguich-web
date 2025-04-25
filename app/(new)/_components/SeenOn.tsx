import Intro from '@/animations/Intro_Framer'
import Link from 'next/link'
import { LoadImage } from '@/components/new/LoadImage'



function SeenOn(props: any) {

	const anchor = props.anchor
	const classes = props.classes

	const itemsMap = props.items?.map((node: any, i: number) => {
		let logo = node.img



		if (node.link || node.file) {
			return (
				<Link key={i}
					target="_blank"
					href={node?.file?.localFile ? node.file.localFile.publicURL : node.link}
					aria-label='Press Logo Link'
					className="col-span-4 md:col-span-2 relative hover:translate-y-[-5px] transition-transform duration-500"
					rel="noreferrer noopener"
				>
					<div className='w-[65%] lg:w-[45%] h-auto relative mx-auto'>
						<LoadImage
							src={logo.url}
							width={150}
							height={80}
							alt={logo.alt}
							contain
							quality="90"
							className='aspect-video'
						/>
					</div>
				</Link>
			)
		} else {
			return (
				<div key={i} className="col-span-4 md:col-span-2 relative ">
					<div className='w-[65%] lg:w-[45%] h-auto relative mx-auto'>
						<LoadImage
							src={logo.url}
							width={150}
							height={80}
							alt={logo.alt}
							contain
							quality="90"
							className='aspect-video'
						/>
					</div>

				</div>
			)
		}
	})

	return (
		<>
			{classes ?
				<section id={`section-${anchor}`} className={`content c4 is-inview ${classes}`}>

					{anchor ?
						<div id={anchor} className="anchor"></div>
						: null}

					<Intro delay={50} className="span-12 px-24">
						<div className='flex justify-center py-2 items-center text-[3em] relative border-type-7 '>
							<h2 className="px-[0.1em] py-0 !m-0 z-[1001] c4 font2 !text-[#dcba7b]">As Seen On</h2>
							<div className="decor-wrap !p-0 z-[-1] justify-center">
								<div className="decor-top with-extra">
									<div className="decor-top-left"></div>
									<div className="decor-top-center with-extra">
										<div className="decor-top-center-extra-left"></div>
										<div id="space-logo" className="decor-top-center-extra-center"></div>
										<div className="decor-top-center-extra-right"></div>
									</div>
									<div className="decor-top-right"></div>
								</div>
							</div>
						</div>
					</Intro>

					<div className=" c4">
						<div className=" grid grid-cols-12 md:grid-cols-10  justify-center ">
							{itemsMap}
						</div>
					</div>

				</section>
				: null}
		</>
	)
}

export default SeenOn
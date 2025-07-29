import Intro from '@/animations/Intro_Framer'
import Link from 'next/link'
import { LoadImage } from '@/components/new/LoadImage'
import BorderHeading from './BorderHeading'	


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
					<div className='w-[60%] lg:w-[45%] h-auto relative mx-auto'>
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
					<div className='w-[60%] lg:w-[45%] h-auto relative mx-auto'>
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
				<section id={`section-${anchor}`} className={`frs-grid content c4 is-inview ${classes}`}>

					{anchor ?
						<div id={anchor} className="anchor"></div>
						: null}

					<BorderHeading>
						<h2 className={`px-[0.1em] py-0 !m-0 z-[1001] c4 font2 !text-[#dcba7b]`}>As Seen On</h2>
					</BorderHeading>

					<div className="max-md:pt-3 c4">
						<div className=" grid grid-cols-12 md:grid-cols-10 justify-center gap-2 md:gap-6 max-md:pb-4 md:pb-12">
							{itemsMap}
						</div>
					</div>

				</section>
				: null}
		</>
	)
}

export default SeenOn
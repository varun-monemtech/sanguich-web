import VideoComponent from '@/components/new/Video'
import { Metadata } from 'next'
import Founders from '@/app/(new)/_components/Founders'
import Franchising from '@/app/(new)/_components/Franchising'
import Timeline from '@/app/(new)/_components/Timeline'
import Purpose from '@/app/(new)/_components/Purpose'
export const metadata: Metadata = {
	title: `About Us | ${process.env.NEXT_PUBLIC_SITENAME}`,
}


export default async function AboutPage() {

	return (
		<>
			<section id={`section-about-hero`} className={`frs-grid-ultrawide c5 is-inview max-md:!pt-[2.125rem] bg-[#EFE7D3]`}>
				<div id={'about-hero'} className="anchor"></div>
			
				{/* <VideoComponent
					url={'/static/796867dcdbbddbad0c13d54714d5d9d9/SANGUICH-Interview-1.mp4'}
					mode="inline"
					wrapperClasses="light [&_button>div]:hidden"
					overlay={
						{
							color: '#44444466',
							content: "<span class='hola'></span>",
						}
					}
				/> */}
				<div className='frs-grid pt-15 z-[1000] block bg-[#EFE7D3]'>
					<h1 className='text-2xl text-right md:text-3xl font-bold !text-[#274F37]'>About Us</h1>
				</div>
			</section>
			<Founders />
			<Timeline />
			<Franchising />
			<Purpose />

		</>
	)
}
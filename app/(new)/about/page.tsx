import VideoComponent from '@/components/new/Video'
import { Metadata } from 'next'
import Founders from '@/app/(new)/_components/Founders'
import Franchising from '@/app/(new)/_components/Franchising'
import Timeline from '@/app/(new)/_components/Timeline'

export const metadata: Metadata = {
	title: `About Us | ${process.env.NEXT_PUBLIC_SITENAME}`,
}


export default async function AboutPage() {

	return (
		<>
			<section id={`section-about-hero`} className={`c4 is-inview`}>
				<div id={'about-hero'} className="anchor"></div>
				<VideoComponent
					url={'/static/796867dcdbbddbad0c13d54714d5d9d9/SANGUICH-Interview-1.mp4'}
					mode="inline"
					wrapperClasses="light"
					overlay={
						{
							color: '#44444466',
							content: "<span class='hola'></span>",
						}
					}
				/>
			</section>
			<Founders />
			<Franchising />
			<Timeline />
		</>
	)
}
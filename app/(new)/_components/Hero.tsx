'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import VideoComponent from '@/components/new/Video'
import { LoadImage } from '@/components/new/LoadImage'

function Purpose() {




	return (
		<section
			id="section-hero-new"
			className="h-[250vh]"
		>
			<div className="aspect-video w-full">
				<div className='rounded-full overflow-hidden'>

				<VideoComponent
					url="/static/796867dcdbbddbad0c13d54714d5d9d9/SANGUICH-Interview-1.mp4"
					mode="bg"
					wrapperClasses="light"
					overlay={{
						color: '#44444466',
						content: `<div class='absolute inset-0' style='background-color: rgba(0,0,0,0.6)'></div>`,
					}}
				/>
				</div>

			</div>

			<div className='grid grid-cols-3 gap-4 relative'>
				<LoadImage
					src='/images/sandwiches/1.png'
					alt='sandwich'
					width={500}
					height={500}
					className='[&_img]:relative drop-shadow-2xl'
				/>
				<LoadImage
					src='/images/sandwiches/2.png'
					alt='sandwich'
					width={500}
					height={500}
					className='[&_img]:relative drop-shadow-2xl'
				/>
				<LoadImage
					src='/images/sandwiches/3.png'
					alt='sandwich'
					width={500}
					height={500}
					className='[&_img]:relative'
				/>
			</div>

			<LoadImage
					src='/mask.svg'
					alt='sandwich'
					width={500}
					height={500}
					className='[&_img]:relative drop-shadow-2xl'
				/>
		</section>
	)
}

export default Purpose

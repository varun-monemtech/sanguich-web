'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import VideoComponent from '@/components/new/Video'
import { LoadImage } from '@/components/new/LoadImage'

function Purpose() {
	const containerRef = useRef(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end']
	})

	// Add springs to all animations for smoother effects

	
	// Apply springs to all animations
	const videoScaleRaw = useTransform(scrollYProgress, [0, 0.3], [2, 1])
	const videoScale = useSpring(videoScaleRaw, { stiffness: 200, damping: 30 })
	
	const videoOpacityRaw = useTransform(scrollYProgress, [0, 0.02], [0, 1])
	const videoOpacity = useSpring(videoOpacityRaw, { stiffness: 100, damping: 20 })
	
	const sandwich1YRaw = useTransform(scrollYProgress, [0.2, 0.6], [100, -100])
	const sandwich1Y = useSpring(sandwich1YRaw, { stiffness: 50, damping: 20 })
	
	const sandwich2YRaw = useTransform(scrollYProgress, [0.3, 0.7], [150, -400])
	const sandwich2Y = useSpring(sandwich2YRaw, { stiffness: 80, damping: 20 })
	
	const sandwich3YRaw = useTransform(scrollYProgress, [0.4, 0.8], [200, -200])
	const sandwich3Y = useSpring(sandwich3YRaw, { stiffness: 60, damping: 20 })
	
	// Marquee effect for mask with spring
	const maskXRaw = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
	const maskX = useSpring(maskXRaw, { stiffness: 40, damping: 15 })

	return (
		<section
			id="section-hero-new"
			className=" relative pt-24"
			ref={containerRef}
		>
			{/* Mask marquee at the bottom */}
			<motion.div 
				className="sticky top-[100%] left-0 w-[200%] z-[-10]"
				style={{ x: maskX }}
				transition={{ type: "spring", stiffness: 40, damping: 15 }}
			>
				<div className="flex">
					<LoadImage
						src='/mask.svg'
						alt='sandwich'
						width={500}
						height={500}
						className='[&_img]:relative drop-shadow-2xl'
					/>
					<LoadImage
						src='/mask.svg'
						alt='sandwich'
						width={500}
						height={500}
						className='[&_img]:relative drop-shadow-2xl'
					/>
				</div>
			</motion.div>

			{/* <motion.div 
				className="aspect-video w-full sticky  top-24 rounded-sm z-10"
				style={{ scale: videoScale, opacity: videoOpacity }}
				transition={{ type: "spring", stiffness: 150, damping: 25 }}
			>
				<LoadImage
					src='/images/sandwiches/big.png'
					alt='sandwich'
					width={500}
					height={500}
					className='[&_img]:relative drop-shadow-2xl'
				/>
			</motion.div> */}

			<div className='grid grid-cols-3 gap-10 mx-24 relative mt-20 z-10'>
				<motion.div 
					style={{ y: sandwich1Y }}
				>
					<LoadImage
						src='/images/sandwiches/1.png'
						alt='sandwich'
						width={500}
						height={500}
						className='[&_img]:relative drop-shadow-2xl'
					/>
				</motion.div>
				
				<motion.div 
					style={{ y: sandwich2Y }}
				>
					<LoadImage
						src='/images/sandwiches/2.png'
						alt='sandwich'
						width={500}
						height={500}
						className='[&_img]:relative drop-shadow-2xl'
					/>
				</motion.div>
				
				<motion.div 
					style={{ y: sandwich3Y }}
				>
					<LoadImage
						src='/images/sandwiches/3.png'
						alt='sandwich'
						width={500}
						height={500}
						className='[&_img]:relative'
					/>
				</motion.div>
			</div>
		</section>
	)
}

export default Purpose

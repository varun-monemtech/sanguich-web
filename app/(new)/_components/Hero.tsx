'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LoadImage } from '@/components/new/LoadImage'

function HeroNew() {
	const containerRef = useRef(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end']
	})

	// Different parallax speeds for each element
	const titleParallax = useTransform(scrollYProgress, [0, 0.5], ['0em', '2em'])
	const bigSandwichParallax = useTransform(scrollYProgress, [0, 0.5], ['0%', '-8em'])
	const sandwich1Parallax = useTransform(scrollYProgress, [0, 1], ['10em', '-10em'])
	const sandwich2Parallax = useTransform(scrollYProgress, [0, 1], ['10em', '-20em'])
	const sandwich3Parallax = useTransform(scrollYProgress, [0, 1], ['10em', '-12em'])
	const maskParallax = useTransform(scrollYProgress, [0, 1], ['0em', '0em'])
	const maskTranslateX = useTransform(scrollYProgress, [0, 1], ['-30em', '-20em'])

	return (
		<section
			id="section-hero-new"
			className="relative pt-32 border-type-1 is-inview inview"
			ref={containerRef}
			onClick={() => console.log('Current progress:', scrollYProgress.get())}
		>

			<div className="decor-wrap">
				<div className="decor-top with-extra">
					<div className="decor-top-left"></div>
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

			<motion.div
				className="max-w-4xl  mx-auto w-full rounded-sm z-[200] relative"
				initial={{ opacity: 0, translateY: 100 }}
				animate={{ opacity: 1, translateY: 0 }}
				transition={{
					duration: 0.4,
					translateY: { type: "spring", visualDuration: 0.4, bounce: 0.25 },
				}}
				style={{
					y: titleParallax
				}}
			>
				<LoadImage
					src='/hero-title.svg'
					alt='sandwich'
					width={500}
					height={500}
					className='[&_img]:relative'
				/>
			</motion.div>

			<motion.div
				className=" px-24 mx-auto w-full top-24 rounded-sm z-10"
				style={{
					y: bigSandwichParallax
				}}
			>
				<LoadImage
					src='/images/sandwiches/big.png'
					alt='sandwich'
					width={500}
					height={500}
					className='[&_img]:relative '
				/>
			</motion.div>

			<div className='grid grid-cols-3 gap-10 mx-24 relative mt-20 z-10'>
				<motion.div
					style={{
						y: sandwich1Parallax
					}}
				>
					<LoadImage
						src='/images/sandwiches/1.png'
						alt='sandwich'
						width={500}
						height={500}
						className='[&_img]:relative drop-shadow-[0_13px_13px_rgba(0,0,0,0.57)]'
					/>
				</motion.div>

				<motion.div
					style={{
						y: sandwich2Parallax
					}}
				>
					<LoadImage
						src='/images/sandwiches/2.png'
						alt='sandwich'
						width={500}
						height={500}
						className='[&_img]:relative drop-shadow-[0_13px_13px_rgba(0,0,0,0.57)]'
					/>
				</motion.div>

				<motion.div
					style={{
						y: sandwich3Parallax
					}}
					transition={{ type: 'spring', stiffness: 18, damping: 10 }}

				>
					<LoadImage
						src='/images/sandwiches/3.png'
						alt='sandwich'
						width={500}
						height={500}
						className='[&_img]:relative drop-shadow-[0_13px_13px_rgba(0,0,0,0.57)]'
					/>
				</motion.div>
			</div>

			<motion.div
				className="absolute bottom-[0%] left-0 w-[200%] z-[-10]"
				style={{
					y: maskParallax,
					x: maskTranslateX
				}}
				transition={{ type: 'spring', stiffness: 50 }}
			>
				<div className="flex">
					<LoadImage
						src='/mask.svg'
						alt='sandwich'
						width={500}
						height={500}
						className='[&_img]:relative drop-shadow-[0_13px_13px_rgba(0,0,0,0.57)]'
					/>
					<LoadImage
						src='/mask.svg'
						alt='sandwich'
						width={500}
						height={500}
						className='[&_img]:relative drop-shadow-[0_13px_13px_rgba(0,0,0,0.57)]'
					/>
				</div>
			</motion.div>
		</section>
	)
}

export default HeroNew

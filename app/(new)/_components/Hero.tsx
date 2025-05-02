'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LoadImage } from '@/components/new/LoadImage'
import HeroTitleAnimated from './HeroTitleAnimated'
import Intro from '@/animations/Intro_Framer'

function HeroNew() {
	const containerRef = useRef(null)
	const titleRef = useRef(null)
	const bigSandwichRef = useRef(null)
	const sandwich1Ref = useRef(null)
	const sandwich2Ref = useRef(null)
	const sandwich3Ref = useRef(null)
	const maskRef = useRef(null)

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end']
	})

	// Different parallax speeds for each element
	const { scrollYProgress: titleProgress } = useScroll({
		target: titleRef,
		offset: ['end start', 'start end']
	})
	const titleParallax = useTransform(titleProgress, [0, 1], ['0em', '-4em'])

	const { scrollYProgress: bigSandwichProgress } = useScroll({
		target: bigSandwichRef,
		offset: ['end start', 'start end']
	})
	const bigSandwichParallax = useTransform(bigSandwichProgress, [0, 1], ['0em', '-9em'])

	const { scrollYProgress: sandwich1Progress } = useScroll({
		target: sandwich1Ref,
		offset: ['end start', 'start end']
	})
	const sandwich1Parallax = useTransform(sandwich1Progress, [0, 1], ['-9vw', '-2vw'])

	const { scrollYProgress: sandwich2Progress } = useScroll({
		target: sandwich2Ref,
		offset: ['end start', 'start end']
	})
	const sandwich2Parallax = useTransform(sandwich2Progress, [0, 1], ['-20vw', '0vw'])

	const { scrollYProgress: sandwich3Progress } = useScroll({
		target: sandwich3Ref,
		offset: ['end start', 'start end']
	})
	const sandwich3Parallax = useTransform(sandwich3Progress, [0, 1], ['-10vw', '2vw'])

	const { scrollYProgress: maskProgress } = useScroll({
		target: maskRef,
		offset: ['end start', 'start end']
	})
	const maskParallax = useTransform(maskProgress, [0, 1], ['0em', '0em'])
	const maskTranslateX = useTransform(maskProgress, [0, 1], ['-30em', '-20em'])

	return (
		<section
			id="section-hero-new"
			className="max-md:mt-13 frs-grid-full relative border-type-1  overflow-x-clip m-[1.5em]"
			ref={containerRef}
		>
			<Intro delay={50}>
			<div className="decor-wrap !p-0">
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

			<div className='frs-grid z-[1001] relative pt-32 '>
				<motion.div
					className="max-w-[15em] md:max-w-[20em]  lg:max-w-4xl  mx-auto w-full rounded-sm z-[200] relative"
					initial={{ opacity: 0, translateY: 100 }}
					animate={{ opacity: 1, translateY: 0 }}
					transition={{
						duration: 2,
						translateY: { type: "spring", visualDuration: 0.4, bounce: 0.25 },
					}}
					style={{
						y: titleParallax
					}}
					ref={titleRef}
				>
					<HeroTitleAnimated className="w-full h-auto" />
				</motion.div>

				<motion.div
					className=" px-0 md:px-8 lg:px-0 mx-auto w-full top-24 z-10 max-lg:pt-12"
					style={{
						y: bigSandwichParallax
					}}
					ref={bigSandwichRef}
				>
					<LoadImage
						src='/images/sandwiches/sandwich-big.jpg'
						alt='sandwich'
						width={500}
						height={500}
						className='[&_img]:relative rounded-[58px] md:rounded-[281px] aspect-[21/9] md:aspect-[21/7] border-2 border-[#DCBA7B]'
					/>
				</motion.div>

				<div className='md:py-10 flex max-md:flex-wrap justify-center max-lg:pb-20  lg:gap-36 mx-0 lg:mx-10 relative  z-10'>
					<motion.div
						style={{
							y: sandwich1Parallax
						}}
						ref={sandwich1Ref}
						transition={{ type: 'spring', stiffness: 100, damping: 30 }}
						className='md:mt-10 basis-1/3  md:basis-1/3 max-lg:px-[0.25rem] drop-shadow-[0_13px_13px_rgba(0,0,0,0.57)]'
					>
						<LoadImage
							src='/images/sandwiches/1.png'
							alt='sandwich'
							width={500}
							height={500}
							className='[&_img]:relative overflow-visible '
						/>
					</motion.div>

					<motion.div
						style={{
							y: sandwich2Parallax
						}}
						ref={sandwich2Ref}
						transition={{ type: 'spring', stiffness: 100, damping: 30 }}
						className='max-md:-mt-5 md:mt-5 basis-1/3   md:basis-1/3 max-lg:px-[0.25rem] drop-shadow-[0_13px_13px_rgba(0,0,0,0.57)]'
					>
						<LoadImage
							src='/images/sandwiches/2.png'
							alt='sandwich'
							width={500}
							height={500}
							className='[&_img]:relative  overflow-visible '
						/>
					</motion.div>

					<motion.div
						ref={sandwich3Ref}
						style={{
							y: sandwich3Parallax
						}}
						transition={{ type: 'spring', stiffness: 100, damping: 30 }}
						className='basis-1/3 md:basis-1/3 max-lg:px-[0.25rem] drop-shadow-[0_13px_13px_rgba(0,0,0,0.57)]'
					>
						<LoadImage
							src='/images/sandwiches/3.png'
							alt='sandwich'
							width={500}
							height={500}
							className='[&_img]:relative  overflow-visible '
						/>
					</motion.div>
				</div>

				<motion.div
					className="absolute py-10 bottom-[0%] left-0 w-[200%] z-[-10]"
					style={{
						y: maskParallax,
						x: maskTranslateX
					}}
					transition={{ type: 'spring', stiffness: 50 }}
					ref={maskRef}
				>
					<div className="flex">
						<LoadImage
							src='/mask.svg'
							alt='sandwich'
							width={500}
							height={500}
							className='h-full w-full [&_img]:h-full [&_img]:w-full [&_img]:relative drop-shadow-[0_13px_13px_rgba(0,0,0,0.57)] pr-10'
						/>
						<LoadImage
							src='/mask.svg'
							alt='sandwich'
							width={500}
							height={500}
							className='h-full w-full  [&_img]:h-full [&_img]:w-full [&_img]:relative drop-shadow-[0_13px_13px_rgba(0,0,0,0.57)]'
						/>
					</div>
				</motion.div>
			</div>
		</Intro>


		</section>
	)
}

export default HeroNew

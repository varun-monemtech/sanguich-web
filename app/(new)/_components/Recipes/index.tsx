'use client'
import { useCallback, useState, useRef } from 'react'
import { LoadImage } from '@/components/new/LoadImage'
import Intro from '@/animations/Intro_Framer'
import {
	Dialog,
	DialogContent,
	DialogClose,
	DialogTitle
} from '@/components/shadcn/ui/dialog'
import { Transition, SwitchTransition } from 'react-transition-group'
// @ts-ignore
import anime from 'animejs' 

import { X, CirclePlay } from 'lucide-react'

import './style.scss'


export const recipesMockData = [
	{
		id: 1,
		name: "PAN CON BISTEC",
		description: "Thin steak, papitas, and serious flavor—this ain't just a sandwich, this is how we do Pan con Bistec the Sanguich way!",
		img: {
			url: "/images/recipes/pan-con-bistec.jpg",
			width: 800,
			height: 600,
			alt: "Pan con Bistec sandwich"
		},
		watchUrl: "https://www.youtube.com/embed/watch?v=OMlj3SBxiyo"
	},
	{
		id: 2,
		name: "ARROZ CON POLLO",
		description: "One pot, pure sabor. Follow our step-by-step to cook up an Arroz con Pollo that hits every time, Miami style.",
		img: {
			url: "/images/recipes/arroz-con.jpg",
			width: 800,
			height: 600,
			alt: "Arroz con Pollo dish"
		},
		watchUrl: "https://www.youtube.com/embed/watch?v=OMlj3SBxiyo"
	},
	{
		id: 3,
		name: "CAFECITO BREAK",
		description: "No Miami day starts sin un cafecito. Let us show you how to brew it right, con azúcar y mucho cariño.",
		img: {
			url: "/images/recipes/cafecito-break.jpg",
			width: 800,
			height: 600,
			alt: "Cuban coffee"
		},
		watchUrl: "https://www.youtube.com/embed/watch?v=OMlj3SBxiyo"
	},
	{
		id: 4,
		name: "LETS MAKE CUBAN NACHOS",
		description: "Crispy, golden, and ready to dip. Learn how we Cuban Nachos Para el next party!",
		img: {
			url: "/images/recipes/cuban-nachos.jpg",
			width: 800,
			height: 600,
			alt: "Cuban Nachos"
		},
		watchUrl: "https://www.youtube.com/embed/watch?v=OMlj3SBxiyo"
	},
	{
		id: 5,
		name: "PAN CON CROQUETTES SANGUICH",
		description: "In this episode, we're showin' you cómo se hace un real-deal Pan con Croqueta Sanguich layer by layer, press by press, the Miami way!",
		img: {
			url: "/og-sang.jpeg",
			width: 800,
			height: 600,
			alt: "Pan con Croquettes Sanguich"
		},
		watchUrl: "https://www.youtube.com/embed/watch?v=OMlj3SBxiyo"
	}
];

function Recipes() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
	const [selectedIndex, setSelectedIndex] = useState<number>(0)
	const [showLightbox, setShowLightbox] = useState(false)

	const nodeRef = useRef(null)

	const handleLightboxChange = useCallback((open: boolean) => {
		setShowLightbox(open)
	}, [])

	// Animation functions
	const baseDuration = 150

	const fadeIn = () => {
		anime
			.timeline()
			.add({
				targets: nodeRef.current,
				opacity: [0, 1],
				duration: baseDuration,
				easing: 'cubicBezier(.5,.08,.54,.9)',
			})
	}

	const fadeOut = () => {
		anime
			.timeline()
			.add({
				targets: nodeRef.current,
				opacity: [1, 0],
				duration: baseDuration,
				easing: 'cubicBezier(.5,.08,.54,.9)'
			})
	}

	const itemsMap = recipesMockData?.map((node, i) => {

		return (
			<div
				key={i}
				className={`span-12  cursor-pointer flex gap-5 tile grid-item rounded-lg ${(hoveredIndex === i || selectedIndex === i) ? 'hovered' : ''}`}

				onMouseEnter={() => setHoveredIndex(i)}
				onMouseLeave={() => setHoveredIndex(null)}
				onClick={() => setSelectedIndex(i)}
			>
				<div className="span-12-tablet span-5 relative aspect-video rounded-lg gold-border overflow-hidden">
					{node.img?.url &&
						<LoadImage
							src={node.img.url}
							width={node.img.width}
							height={node.img.height}
							alt={node.img.alt}
						/>
					}
				</div>
				<div className="content-container span-12-tablet span-7">
					<h3 className='uppercase font3 heading'>{node.name}</h3>
					<p>{node.description}</p>
					<div className='span-12 flex pt-2'>
						<div tabIndex={0} role='button' onClick={() => setShowLightbox(true)} className='group hover:!border-[#3e805f] border cursor-pointer !border-white border-solid rounded-lg  px-4 py-2  text-sm'>
							<span className='uppercase  text-xs leading-[1] vertical-bottom group-hover:text-[#3e805f]'>Watch</span>
						</div>
					</div>

				</div>
			</div>
		)
	})


	return (
		<>
			<section id={`section-recipes-new`} style={{ zIndex: 101 }} className={`frs-grid content c5  border-type-7 is-inview   `}>
				<Intro delay={50}>
					<div className='heading-section flex justify-center items-center text-[3em] relative'>
						<h2 className="text-[#DCBA7B] m-0 px-[0.1em] py-0 c5 font2 z-[1001]">Recipes</h2>
						<div className="decor-wrap z-[-1] justify-center !p-0">
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

					<div className='grid-12 gap-2'>

						<div className={`span-7 span-12-tablet`}>
							{/* @ts-ignore */}
							<SwitchTransition>
							{/* @ts-ignore */}
								<Transition
									key={selectedIndex}
									timeout={baseDuration}
									appear={true}
									onEntering={fadeIn}
									onExiting={fadeOut}
									nodeRef={nodeRef}
								>
									<div ref={nodeRef}>	
										{selectedIndex !== null && recipesMockData && recipesMockData[selectedIndex]?.img?.url && (
											<>
												<div className='group aspect-video relative overflow-hidden rounded-lg gold-border cursor-pointer'
													onClick={() => setShowLightbox(true)}
												>
													<LoadImage
														src={recipesMockData[selectedIndex].img.url}
														width={recipesMockData[selectedIndex].img.width}
														height={recipesMockData[selectedIndex].img.height}
														alt={recipesMockData[selectedIndex].img.alt || recipesMockData[selectedIndex].name}
														quality="90"
														className='rounded-lg [&_img]:!relative group-hover:scale-110 transition-all duration-300'
													/>
													<div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
														<div className='flex items-center justify-center'>
															<CirclePlay size={128} className='text-2xl text-white scale-110 group-hover:scale-100  transition-all duration-300' />
														</div>
													</div>
												</div>
												<div className="content-container span-12-tablet span-7 pt-4">
													<h3 className='uppercase font3 heading'>{recipesMockData[selectedIndex].name}</h3>
													<p>{recipesMockData[selectedIndex].description}</p>
												</div>
											</>
										)}
									</div>
								</Transition>
							</SwitchTransition>
						</div>
						<div className={`main-grid span-12-tablet span-5 rounded-lg padd`}>
							<div className='scroll-container grid-12 max-h-[80vh]'>
								{itemsMap}
							</div>
						</div>
					</div>
				</Intro>

				<Dialog open={showLightbox} onOpenChange={handleLightboxChange}>
					<DialogTitle className='hidden'>
						Video
					</DialogTitle>
					<DialogContent className="max-w-6xl aspect-video w-full h-auto p-0 bg-black">
						<DialogClose className="regular absolute top-4 right-4 p-2 text-white hover:text-gray-300 z-10">
							<X size={24} />
						</DialogClose>
						<iframe className='w-full h-full overflow-hidden rounded-lg'
							src="https://www.youtube.com/embed/HJ7fo5epNkc?si=dARsKc92QgfxGg5O" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
					</DialogContent>
				</Dialog>
			</section>
		</>
	)
}

export default Recipes
'use client'
import { useCallback, useState } from 'react'
import { LoadImage } from '@/components/new/LoadImage'
import Intro from '@/animations/Intro_Framer'
import {
	Dialog,
	DialogContent,
	DialogClose,
	DialogTitle
} from '@/components/shadcn/ui/dialog'

import { X } from 'lucide-react'

import './style.scss'


export const recipesMockData = [
	{
		id: 1,
		name: "PAN CON BISTEC",
		description: "Thin steak, papitas, and serious flavor—this ain't just a sandwich, this is how we do Pan con Bistec the Sanguich way!",
		img: {
			url: "/og-sang.jpeg",
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
			url: "/og-sang.jpeg",
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
			url: "/og-sang.jpeg",
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
			url: "/og-sang.jpeg",
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

	const handleLightboxChange = useCallback((open: boolean) => {
		setShowLightbox(open)
	}, [])


	const itemsMap = recipesMockData?.map((node, i) => {

		return (
			<div
				key={i}
				className={`span-12 span-12-tablet grid-12 tile gap-1 grid-item rounded-lg ${(hoveredIndex === i || selectedIndex === i) ? 'hovered' : ''}`}
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
					<button onClick={() => setShowLightbox(true)}>
						Watch Video
					</button>
				</div>
			</div>
		)
	})


	return (
		<>
			<section id={`section-recipes-new`} style={{ zIndex: 101 }} className={`content c5  border-type-7 is-inview   `}>
				<Intro delay={50}>


					<div className='heading-section flex justify-center items-center text-[3em] relative'>
						<h2 className="text-[#DCBA7B] m-0 px-[0.1em] py-0 c5 font2 z-[1000]">Recpies</h2>
						<div className="decor-wrap z-[-1] justify-center p-0">
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

						<div className={`span-6 span-12-tablet`}>
							{selectedIndex !== null && recipesMockData && recipesMockData[selectedIndex]?.img?.url && (
								<>
									<div className='aspect-video relative overflow-hidden rounded-lg gold-border'
										onClick={() => setShowLightbox(true)}
									>
										<LoadImage
											src={recipesMockData[selectedIndex].img.url}
											width={recipesMockData[selectedIndex].img.width}
											height={recipesMockData[selectedIndex].img.height}
											alt={recipesMockData[selectedIndex].img.alt || recipesMockData[selectedIndex].name}
											quality="90"
											className='rounded-lg [&_img]:!relative'
										/>
									</div>
									<div className="content-container span-12-tablet  span-7 pt-4">
										<h3 className='uppercase font3 heading'>{recipesMockData[selectedIndex].name}</h3>
										<p>{recipesMockData[selectedIndex].description}</p>
									</div>
								</>

							)}

						</div>
						<div className={`main-grid span-12-tablet span-6 rounded-lg padd aspect-square aspect-auto-mobile-off `}>
							<div className='scroll-container grid-12 aspect-auto-mobile-off'>
								{itemsMap}
							</div>
						</div>
					</div>


				</Intro>

				<Dialog open={showLightbox} onOpenChange={handleLightboxChange}>
					<DialogTitle className='hidden'>
						Video
					</DialogTitle>
					<DialogContent className="max-w-6xl h-[80vh] p-0 bg-black">
						<DialogClose className="regular absolute top-4 right-4 p-2 text-white hover:text-gray-300 z-10">
							<X size={24} />
						</DialogClose>
						<div className="w-full h-full flex items-center justify-center">
							<iframe className='w-full h-full'
								src="https://www.youtube.com/embed/HJ7fo5epNkc?si=dARsKc92QgfxGg5O" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
						</div>
					</DialogContent>
				</Dialog>
			</section>
		</>
	)
}

export default Recipes

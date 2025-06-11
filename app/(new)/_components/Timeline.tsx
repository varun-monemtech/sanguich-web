'use client'
import { useRef } from 'react';
import { LoadImage } from '@/components/new/LoadImage'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Mousewheel, Scrollbar } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import Intro from '@/animations/Intro_Framer';
import BorderHeading from './BorderHeading'
// Timeline data array
const timelineData = [
	{
		image: "/images/timeline/1.jpg",
		alt: "The Spark",
		date: "2014",
		title: "The Spark",
		events: [
			"Rosa and Daniel dreamt up of starting their own sandwich business."
		]
	},
	{
		image: "/images/timeline/2.jpg",
		alt: "Family",
		date: "2015",
		title: "Foundation & Family",
		events: [
			"October 2nd",
			"Our daughter London is born.",
			"",
			"November 15th",
			"Sanguich is officially incorporated.",
			"",
			"December 11th",
			"Daniel leaves his corporate job to pursue the dream. Rosa and Daniel begin laying the foundation of their business."
		]
	},
	{
		image: "/images/timeline/3.jpg",
		alt: "Sacrifice",
		date: "2016",
		title: "Risk, Sacrifice, and Growth",
		events: [
			"Begin designing and trademarking the Sanguich name. Downsize and move in with Rosa’s mom, Haydee, to save for the business. Daniel rebuilds the family home for a healthier living environment.",
			"September 11th",
			"Our second daughter Juliette is born.",
		]
	},
	{
		image: "/images/timeline/4.jpg",
		alt: "Debut",
		date: "2017",
		title: "The Debut",
		events: [
			"Sanguich makes its official debut at the Coconut Grove Arts Festival.",
			"Two weeks later: Success at Carnaval on the Mile - top-performing vendor!",
			"We win Calle Ocho's Cubano Wars.",
			"September 28th",
			"Open the first permanent location-a custom-built shipping container in Little Havana.",
		]
	},
	{
		image: "/images/timeline/5.jpg",
		alt: "Build",
		date: "2018",
		title: "Brick by Brick",
		events: [
			"Daniel begins construction on a brick-and-mortar store.",
			"August 28th",
			"Grand opening of Sanguich in the heart of Calle Ocho.",
		]
	},
	{
		image: "/images/timeline/6.jpg",
		alt: "Perspective",
		date: "2020",
		title: "Pivot & Persevere",
		events: [
			"March 3rd",
			"Sign a second lease in Miami Lakes.",
			"",
			"March 13th",
			"COVID-19 shuts down the world. Sanguich closes for 6 weeks. Daniel and Rosa take the pause to restructure operations and rebuild smarter.",
		]
	},
	{
		image: "/images/timeline/7.jpg",
		alt: "Dream",
		date: "2021",
		title: "From Dream to Legacy",
		events: [
			"Operations improve; more space is needed.",
			"",
			"Begin partnership with JBT to scale production.",
			"",
			"June 21st",
			"Purchase first commercial injector and tumbler.",
			"",
			"October 15th",
			"Close on a new commercial property-construction begins.",
			"",
			"Daniel begins engineering a custom sandwich press with his friend, Christian. Heavy investment in system engineering the company.",
		]
	},
	{
		image: "/images/timeline/8.jpg",
		alt: "Records",
		date: "2022",
		title: "Breaking Records",
		events: [
			"March 5th",
			"Launch of La Plancha at Carnaval on the Mile. 1,300 sandwiches sold in a day-flawless execution. Game changer.",
			"",
			"June 9th",
			"Awarded the Michelin Bib Gourmand, the first ceremony in Florida.",
		]
	},
	{
		image: "/images/timeline/9.jpg",
		alt: "Expansion",
		date: "2023",
		title: "Expansion & Evolution",
		events: [
			"Move into the new commissary kitchen.",
			"",
			"January 16th",
			"The injector is turned on for the first time",
			"",
			"February 2nd",
			"First batch of house-made ham and lechon-1,500 lbs in 45 minutes.",
			"",
			"May 9th",
			"Launch of Sanguich Caf",
			"",
			"May 11th",
			"Receive a second Michelin Bib Gourmand.",
			"",
			"August 28th",
			"Open La Ventanita de los Parados in Little River. Yes they missed an “A” in Ventanita.",
			"",
			"October 24th",
			"Rosa and Daniel marry in Laglio, Italy.",
			"",
			"November 16th",
			"Launch the first clean Cuban-style bread and Media Noche-free from potassium bromate, BHT, mold inhibitors, and more.",
		]
	},
	{
		image: "/images/timeline/10.jpg",
		alt: "Recognition",
		date: "2024",
		title: "National Recognition",
		events: [
			"April 18th",
			"Invited to the White House for Cuban Diaspora Day.",
			"",
			"April 18th",
			"Receive a third Michelin Bib Gourmand.",
			"",
			"June 7th",
			"Grand opening of Coral Gables location-draws over 500 people, the city's largest restaurant opening crowd.",
			"",
			"August 24th",
			"Open at Bayside Marketplace.",
			"",
			"August 27th",
			"Named “Best Cuban Sandwich in South Florida” by Sun Sentinel.",
			"",
			"November",
			"Become one of the first fast casual restaurants to offer a traceable “prime” pork product-a first in Cuban fast casual dining.",
		]
	},
	{
		image: "/images/timeline/11.jpg",
		alt: "Journey",
		date: "2025",
		title: "The Journey Continues",
		events: [
			"November",
			"Aventura store slated to open Nov 2025",
			"",
			"As 2025 unfolds, Sanguich continues to redefine Cuban cuisine-one sandwich at a time. ",
		]
	},
];

function Timeline() {
	const swiperRef = useRef(null);

	return (
		<section id="section-timeline" className="cursor-grab frs-grid frs-grid-ultrawide  bg-[#274F37] py-2 pb-10 relative border-type-7 ">
			<Intro delay={50}>
				<div className="">
					<div className='frs-grid'>
						<BorderHeading>
							<h2 className={` m-0 px-[0.1em] py-0  font2 !bg-[#274F37] z-[1001] text-[#EFE7D3]`}>Our Timeline</h2>
						</BorderHeading>

					</div>

					<div className="timeline-swiper-container pr-5">
						<Swiper
							ref={swiperRef}
							modules={[Mousewheel, Scrollbar, FreeMode]}
							slidesPerView={4}
							freeMode={true}
							mousewheel={
								{
									forceToAxis: true,
								}
							}
							scrollbar={{
								draggable: true,
								hide: false,
							}}
							className="h-full !overflow-visible"
							breakpoints={{
								2: {
									slidesPerView: 1,
								},
								768: {
									slidesPerView: 3,
								},
								1024: {
									slidesPerView: 4,
								}
							}}
						>
							{timelineData.map((slide, index) => (
								<SwiperSlide key={index} className='overflow-hidden' >
									<div className="w-full">

										<div className='px-2'>
											<div className="rounded-[4rem] overflow-hidden  border-2 border-[#D6B35F] w-full  relative">
												<LoadImage
													src={slide.image}
													width={300}
													height={300}
													alt={slide.alt}
													className="w-full h-full  aspect-[18/9]"
												/>
											</div>
										</div>

										<div className='relative w-[101%] h-[1px] bg-white mx-auto my-7'>
											<div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[1px] h-[3rem] bg-white mx-auto ' />
										</div>

										<div className="text-[#EFE7D3] px-2 text-center">
											<h3 className="text-6xl mb-0">{slide.date}</h3>
											<h3 className="text-3xl mt-0 -mb-2 font-bold leading-[1.1]">{slide.title}</h3>
											<div className="flex flex-col gap-1 py-3">
												{slide.events.map((event, eventIndex) => (
													<p key={eventIndex} className="text-sm px-3 m-0 block leading-4">{event}</p>
												))}
											</div>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>

					{/* Custom CSS for Swiper styling */}
					<style jsx global>{`
					.swiper-scrollbar-horizontal {
						height: 25px !important;
						background: #11341F;
						width: 50% !important;
						left: 50% !important;
						transform: translateX(-50%) !important;
					}

					.swiper-scrollbar-drag {
						background: #DCBA7B !important;
					}
		
					.swiper-wrapper {
						padding-bottom: 5rem !important;	
						overflow: visible !important;
					}
          
          .swiper-slide {
            height: auto;
            overflow-y: auto;
            display: flex;
          }
          
        `}</style>
				</div>
			</Intro>
		</section>
	)
}

export default Timeline 
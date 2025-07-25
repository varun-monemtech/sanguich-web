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
			"Rosa and Daniel dream of starting their own sandwich business."
		]
	},
	{
		image: "/images/timeline/2.jpg",
		alt: "Family",
		date: "2015",
		title: "Foundation & Family",
		events: [
			"OCTOBER 2",
			"Daniel and Rosa welcome their first daughter, London.",
			"",
			"NOVEMBER 15",
			"Sanguich is officially incorporated.",
			"",
			"DECEMBER 11",
			"Daniel leaves his corporate job to pursue the vision of Sanguich. Together, Rosa and Daniel begin laying the foundation for their future business."
		]
	},
	{
		image: "/images/timeline/3.jpg",
		alt: "Sacrifice",
		date: "2016",
		title: "Risk, Sacrifice, and Growth",
		events: [
			"They start designing and trademarking the Sanguich name. To save for their venture, they downsize and move in with Rosa's mother, Haydee. During this time, Daniel renovates the family home to create a healthier living environment.",
			"",
			"SEPTEMBER 11",
			"Their second daughter, Juliette, is born.",
		]
	},
	{
		image: "/images/timeline/4.jpg",
		alt: "Debut",
		date: "2017",
		title: "The Debut",
		events: [
			"Sanguich makes its debut at the Coconut Grove Arts Festival. Two weeks later, the brand earns top-performing vendor at Carnaval on the Mile. Shortly after, they win Calle Ocho's Cubano Wars.",
			"",
			"SEPTEMBER 28",
			"Sanguich opens its first permanent location—a custom-built shipping container in Little Havana.",
		]
	},
	{
		image: "/images/timeline/5.jpg",
		alt: "Build",
		date: "2018",
		title: "Brick by Brick",
		events: [
			"Construction begins on their first brick-and-mortar store.",
			"",
			"AUGUST 28",
			"Grand opening of Sanguich’s flagship on Calle Ocho.",
		]
	},
	{
		image: "/images/timeline/6.jpg",
		alt: "Perspective",
		date: "2020",
		title: "Pivot & Persevere",
		events: [
			"MARCH 3",
			"Sanguich signs a second lease in Miami Lakes, signaling continued growth.",
			"",
			"MARCH 13",
			"COVID-19 shuts down the world. Sanguich is forced to close for six weeks. Daniel and Rosa use this time as an opportunity to restructure operations and rebuild the business with greater intention and efficiency.",
		]
	},
	{
		image: "/images/timeline/7.jpg",
		alt: "Dream",
		date: "2021",
		title: "From Dream to Legacy",
		events: [
			"As operations improved, the need for additional space became evident. Sanguich initiated a partnership with JBT to help scale production.",
			"",
			"JUNE 21",
			"The team purchased their first commercial injector and tumbler—key tools to support growing demand.",
			"",
			"OCTOBER 15",
			"They closed on a new commercial property and began construction immediately.",
			"",
			"Around the same time, Daniel began engineering a custom sandwich press with his friend Christian. The company also made significant investments in system engineering to streamline operations and support long-term scalability.",
		]
	},
	{
		image: "/images/timeline/8.jpg",
		alt: "Records",
		date: "2022",
		title: "Breaking Records",
		events: [
			"MARCH 5",
			"Sanguich launches La Plancha at Carnaval on the Mile, selling 1,300 sandwiches in a single day with flawless execution—a defining moment for the brand.",
			"",
			"JUNE 9",
			"Sanguich is awarded its first Michelin Bib Gourmand during Florida’s inaugural ceremony, marking a major milestone in the restaurant’s culinary journey.",
		]
	},
	{
		image: "/images/timeline/9.jpg",
		alt: "Expansion",
		date: "2023",
		title: "Expansion & Evolution",
		events: [
			"JANUARY 16",
			"The commercial injector is activated for the first time.",
			"",
			"FEBRUARY 2",
			"First batch of house-made ham and lechón is produced—1,500 lbs in 45 minutes.",
			"",
			"MAY 9",
			"Launch of Sanguich Café, introducing a new concept under the brand.",
			"",
			"MAY 11",
			"Sanguich earns its second Michelin Bib Gourmand.",
			"",
			"AUGUST 28",
			"Opens La Ventanita de los Parados in Little River. (Yes, they missed an “A” in Ventanita.)",
			"",
			"OCTOBER 24",
			"Rosa and Daniel marry in Laglio, Italy.",
			"",
			"NOVEMBER 16",
			"Launches the first clean Cuban-style and Media Noche breads—free from potassium bromate, BHT, and other additives.",
		]
	},
	{
		image: "/images/timeline/10.jpg",
		alt: "Recognition",
		date: "2024",
		title: "National Recognition",
		events: [
			"APRIL 18",
			"Sanguich is invited to the White House for Cuban Diaspora Day and receives its third Michelin Bib Gourmand on the same day.",
			"",
			"JUNE 7",
			"The Coral Gables location opens, drawing over 500 people—the city’s largest restaurant opening crowd to date.",
			"",
			"AUGUST 24",
			"A new location opens at Bayside Marketplace.",
			"",
			"AUGUST 27",
			"Named “Best Cuban Sandwich in South Florida” by the Sun Sentinel.",
			"",
			"NOVEMBER",
			"Sanguich becomes one of the first fast-casual restaurants to offer a fully traceable “prime” pork product—setting a new standard in Cuban fast casual dining.",
		]
	},
	{
		image: "/images/timeline/11.jpg",
		alt: "Journey",
		date: "2025",
		title: "The Journey Continues",
		events: [
			"NOVEMBER",
			"The Aventura location is slated to open in November 2025.",
			"",
			"As 2025 unfolds, Sanguich continues to redefine Cuban cuisine—one sandwich at a time.",
		]
	},
];

function Timeline() {
	const swiperRef = useRef(null);

	return (
		<section id="section-timeline" className="cursor-grab frs-grid frs-grid-ultrawide  bg-[#274F37] py-2 pb-8 relative border-type-7 ">
			<Intro delay={50}>
				<div className="">
					<div className='frs-grid'>
						<BorderHeading>
							<h2 className={`m-0 px-[0.1em] py-0 font2 !bg-[#274F37] z-[1001] text-[#EFE7D3]`}>Our Timeline</h2>
						</BorderHeading>

					</div>

					<div className="timeline-swiper-container pr-5">
						<Swiper
							ref={swiperRef}
							modules={[Mousewheel, Scrollbar, FreeMode]}
							// slidesPerView={4}
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
									freeMode: {
										enabled: false,
									},
									autoHeight: true
								},
								768: {
									slidesPerView: 3,
									freeMode: {
										enabled: true,
										sticky: false,
									},
									autoHeight: false
								},
								1024: {
									slidesPerView: 4,
									freeMode: {
										enabled: true,
										sticky: false,
									},
									autoHeight: false
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
											<div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[2px] h-[3rem] bg-white mx-auto ' />
										</div>

										<div className="text-[#EFE7D3] px-2 text-center">
											<h3 className="font2 text-6xl -mb-0.5 tracking-[0.02em]">{slide.date}</h3>
											<h3 className="font2 text-4xl mt-0 -mb-2 font-bold leading-[1] tracking-[0.02em]">{slide.title}</h3>
											<div className="flex flex-col gap-1 pt-3">
												{slide.events.map((event, eventIndex) => (
													<p key={eventIndex} className="text-sm 2xl:text-base m-0 block !leading-[1.2]">{event}</p>
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
						height: 1rem !important;
						background: #11341F;
						width: 50% !important;
						left: 50% !important;
						transform: translateX(-50%) !important;
					}

					@media (max-width: 1024px) {
						.swiper-scrollbar-horizontal {
							height: 1.25rem !important;
							width: 70% !important;
							left: calc(50% + 1rem) !important;
						}
					}

					.swiper-scrollbar-drag {
						background: #DCBA7B !important;
					}
		
					.swiper-wrapper {
						padding-bottom: 4rem !important;	
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
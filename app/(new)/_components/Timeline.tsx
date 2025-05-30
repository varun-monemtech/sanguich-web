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
		alt: "Rosa and Daniel",
		events: [
			"Rosa and Daniel dreamt up of starting their own sandwich business."
		]
	},
	{
		image: "/images/timeline/2.jpg",
		alt: "Challenges",
		events: [
			"Their daughter London was born Oct 2.",
			"Daniel & Rosa incorporate Sanguich on Nov 15.",
			"Daniel quit his job Dec 15.",
			"Daniel & Rosa began planning to launch Sanguich."
		]
	},
	{
		image: "/images/timeline/3.jpg",
		alt: "Houses",
		events: [
			"Rosa and Daniel designed and begin the process of trademarking our name.",
			"We dramatically downsize our lives in preparation to launch a new company.",
			"We chose to live with her mom, Haydee. I help to rebuild Rosa's mom's house so that our family has a comfortable and healthy living environment.",
			"Their daughter Juliette is born Sept 11.",
			"Rosa continues to work. Daniel gets an interim job to make ends meet while we plan our next steps.",
			"We finalize the brand aesthetic and our Pan Con Lechon recipe.",
			"We decide to participate in the Coconut Grove Arts Festival."
		]
	},
	{
		image: "/images/timeline/4.jpg",
		alt: "Sanguich Shop",
		events: [
			"We launch Sanguich at CGAF, Feb 1 Immediately successful. One of the fastest selling vendors on record.",
			"We were invited to participate in the Carnival on Alhambra two weeks later. Carnvival we even a greater success.",
			"We were invited to participate in Calle Ocho's Cubano Wars. We won.",
			"Sept 28th we open our custom shipping container on Calle Ocho.",
			"Nov 3rd we have a grand opening party. Largest crowds ever seen for a restaurant in Little Havana.",
			"Nov 28th. Joe Carollo began his attack on our business and family.",
			"Joe Carrollo is successful in his attempt to close us dowm. He Issued the first injunction to impound a small business. "
		]
	},
	{
		image: "/images/timeline/1.jpg",
		alt: "Rosa and Daniel",
		events: [
			"Rosa and Daniel dreamt up of starting their own sandwich business."
		]
	},
	{
		image: "/images/timeline/2.jpg",
		alt: "Challenges",
		events: [
			"Their daughter London was born Oct 2.",
			"Daniel & Rosa incorporate Sanguich on Nov 15.",
			"Daniel quit his job Dec 15.",
			"Daniel & Rosa began planning to launch Sanguich."
		]
	},
	{
		image: "/images/timeline/3.jpg",
		alt: "Houses",
		events: [
			"Rosa and Daniel designed and begin the process of trademarking our name.",
			"We dramatically downsize our lives in preparation to launch a new company.",
			"We chose to live with her mom, Haydee. I help to rebuild Rosa's mom's house so that our family has a comfortable and healthy living environment.",
			"Their daughter Juliette is born Sept 11.",
			"Rosa continues to work. Daniel gets an interim job to make ends meet while we plan our next steps.",
			"We finalize the brand aesthetic and our Pan Con Lechon recipe.",
			"We decide to participate in the Coconut Grove Arts Festival."
		]
	},
	{
		image: "/images/timeline/4.jpg",
		alt: "Sanguich Shop",
		events: [
			"We launch Sanguich at CGAF, Feb 1 Immediately successful. One of the fastest selling vendors on record.",
			"We were invited to participate in the Carnival on Alhambra two weeks later. Carnvival we even a greater success.",
			"We were invited to participate in Calle Ocho's Cubano Wars. We won.",
			"Sept 28th we open our custom shipping container on Calle Ocho.",
			"Nov 3rd we have a grand opening party. Largest crowds ever seen for a restaurant in Little Havana.",
			"Nov 28th. Joe Carollo began his attack on our business and family.",
			"Joe Carrollo is successful in his attempt to close us dowm. He Issued the first injunction to impound a small business. "
		]
	},
];

function Timeline() {
	const swiperRef = useRef(null);

	return (
		<section id="section-timeline" className="frs-grid frs-grid-ultrawide  bg-[#274F37] py-2 pb-10 relative border-type-7 ">
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

										<div className="text-[#EFE7D3] px-2">
											{slide.events.map((event, eventIndex) => (
												<p key={eventIndex} className="text-sm">{event}</p>
											))}
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
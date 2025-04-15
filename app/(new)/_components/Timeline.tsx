'use client'
import React, { useRef } from 'react';
import { LoadImage } from '@/components/new/LoadImage'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Scrollbar, FreeMode } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';

// Timeline data array
const timelineData = [
	{
		image: "/founders.png",
		alt: "Rosa and Daniel",
		events: [
			"Rosa and Daniel dreamt up of starting their own sandwich business."
		]
	},
	{
		image: "/images/timeline-finger.jpg",
		alt: "Challenges",
		events: [
			"Their daughter London was born Oct 2.",
			"Daniel & Rosa incorporate Sanguich on Nov 15.",
			"Daniel quit his job Dec 15.",
			"Daniel & Rosa began planning to launch Sanguich."
		]
	},
	{
		image: "/images/timeline-houses.jpg",
		alt: "Houses",
		events: [
			"Rosa and Daniel designed and begin the process of transforming our name.",
			"We dramatically downsize our lives in preparation to launch a new company.",
			"We chose to live with her mom, Haydee. I help to rehab Rosa's mom's house so that we could have a comfortable and healthy living environment.",
			"Their daughter Juliette is born Sept 11.",
			"Rosa continues to work, Daniel quits an amazing job to make ends meet while we plan our next steps.",
			"We finalize the brand aesthetic and our Pan Con Lechon recipe.",
			"We decide to participate in the Coconut Grove Arts Festival."
		]
	},
	{
		image: "/images/timeline-shop.jpg",
		alt: "Sanguich Shop",
		events: [
			"We launch Sanguich at CGAF, Feb 1. Immediately successful. One of the fastest selling vendors on record.",
			"We were invited to participate in the Carnival on Alhambra two weeks later. Carnival we even a greater success.",
			"We were invited to participate in Calle Ocho's Cubano Week. We win.",
			"Sept 28th we open our custom shipping container on Calle Ocho."
		]
	},
	{
		image: "/images/timeline-interior.jpg",
		alt: "Sanguich Interior",
		events: [
			"Nov 3rd we have a grand opening party. Largest crowds ever seen for a restaurant in Little Havana.",
			"Nov 28th Joe Carollo began his attack on our business and family.",
			"Joe Carollo is successful in his attempt to close us down. He issued the first injunction to impound a small business."
		]
	}
];

function Timeline() {
	const swiperRef = useRef(null);

	return (
		<section id="section-timeline" className="bg-[#274F37] py-16 md:py-24 relative">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-5xl md:text-6xl font2 text-[#EFE7D3] mb-6 relative inline-block">
						Our Timeline
						<div className="absolute -left-24 -right-24 h-px bg-[#EFE7D3]/40 top-1/2"></div>
					</h2>
				</div>

				<div className="timeline-swiper-container relative h-[70vh] md:h-[80vh]">
					<Swiper
						ref={swiperRef}
						modules={[Mousewheel, Scrollbar]}
						spaceBetween={30}
						slidesPerView={2}
						freeMode={true}
						// mousewheel={true}
						scrollbar={{
							draggable: true,
						}}
						className="h-full"
					>
						{timelineData.map((slide, index) => (
							<SwiperSlide key={index} className="flex items-center">
								<div className="timeline-column w-full px-4 md:max-w-3xl mx-auto">
									<div className="flex flex-col md:flex-row md:items-center gap-8">
										<div className="rounded-full overflow-hidden mb-6 md:mb-0 border-2 border-[#EFE7D3]/20 w-full max-w-[220px] mx-auto aspect-square relative flex-shrink-0">
											<LoadImage
												src={slide.image}
												width={300}
												height={300}
												alt={slide.alt}
												className="w-full h-full object-cover absolute inset-0"
												animation="fade"
											/>
										</div>
										<div className="text-[#EFE7D3]">
											{slide.events.map((event, eventIndex) => (
												<p key={eventIndex} className="text-sm mb-3 font-light">{event}</p>
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
          .swiper-pagination {
            right: 10px !important;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }
          
          .timeline-bullet {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: rgba(239, 231, 211, 0.5);
            margin: 4px 0;
            cursor: pointer;
            display: inline-block;
            transition: all 0.3s ease;
            opacity: 1;
          }
          
          .timeline-bullet-active {
            background-color: rgba(239, 231, 211, 1);
            transform: scale(1.2);
          }
          
          .swiper-slide {
            height: auto;
            overflow-y: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          /* Hide scrollbar for Chrome, Safari and Opera */
          .swiper-slide::-webkit-scrollbar {
            display: none;
          }
          
          /* Hide scrollbar for IE, Edge and Firefox */
          .swiper-slide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>
			</div>
		</section>
	)
}

export default Timeline 
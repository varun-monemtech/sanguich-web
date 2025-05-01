'use client'
import React from 'react'
import { LoadImage } from '@/components/new/LoadImage'
import Intro from '@/animations/Intro_Framer'
import SlotCounter from 'react-slot-counter'

// Number display with slot machine effect
const NumberDisplay = ({ number, className }) => {
	// Convert to string and add commas
	const formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	
	return (
		<div className={className}>
			<SlotCounter
				value={formatted}
				duration={1}
				startValue="0"
				useMonospaceWidth
				charClassName="inline-block"
				animateOnVisible={true}
			/>
		</div>
	)
}

function CounterItem({ endValue, label, image, imageAlt }) {
	return (
		<div className="flex flex-col items-center">
			<div className="w-52 h-52 border-2 border-[#707070] relative mb-2 md:mb-4 rounded-full overflow-hidden">
				<LoadImage
					src={image}
					width={256}
					height={256}
					alt={imageAlt}
					className="object-cover"
				/>
			</div>

			<div className="md:min-h-[3rem]">
				<NumberDisplay
					number={endValue}
					className="text-6xl md:text-7xl font2 text-[#222121] text-center overflow-hidden"
				/>
			</div>

			<p className="text-lg font1 uppercase text-[#274F37] whitespace-pre-line text-center">
				{label}
			</p>
		</div>
	)
}

function CounterSection() {
	return (
		<section
			id="section-counter"
			className="frs-grid bg-[#E1B875] py-16 md:py-12 md:px-4 relative in-view"
		>
			
			<div className={` decor-wrap !p-0 !z-[-1] justify-start filter-white border-type-7 max-md:hidden max-md:opacity-0`} style={{ filter: 'brightness(0.65)' }}>
				<div className="decor-top with-extra top-1/3 ">
					<div className="decor-top-left"></div>
					<div className="decor-top-center with-extra">
						<div className="decor-top-center-extra-left"></div>
						<div id="space-logo" className="decor-top-center-extra-center"></div>
						<div className="decor-top-center-extra-right"></div>
					</div>
					<div className="decor-top-right"></div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-12">
				<Intro delay={0} className='
					[&.not-in-view_.content]:opacity-0
					[&.not-in-view_.content]:translate-y-[4rem]
					[&.in-view_.content]:opacity-100
					[&.in-view_.content]:translate-y-[0%]
					[&.in-view_.content]:ease-in-out
					[&.in-view_.content]:duration-500
				'>
					<CounterItem
						endValue={4234882}
						label={`SANGUICHES \n SERVED`}
						image="/images/counters/sanguich.jpg"
						imageAlt="Sandwich served"
					/>
				</Intro>
				<Intro delay={250} className='
					[&.not-in-view_.content]:opacity-0
					[&.not-in-view_.content]:translate-y-[4rem]
					[&.in-view_.content]:opacity-100
					[&.in-view_.content]:translate-y-[0%]
					[&.in-view_.content]:ease-in-out
					[&.in-view_.content]:duration-500
				'>
					<CounterItem
						endValue={7234882}
						label={`CAFECITOS \n SERVED`}
						image="/images/counters/cafecito.jpg"
						imageAlt="Cafecito being made"
					/>
				</Intro>
				<Intro delay={500} className='
					[&.not-in-view_.content]:opacity-0
					[&.not-in-view_.content]:translate-y-[4rem]
					[&.in-view_.content]:opacity-100
					[&.in-view_.content]:translate-y-[0%]
					[&.in-view_.content]:ease-in-out
					[&.in-view_.content]:duration-500
				'>
					<CounterItem
						endValue={32234882}
						label={`SHARED \n LAUGHS`}
						image="/images/counters/laughs.jpg"
						imageAlt="People laughing"
					/>
				</Intro>
				<Intro delay={750} className='
					[&.not-in-view_.content]:opacity-0
					[&.not-in-view_.content]:translate-y-[4rem]
					[&.in-view_.content]:opacity-100
					[&.in-view_.content]:translate-y-[0%]
					[&.in-view_.content]:ease-in-out
					[&.in-view_.content]:duration-500
				'>
					<CounterItem
						endValue={32234882}
						label={`HUGS \n GIVEN`}
						image="/images/counters/hugs.jpg"
						imageAlt="People hugging"
					/>
				</Intro>
			</div>
		</section>
	)
}

export default CounterSection 
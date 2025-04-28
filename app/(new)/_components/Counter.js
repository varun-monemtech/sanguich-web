'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { LoadImage } from '@/components/new/LoadImage'
import Intro from '@/animations/Intro_Framer'

// Simple animated digit
const AnimatedDigit = ({ value, index, total }) => {
	// Define animation properties based on position
	// Right digits animate longer than left digits
	const delay = index * 0.1 + (total - index - 1) * 0.02

	return (
		<motion.span
			className="inline-block text-center"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{
				duration: 0.15,
				delay
			}}
		>
			{value}
		</motion.span>
	)
}

// Comma animation
const AnimatedComma = ({ delay }) => (
	<motion.span
		className="inline-block"
		initial={{ opacity: 0 }}
		whileInView={{
			opacity: 1,
			transition: { delay }
		}}
		viewport={{ once: true }}
	>
		,
	</motion.span>
)

// Number display with slide-from-bottom effect
const NumberDisplay = ({ number, className }) => {
	// Convert to string and add commas
	const formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	const characters = formatted.split('')

	return (
		<div className={className}>
			{characters.map((char, i) => (
				<React.Fragment key={i}>
					{char === ',' ? (
						<AnimatedComma delay={(i + 1) * 0.05} />
					) : (
						<AnimatedDigit
							value={char}
							index={i}
							total={characters.length}
						/>
					)}
				</React.Fragment>
			))}
		</div>
	)
}

function CounterItem({ endValue, label, image, imageAlt }) {

	return (
		<div className="flex flex-col items-center">
			<div className="w-32 h-32 md:w-52 md:h-52  border-2 border-[#707070] relative mb-2 md:mb-4 rounded-full overflow-hidden">
				<LoadImage
					src={image}
					width={256}
					height={256}
					alt={imageAlt}
					className="object-cover "
				/>
			</div>

			<div className="md:min-h-[3rem]">
				<NumberDisplay
					number={endValue}
					className="text-3xl md:text-7xl font2 text-[#222121] text-center overflow-hidden"
				/>
			</div>

			<p className="text-md md:text-lg font1 uppercase text-[#274F37] whitespace-pre-line text-center">
				{label}
			</p>
		</div>
	)
}

function CounterSection() {

	return (
		<section
			id="section-counter"
			className="frs-grid bg-[#E1B875] py-16 md:py-12 md:px-4 relative"
		>
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
				<Intro delay={50} className='

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
				<Intro delay={100} className='

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
				<Intro delay={150} className='

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
				<Intro delay={200} className='

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
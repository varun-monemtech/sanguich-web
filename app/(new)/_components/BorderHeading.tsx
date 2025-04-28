import Intro from "@/animations/Intro_Framer";

export default function BorderHeading({ children, className, filterColor }: { children?: React.ReactNode, className?: string, filterColor?: string }) {
	return (
		<Intro delay={50} className={`${className}`}>
			<div className='flex justify-center py-2 items-center text-[1.5em] md:text-[3em] relative border-type-7 '>
				{children}
				<div className={`decor-wrap !p-0 z-[-1] justify-center ${filterColor ? `filter-${filterColor}` : ''}`}>
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
		</Intro>
	)
}
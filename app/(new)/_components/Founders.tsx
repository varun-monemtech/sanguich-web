import Intro from '@/animations/Intro_Framer'
import { LoadImage } from '@/components/new/LoadImage'

function Founders() {

	return (
		<section id={`section-founder`} className={`frs-grid-full bg-[#EFE7D3] border-type-10`}>
			<Intro delay={50}>
				<div className="decor-wrap  !z-[-1]">
					<div className="decor-top">
						<div className="decor-top-left"></div>
						<div className="decor-top-center"></div>
						<div className="decor-top-right"></div>
					</div>
					<div className="decor-center">
						<div className="decor-center-left"></div>

						<div className="decor-center-right"></div>
					</div>
					<div className="decor-bottom">
						<div className="decor-bottom-left"></div>
						<div className="decor-bottom-center"></div>
						<div className="decor-bottom-right"></div>
					</div>
				</div>
				<div className='frs-grid'>
				<div className="content-wrapper py-12 px-8 md:py-16 md:px-12 lg:py-20 lg:px-16">
					<div className="mx-auto max-w-7xl">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center">
							<div className="order-2 lg:order-1">
								<h2 className="text-5xl  lg:text-7xl font2 !text-[#274F37] mb-5">Our Founders</h2>
								<div className="text-md md:text-lg prose prose-lg text-[#274F37] relative before:absolute before:h-[2px] before:w-[4em] before:mb-4 before:left-0 before:bottom-full before:bg-[#D7B35E]">
									<p className="mb-4">
										Daniel Figueredo and Rosa Romero, lifelong Miami
										locals and culinary entrepreneurs, founded Sanguich
										with a mission to elevate the classic Cuban sandwich
										and celebrate their city's vibrant food culture.
									</p>
									<p className="mb-4">
										Their partnership, rooted in shared Cuban-American
										heritage and a passion for authentic flavors, inspired
										a restaurant that transforms traditional recipes into
										modern culinary experiences that honor Miami's rich
										gastronomic landscape.
									</p>
								</div>
							</div>
							<div className="order-1 lg:order-2 relative">
								<div className="aspect-square overflow-hidden">
									<LoadImage
										src="/founders.png"
										width={800}
										height={800}
										alt="Sanguich Founders Daniel Figueredo and Rosa Romero"
										className="rounded-full"
										animation="fade"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				</div>
			</Intro>

		</section>
	)
}

export default Founders
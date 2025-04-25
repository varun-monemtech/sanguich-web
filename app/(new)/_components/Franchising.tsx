import Intro from '@/animations/Intro_Framer'
import { LoadImage } from '@/components/new/LoadImage'

function Franchising() {

	return (
		<section id={`section-franchising`} className={`frs-grid-full bg-[#EFE7D3] border-type-10`}>
			<Intro delay={50}>
				<div className="decor-wrap ">
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
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
								<div className="order-2 lg:order-1">
									<h2 className="text-4xl md:text-5xl lg:text-6xl font2 !text-[#274F37] mb-6">Franchising</h2>
									<div className="prose prose-lg text-[#274F37]">
										<p className="mb-4">
											Franchising Coming Soon
											We’re getting ready to bring the sabor to more cities. Sanguich will soon be offering exclusive franchising opportunities for those who share our passion for Cuban flavor, culture, and community.
										</p>
										<p className="mb-4">
											Franchising coming soon.
											Interested in joining la familia?
										</p>
										<p className="mb-4">
											Reach out for more info <a href="mailto:letsgrow@sanguich.com">letsgrow@sanguich.com</a>
										</p>
									</div>
								</div>
								<div className="order-1 lg:order-2 relative">
									<div className="aspect-square overflow-hidden">
										<LoadImage
											src="/franchising.png"
											width={800}
											height={800}
											alt="Sanguich Franchising"
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

export default Franchising
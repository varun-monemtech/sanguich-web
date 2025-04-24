import Intro from "@/animations/Intro_Framer";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {


	return (
		<>
			<Intro delay={50} className="bg-[#D0C8B9] pt-13 px-24">
				<div className='flex justify-center py-2 items-center text-[3em] relative border-type-7 '>
					<h2 className="text-[#274F37] px-[0.1em] py-0 !m-0 z-[1001] bg-[#D0C8B9] font2">News</h2>
					<div className="decor-wrap !p-0 z-[-1] justify-center filter-green">
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
			{children}
		</>
	)
}
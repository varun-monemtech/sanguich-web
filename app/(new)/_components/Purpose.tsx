import { LoadImage } from '@/components/new/LoadImage'

function 	Purpose() {

	return (
		<section id={`section-purpose`} className={`frs-grid frs-grid-ultrawide bg-[#EFE7D3]`}>
			<div className="aspect-video overflow-hidden">
				<LoadImage
					src="/purpose.jpg"
					width={1920}
					height={1080}
					alt="Sanguich Purpose"
					className='opacity-50'
				/>
			</div>
			<div className='absolute top-1/2 -translate-y-1/2  left-0 w-full h-auto flex items-center justify-center bg-[#1D3B29]'>
				<h2 className='text-[#EFE7D3] font2 py-3 text-6xl'><span className='text-[#D7B35E] text-5xl'>Our Purpose is  </span>We exist to preserve Cuban culture through food and hospitality.</h2>
			</div>
		</section>
	)
}

export default Purpose
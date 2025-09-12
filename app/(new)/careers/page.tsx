import PageTransition from '@/animations/PageTransition'
import CF7Careers from '@/components/Form/CF7/Careers'
import { LoadImage } from '@/components/new/LoadImage'
import './style.scss'
import { Metadata, ResolvingMetadata } from 'next'

async function getPage() {
	const res = await fetch('https://cms.sanguich.com/wp-json/wp/v2/pages?slug=careers',
		{
			// cache: 'no-store',
			next: {
				revalidate: 3600
			}
		}
	)
	return res.json().then((data) => data[0])
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }>}, parent: ResolvingMetadata): Promise<Metadata>  {
  const resolvedParams = await params;
  const { yoast_head_json } = await getPage()
  const previousOpenGraphData = (await parent).openGraph || {}

  return {
    ...(yoast_head_json?.title && { title: yoast_head_json?.title }),
    ...(yoast_head_json?.description && { description: yoast_head_json?.description }),
    openGraph: {
      ...previousOpenGraphData,
      ...(yoast_head_json?.title && { title: yoast_head_json?.title }),
      ...(yoast_head_json?.description && { description: yoast_head_json?.description }),
    }
  }
}
export default async function MainPage() {

  return (
    <PageTransition>
      <main id="mainframe" className={`main-cart page-cart x1`}>
				<div className='grid grid-cols-12 pt-2'>
					<div className='lg:col-span-5 col-span-12 relative'>
						<LoadImage
							src={'/careers.jpg'}
							width={1000}
							height={1000}
							alt='Careers Hero'
							className='max-lg:aspect-[16/9] max-lg:object-cover'
						/>
					</div>
					<div className='lg:col-span-7 col-span-12'>
						<CF7Careers />
					</div>
				</div>
      </main>
    </PageTransition>
  )
}
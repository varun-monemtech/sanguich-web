import PageTransition from '@/animations/PageTransition'
import CF7Careers from '@/components/Form/CF7/Careers'
import { LoadImage } from '@/components/new/LoadImage'
import './style.scss'

// Get Metadata
export async function generateMetadata() {
  return {
    title: 'Careers',
    description: process.env.NEXT_PUBLIC_SITEDESCRIPTION,
    // url: 'theurl',
    siteName: process.env.NEXT_PUBLIC_SITENAME,
    images: [
      {
        url: 'urltoimg',
        width: 800,
        height: 600
      }
    ],
    locale: 'en-US',
  }
}

export default async function MainPage() {

  return (
    <PageTransition>
      <main id="mainframe" className={`main-cart page-cart x1`}>
				<div className='grid grid-cols-12 pt-2'>
					<div className='lg:col-span-6 col-span-12 relative'>
						<LoadImage
							src={'/careers.jpg'}
							width={1000}
							height={1000}
							alt='Careers Hero'
							className='max-lg:aspect-[16/9] max-lg:object-cover'
						/>
					</div>
					<div className='lg:col-span-6 col-span-12'>
						<CF7Careers />
					</div>
				</div>
      </main>
    </PageTransition>
  )
}
import PageTransition from '@/animations/PageTransition'
import CF7Careers from '@/components/Form/CF7/Careers'
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
      <main id="mainframe" className={`main-cart page-cart c5`}>
        <CF7Careers />
      </main>
    </PageTransition>
  )
}
import { Metadata } from 'next'
import Header from '@/components/Header'
import ContextProvider from '@/provider/ContextProvider'
import ExternalContextProvider from '@/provider/ExternalContextProvider'
// import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'

import './style.scss'
import '../EVG/css/_core.scss'
import { Footer } from '@/components/Footer'
import { NaviContextProvider } from '@/context/NaviContext'
// import { DetectDevice } from '../components/DetectDevice'

// // Primary Font (Google)
// const fontPrimary = localFont({
//   src: [
//     {
//       path: '../EVG/css/fonts/suisse/SuisseIntl-Regular.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../EVG/css/fonts/suisse/SuisseIntl-Bold.woff2',
//       weight: '700',
//       style: 'normal',
//     },
//   ],
// 	variable: '--font-primary'
// })

// Meta Things for SEO
export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_SITENAME}`,
    default: `${process.env.NEXT_PUBLIC_SITENAME}`, // a default is required when creating a template
  },
  description: process.env.NEXT_PUBLIC_SITEDESCRIPTION,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITEURL}`),
  alternates: {
    canonical: './',
    // languages: {
    //   'en-US': '/en-US',
    // },
  },
  openGraph: {
    title: `${process.env.NEXT_PUBLIC_SITENAME}`,
    description: process.env.NEXT_PUBLIC_SITEDESCRIPTION,
    url: process.env.NEXT_PUBLIC_SITEURL,
    // images: '/og?title=MicroPrism',
    locale: 'en_US',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // maximumScale: 1,
}


async function getOptions() {
	const res = await fetch('https://cms.sanguich.com/wp-json/acf/v3/options/options/',
		{
			// cache: 'no-store',
			next: {
				revalidate: 3600
			}
		}
	)
	return res.json()
}


export default async function RootLayout({
		children,
	}: {
		children: React.ReactNode;
	}) {

	// const pagesResponse = getPages()
	// const postsResponse = getPosts()
	const options = await getOptions()

	// const [posts] = await Promise.all([postsResponse]) // this enable parallel fetching
	
  return (
    <html lang="en">
			
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta name="theme-color" content="#151515" />
			<link rel="icon" href="/favicon.ico" />
      {/* <meta
        name='viewport'
        content='width=device-width, height=device-height, initial-scale=1, shrink-to-fit=no'
      /> */}

      {/* <DetectDevice />// Too slow */}
			
      <body className={``}>

        <div id="portal-dialog"></div>
        
        <ContextProvider>

          <ExternalContextProvider>

            {/* <Suspense> */}
              <NaviContextProvider location="">
                <Header />
              </NaviContextProvider>
            {/* </Suspense> */}

            <main className="">
							<NaviContextProvider location="">
              	{children}
              </NaviContextProvider>
                
            </main>
            
          </ExternalContextProvider>

        </ContextProvider>

        <Footer options={options} />

        <Analytics />

      </body>
    </html>
  )
}
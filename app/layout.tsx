import { Metadata } from 'next'
import { Header } from '../components/Header'

// import localFont from 'next/font/local'

import '../EVG/css/_core.scss'
import { Footer } from '../components/Footer'
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
    template: `%s | ${process.env.SITENAME}`,
    default: `${process.env.SITENAME}`, // a default is required when creating a template
  },
  description: process.env.SITEDESCRIPTION,
  metadataBase: new URL(`${process.env.SITEURL}`),
  alternates: {
    canonical: '/',
    // languages: {
    //   'en-US': '/en-US',
    // },
  },
  openGraph: {
    title: `${process.env.SITENAME}`,
    description: process.env.SITEDESCRIPTION,
    url: process.env.SITEURL,
    // images: '/og?title=MicroPrism',
    locale: 'en_US',
    type: 'website',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}


// async function getPages() {
// 	const res = await fetch('https://www.futuredocs.com/wp-json/better-rest-endpoints/v1/pages?content=false&acf=false&media=false&per_page=299',
// 		{
// 			// cache: 'no-store',
// 			next: {
// 				revalidate: 600
// 			}
// 		}
// 	)
// 	return res.json()
// }

// async function getPosts() {
// 	const res = await fetch('https://evgreen.unixstorm.org/FRS-3/wp-json/wp/v2/posts',
// 		{
// 			// cache: 'no-store',
// 			next: {
// 				revalidate: 600
// 			}
// 		}
// 	)
// 	return res.json()
// }

async function getOptions() {
	const res = await fetch('https://cms.sanguich.com/wp-json/acf/v3/options/options/',
		{
			// cache: 'no-store',
			next: {
				revalidate: 600
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
			
      <meta charSet='utf-8' />
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

				<Header />
       
				<main className="">

					{children}
						
				</main>

        <Footer options={options} />

      </body>
    </html>
  )
}
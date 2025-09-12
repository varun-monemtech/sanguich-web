import { Metadata } from 'next'
import localFont from 'next/font/local'
import Header from './_components/Header'
import ContextProvider from '@/provider/ContextProvider'
import { Analytics } from '@vercel/analytics/react'

import './style.scss'
import './global.css'
import '@/EVG/css/_core.scss'
import { Footer } from './_components/Footer'
import { NaviContextProvider } from '@/context/NaviContext'

// Local font loading
const intensa = localFont({
	src: [
		{
			path: '../../EVG/css/fonts/intensa/Intensa-College.woff2',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../EVG/css/fonts/intensa/Intensa-College.woff',
			weight: '600',
			style: 'normal',
		}
	],
	variable: '--font-intensa',
	display: 'swap',
})

const lhfDesirePro = localFont({
	src: [
		{
			path: '../../EVG/css/fonts/lhfdesirepro/LHFDesirePRO.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../EVG/css/fonts/lhfdesirepro/LHFDesirePRO.woff',
			weight: '400',
			style: 'normal',
		}
	],
	variable: '--font-lhf-desire-pro',
	display: 'swap',
})

const lhfDesireUppercase = localFont({
	src: [
		{
			path: '../../EVG/css/fonts/lhfdesirepro/LHFDesireUppercase1.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../EVG/css/fonts/lhfdesirepro/LHFDesireUppercase1.woff',
			weight: '400',
			style: 'normal',
		}
	],
	variable: '--font-lhf-desire-uppercase',
	display: 'swap',
})

const josefinSans = localFont({
	src: [
		{
			path: '../../EVG/css/fonts/josefinsans/JosefinSans-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../EVG/css/fonts/josefinsans/JosefinSans-Regular.woff',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../EVG/css/fonts/josefinsans/JosefinSans-SemiBold.woff2',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../EVG/css/fonts/josefinsans/JosefinSans-SemiBold.woff',
			weight: '600',
			style: 'normal',
		}
	],
	variable: '--font-josefin-sans',
	display: 'swap',
})

async function getOptions() {
	const res = await fetch('https://cms.sanguich.com/wp-json/acf/v3/options/options/',
		{
			cache: 'no-store',
			// next: {
			// 	revalidate: 3600
			// }
		}
	)
	return res.json()
}


export async function generateMetadata(): Promise<Metadata> {
	const options = await getOptions()
	return {
		title: {
			template: `%s | ${options.acf.site_name || process.env.NEXT_PUBLIC_SITENAME}`,
			default: `${options.acf.site_name || process.env.NEXT_PUBLIC_SITENAME}`, // a default is required when creating a template
		},
		description: options.acf.site_description || process.env.NEXT_PUBLIC_SITEDESCRIPTION,
		metadataBase: process.env.NODE_ENV === 'development' ?
			new URL(`http://localhost:3000`)
			: new URL(`${options.acf.site_url || process.env.NEXT_PUBLIC_SITEURL}`)
		,
		alternates: {
			canonical: './',
		},
		openGraph: {
			title: `${options.acf.site_name || process.env.NEXT_PUBLIC_SITENAME}`,
			description: options.acf.site_description || process.env.NEXT_PUBLIC_SITEDESCRIPTION,
			url: options.acf.site_url || process.env.NEXT_PUBLIC_SITEURL,
			locale: 'en_US',
			type: 'website',
		},
	}
}


export const viewport = {
	width: 'device-width',
	initialScale: 1,
}


// async function getOptions() {
// 	const res = await fetch('https://cms.sanguich.com/wp-json/acf/v3/options/options/',
// 		{
// 			next: {
// 				revalidate: 3600
// 			}
// 		}
// 	)
// 	return res.json()
// }


export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {


	const options = await getOptions()


	return (
		<html lang="en">
			<head>
				<meta httpEquiv='x-ua-compatible' content='ie=edge' />
				<meta name="theme-color" content="#151515" />
				<meta name="apple-mobile-web-app-title" content="Sanguich" />

				<style>{`
          html {
            font-size: clamp(16px,1vw,25px);
          }
        `}</style>
			</head>


			<body className={`frs-grid font3 ${intensa.variable} ${lhfDesirePro.variable} ${lhfDesireUppercase.variable} ${josefinSans.variable}`}>
{JSON.stringify(options.acf.site_name)}
				<div id="portal-dialog"></div>

				<ContextProvider>


					<NaviContextProvider location="">
						<Header />
					</NaviContextProvider>

					<main className="frs-grid-full overflow-hidden">
						<NaviContextProvider location="">
							{children}
						</NaviContextProvider>

					</main>

				</ContextProvider>

				<Footer />

				<Analytics />

			</body>
		</html>
	)
}
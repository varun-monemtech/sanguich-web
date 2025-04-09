import { Metadata } from 'next'
import Header from '@/components/Header'
import ContextProvider from '@/provider/ContextProvider'
import ExternalContextProvider from '@/provider/ExternalContextProvider'
import { Analytics } from '@vercel/analytics/react'

import './style.scss'

import '@/EVG/css/_core.scss'
import { Footer } from '@/components/Footer'
import { NaviContextProvider } from '@/context/NaviContext'

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
	},
	openGraph: {
		title: `${process.env.NEXT_PUBLIC_SITENAME}`,
		description: process.env.NEXT_PUBLIC_SITEDESCRIPTION,
		url: process.env.NEXT_PUBLIC_SITEURL,
		locale: 'en_US',
		type: 'website',
	},
}

export const viewport = {
	width: 'device-width',
	initialScale: 1,
}


async function getOptions() {
	const res = await fetch('https://cms.sanguich.com/wp-json/acf/v3/options/options/',
		{
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


	const options = await getOptions()


	return (
		<html lang="en">

			<meta httpEquiv='x-ua-compatible' content='ie=edge' />
			<meta name="theme-color" content="#151515" />
			<link rel="icon" href="/favicon.ico" />

			<body className={``}>

				<div id="portal-dialog"></div>

				<ContextProvider>

					<ExternalContextProvider>

						<NaviContextProvider location="">
							<Header />
						</NaviContextProvider>

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
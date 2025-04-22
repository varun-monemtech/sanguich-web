

import Menu from '../_components/Menu'
import ACFOrder from '@/components/ACF/Sanguich/Order'
import ACFSeenOn from '@/components/ACF/Sanguich/SeenOn'
import ProductGrid from '../_components/ProductGrid'
import ACFOurStory from '@/components/ACF/Sanguich/OurStory'
import ACFHola from '../_components/Hola'
import ACFAddress from '../_components/Address'
import ACFCatering from '../_components/Catering'

import Counter from '../_components/Counter'

import ContextProvider from '@/provider/ContextProvider'

import { Metadata } from 'next'
import Hero from '../_components/Hero'
import Recipes from '../_components/Recipes'
import { Fragment } from 'react'

async function getPage() {
	const res = await fetch('https://cms.sanguich.com/wp-json/acf/v3/pages/5',
		{
			// cache: 'no-store',
			next: {
				revalidate: 3600
			}
		}
	)
	return res.json()
}

async function getPosts() {
	const res = await fetch('https://cms.sanguich.com/wp-json/wp/v2/posts',
		{
			// cache: 'no-store',
			next: {
				revalidate: 3600
			}
		}
	)
	return res.json()
}

export const metadata: Metadata = {
	title: `Home | ${process.env.NEXT_PUBLIC_SITENAME}`,
}


export default async function MainPage() {
	const page = await getPage()
	const posts = await getPosts()

	const Sections = page?.acf?.sections.map((section: any, i: number) => {

		if (section.acf_fc_layout === 'hero') {
			return (
				<Hero key={i} />
			)
		}

		if (section.acf_fc_layout === 'menu') {
			return (
				<Menu key={i} {...section} />
			)
		}


		if (section.acf_fc_layout === 'seen_on') {
			return (
				<ACFSeenOn key={i} {...section} />
			)
		}

		if (section.acf_fc_layout === 'our_story') {
			return (
				<ACFOurStory key={i} {...section} />
			)
		}

		if (section.acf_fc_layout === 'hola') {
			return (
				<ACFHola key={i} {...section} />
			)
		}

		if (section.acf_fc_layout === 'address') {
			return (
				<Fragment key={i}>
					<ACFAddress  {...section} />
					<Recipes  {...section} />
				</Fragment>
			)
		}

		if (section.acf_fc_layout === 'catering') {
			return (
				<ACFCatering key={i} {...section} />
			)
		}


		if (section.acf_fc_layout === 'shop') {
			return (
				<ContextProvider key={i}>
					<ProductGrid {...section} />
				</ContextProvider>
			)
		}

	})

	return (
		<>
			{Sections ? Sections : null}
			<Counter />
		</>
	)
}
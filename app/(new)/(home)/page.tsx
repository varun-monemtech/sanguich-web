import React from 'react'
import Menu from '../_components/Menu'
// import ACFOrder from '@/components/ACF/Sanguich/Order'
import ACFSeenOn from '../_components/SeenOn'
// import ProductGrid from './_components/ProductGrid'
import ACFOurStory from '../_components/OurStory'
import ACFHola from '../_components/Hola'
import ACFAddress from '../_components/Address'
import ACFCatering from '../_components/Catering'

import Counter from '../_components/Counter'

// import ContextProvider from '@/provider/ContextProvider'

import { Metadata, ResolvingMetadata } from 'next'
import Hero from '../_components/Hero'
// import Recipes from './_components/Recipes'

async function getPage() {
	const res = await fetch('https://wordpress-797258-5874632.cloudwaysapps.com/wp-json/wp/v2/pages?slug=home',
		{
			cache: 'no-store',
			next: {
				revalidate: 3600
			}
		}
	)
	return res.json().then((data) => data[0])
}

// async function getPosts() {
// 	const res = await fetch('https://wordpress-797258-5874632.cloudwaysapps.com/wp-json/wp/v2/posts',
// 		{
// 			// cache: 'no-store',
// 			next: {
// 				revalidate: 3600
// 			}
// 		}
// 	)
// 	return res.json()
// }

export async function generateMetadata({ params }: { params: Promise<any>}, parent: ResolvingMetadata): Promise<Metadata>  {
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
	const page = await getPage()
	// const posts = await getPosts()

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
				<ACFAddress key={i} {...section} />
			)
		}

		if (section.acf_fc_layout === 'catering') {
			return (
				<ACFCatering key={i} {...section} />
			)
		}


		// if (section.acf_fc_layout === 'shop') {
		// 	return (
		// 		<ContextProvider key={i}>
		// 			<ProductGrid {...section} />
		// 		</ContextProvider>
		// 	)
		// }

		if (section.acf_fc_layout === 'counter') {
			return (
				<Counter key={i} {...section} />
			)
		}

		// if (section.acf_fc_layout === 'recipes') {
		// 	return (
		// 		<Recipes key={i} {...section} />
		// 	)
		// }

	})

	return (
			Sections ? Sections : null
	)
}
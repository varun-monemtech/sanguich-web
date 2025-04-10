

import Menu from '../_components/Menu'
import ACFOrder from '@/components/ACF/Sanguich/Order'
import ACFSeenOn from '@/components/ACF/Sanguich/SeenOn'
import ACFHero from '@/components/ACF/Hero'
import ProductGrid from '../_components/ProductGrid'
import ACFOurStory from '@/components/ACF/Sanguich/OurStory'
import ACFHola from '@/components/ACF/Sanguich/Hola'
import ACFAddress from '@/components/ACF/Sanguich/Address'
import ACFAddressNew from '@/components/ACF/Sanguich/AddressNew'
import ACFCatering from '../_components/Catering'
import ACFNews from '@/components/ACF/Sanguich/News'

import Counter from '../_components/Counter'

import ContextProvider from '@/provider/ContextProvider'

import { Metadata } from 'next'

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

    if(section.acf_fc_layout === 'hero') {
      return (
        <div key="hero-main">
          <ACFHero { ...section } />
          {/* Point of reference for past hero observer threashold, so we can calculate if the user is past hero or not */}
          <div id="header-fold-breakpoint"></div>
        </div>
      )
    }
   
    if(section.acf_fc_layout === 'menu') {
      return (
        <Menu key={i} { ...section } />
      )
    }


    if(section.acf_fc_layout === 'seen_on') {
      return (
        <ACFSeenOn key={i} { ...section } />
      )
    }

    if(section.acf_fc_layout === 'our_story') {
      return (
        <ACFOurStory key={i} { ...section } />
      )
    }

    if(section.acf_fc_layout === 'hola') {
      return (
        <ACFHola key={i} { ...section } />
      )
    }

    if(section.acf_fc_layout === 'address') {
      return (
        <ACFAddress key={i} { ...section } />
      )
    }

		// if(section.acf_fc_layout === 'address') {
    //   return (
    //     <ACFAddressNew key={i} { ...section } />
    //   )
    // }

    if(section.acf_fc_layout === 'catering') {
      return (
        <ACFCatering key={i} { ...section } />
      )
    }

    if(section.acf_fc_layout === 'news') {
      return (
        <ACFNews key={i} { ...section } posts={posts} />
      )
    }

    if(section.acf_fc_layout === 'shop') {
      return (
				<ContextProvider key={i}>
       		<ProductGrid { ...section } />
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
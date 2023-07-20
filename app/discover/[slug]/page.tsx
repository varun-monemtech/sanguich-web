import LoadTransition from "../../../animations/LoadTransition"
// import { LoadImage } from "../../../components/LoadImage"
import './style.scss'

import PostTemplate from '../../../components/ACF/PostTemplate'

// This function fetches API to get static parameters (slugs) that normally would be deducted from URL,
// this way we can generate static pages and avoid the loading component flash. It's pretty gatsby-like.
// Should return an array of objects where each object represents the populated dynamic segments of a single route.
// - Each property in the object is a dynamic segment to be filled in for the route.
// - The properties name is the segment's name, and the properties value is what that segment should be filled in with.
// /product/[id]	{ id: string }[]
// /products/[category]/[product]	{ category: string, product: string }[]
// /products/[...slug]	{ slug: string[] }[]
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params

export async function generateStaticParams() {
	const res = await fetch('https://cms.sanguich.com/wp-json/wp/v2/posts',
		{
			// cache: 'no-store',
			next: {
				revalidate: 600
			}
		}
	).then((res) => res.json())
	return res.map((post: any) => ({
		slug: post.slug
	}))
}

// Getting content here
async function getPost(slug: string) {
	const res = await fetch(`https://cms.sanguich.com/wp-json/wp/v2/posts?slug=${slug}`,
		{
			// cache: 'no-store',
			next: {
				revalidate: 600
			}
		}
	)
	const data = await res.json()
	return data[0] // API returns array of one, so return first
}

// Get Metadata
export async function generateMetadata( { params }: { params: { slug: string }}) {
	const post = await getPost(params.slug)
	return {
		title: `${post?.yoast_head_json?.title}`,
		description: post?.excerpt?.rendered?.replace(/(<([^>]+)>)/gi, ""),
		// url: 'theurl',
		siteName: process.env.SITENAME,
		// openGraph: {
		// 	title: `${process.env.SITENAME}`,
		// 	description: process.env.SITEDESCRIPTION,
		// 	url: process.env.SITEURL,
		// 	images: '/opengraph-image.jpg',
		// 	locale: 'en_US',
		// 	type: 'website',
		// },
		locale: 'en-US',
		type: 'website'
	}
}

export default async function MainPage({ params }: any) {
  const post = await getPost(params.slug)

  return (
     <LoadTransition>
      				<pre>
						<code>{JSON.stringify(post, null, 2)}</code>
					</pre>
      <PostTemplate post={post} />
    </LoadTransition>
  )
}



{/* <div className="post-intro padd-half">
  <LoadImage src={post?.x_featured_media_original} width="2560" height="900" quality="85" alt=''/>
  <div className="post-title-wrap c5 padd-half">
    <h2 className="post-title">{post?.title?.rendered}</h2>
  </div>
</div>

{post?.content?.rendered ?
  <div
    className=""
    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
  />
: null }

<button id="showDialog" onClick={() => document.getElementById("favDialog").showModal()}>Show the dialog</button>

<button onClick={document.getElementById('test').showModal()}>click for modal</button>

<pre>
  <code>{JSON.stringify(post, null, 2)}</code>
</pre>

<div 
  className={classNames('shadow-small', {
    'hover:shadow-medium transition-shadow duration-200': slug,
  })}
/> */}

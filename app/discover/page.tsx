import Link from "next/link"
import PageTransition from '../../animations/PageTransition'
import { Container } from "../../components/Container"
import Image from "next/image"
import './style.scss'

// Getting content here
async function getPosts() {
	const res = await fetch(`https://evgreen.unixstorm.org/FRS-3/wp-json/wp/v2/posts`,
		{
			// cache: 'no-store',
			next: {
				revalidate: 10
			}
		}
	)
	const data = await res.json()
	return data // API returns array of one, so return first
}

// Get Metadata
export async function generateMetadata() {
	return {
		title: 'Blog',
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
	const data = await getPosts()

	const posts = data?.map((post: any,i: number) => {

	const image = post?.x_featured_media_original ?
		<Link href={`/post/${post?.slug}`} className="post-image">
			<Image src={post?.x_featured_media_original} width="2560" height="900" quality="85" alt=''/>
		</Link>
	: null

	const title = post?.title?.rendered ?
		<div className="post-title-wrap padd-half padd-bottom-off">
			<Link href={`/post/${post.slug}`} className="post-title">
				<h2 className="post-title h3">{post.title.rendered}</h2>
			</Link>
		</div>
	: null

	const excerpt = post?.excerpt?.rendered ?
		<div
			className="post-excerpt-wrap padd-half padd-top-quart"
			dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
		/>
	: null

	const date = post?.x_date ?
		<span className="date">
			<span className="small">on</span>{post.x_date}
		</span>
	: null

	const gravatar = post?.x_gravatar ?
		<span className="avatar">
			<Image src={post.x_gravatar} width={96} height={96} alt="Post author profile picture"/>
		</span>
	: null

	const author = post?.x_author ?
		<span className="author">
			<span className="small">by</span>{gravatar}{post.x_author}
		</span>
	: null


		return post?.slug ? (
			<article className="post c5">
				{image}
				{title}
				{excerpt}
				<div className="by-date padd-half padd-top-off">
					{author}{date}
				</div>
			</article>
		) : false
	})
	
	return (
		<PageTransition>
			<div className="c0 padd-2 blog">
				<Container>

					<h1 className="h3">[the blog]: a little bit of everything</h1>
					{/* <div
						dangerouslySetInnerHTML={{ __html: data?.content?.rendered }}
					/> */}

					{/* <ACF {...data} /> */}

					<div className="posts-wrap">
						{posts}
					</div>


					{/* <button id="showDialog" onClick={() => document.getElementById("favDialog").showModal()}>Show the dialog</button> */}

					{/* <button onClick={document.getElementById('test').showModal()}>click for modal</button> */}

					{/* <pre>
						<code>{JSON.stringify(data, null, 2)}</code>
					</pre> */}

					{/* <div 
						className={classNames('shadow-small', {
							'hover:shadow-medium transition-shadow duration-200': slug,
						})}
					/> */}
					
				</Container>
			</div>
		</PageTransition>
	)
}
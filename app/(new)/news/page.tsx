import Link from "next/link"
import { LoadImage } from "@/components/new/LoadImage"

function unEscape(htmlStr: String) {
	htmlStr = htmlStr?.replace(/&lt;/g, "<");
	htmlStr = htmlStr?.replace(/&gt;/g, ">");
	htmlStr = htmlStr?.replace(/&quot;/g, "\"");
	htmlStr = htmlStr?.replace(/&#39;/g, "\'");
	htmlStr = htmlStr?.replace(/&amp;/g, "&");
	htmlStr = htmlStr?.replace(/&#038;/g, "&");

	return htmlStr;
}

async function getPosts() {
	const res = await fetch(`https://cms.sanguich.com/wp-json/wp/v2/posts`,
		{
			next: {
				revalidate: 3600
			}
		}
	)
	const data = await res.json()
	return data
}

// Get Metadata
export async function generateMetadata() {
	return {
		title: 'Blog',
		description: process.env.NEXT_PUBLIC_SITEDESCRIPTION,
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

	const posts = data?.map((post: any, i: number) => {

		const image = post?.x_featured_media_original ?
			<Link href={`/news/${post?.slug}`} className="basis-full md:basis-1/2">
				<LoadImage
					src={post?.x_featured_media_original}
					width="2560"
					height="900"
					className="aspect-[21/9] [&_img]:!relative rounded-[1rem]"
					alt={post?.title?.rendered} />
			</Link>
			: null

		const title = post?.title?.rendered ?
			<div className="">
				<Link href={`/news/${post.slug}`} className="">
					<h2 className="text-md pt-4 pb-2 font3 uppercase text-[#274F37]">{unEscape(post.title.rendered)}</h2>
				</Link>
			</div>
			: null

		const excerpt = post?.excerpt?.rendered ?
			<div
				dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
			/>
			: null


		return post?.slug ? (
			<article key={i} className={`${i === 0 ? 'col-span-3 flex max-md:flex-wrap gap-x-10' : 'col-span-3 md:col-span-1'}`}>
				{image}
				<div className="md:basis-1/2 flex flex-wrap content-center">
					{title}
					{excerpt}
					<Link href={`/news/${post.slug}`} className="md:basis-1/2 pt-3 uppercase font3 text-[#274F37]">Read More</Link>

				</div>
			</article>
		) : false
	})

	return (
		<div className="p-10 bg-[#D0C8B9]">
			<h1 className="text-center">NEWS</h1>
			<div className="posts-wrap grid grid-cols-3 gap-10 text-[#274F37]">
				{posts}
			</div>
		</div>
	)
}
import { LoadImage } from '@/components/new/LoadImage'
import Pagination from './Pagination'
import Link from 'next/link'
import Intro from '@/animations/Intro_Framer';

function unEscape(htmlStr: String) {
	htmlStr = htmlStr?.replace(/&lt;/g, "<");
	htmlStr = htmlStr?.replace(/&gt;/g, ">");
	htmlStr = htmlStr?.replace(/&quot;/g, "\"");
	htmlStr = htmlStr?.replace(/&#39;/g, "\'");
	htmlStr = htmlStr?.replace(/&amp;/g, "&");
	htmlStr = htmlStr?.replace(/&#038;/g, "&");

	return htmlStr;
}

export default function PostsTemplate({ posts, hasNextPage, hasPrevPage, prevLink, nextLink }: { posts: any[], hasNextPage: boolean, hasPrevPage: boolean, prevLink: string, nextLink: string }) {

	const postsMap = posts?.map((post: any, i: number) => {

		const image = post.yoast_head_json.og_image?.[0].url ?
			<Link href={`/discover/${post?.slug}`} className="basis-full md:basis-1/2">
				<LoadImage
					src={post.yoast_head_json.og_image?.[0].url}
					width="2560"
					height="900"
					className={`${i === 0 ? 'aspect-[2.07/1]' : 'aspect-[1.87/1]'} [&_img]:!relative rounded-[1rem]`}
					alt={post?.title?.rendered} />
			</Link>
			: null

		const title = post?.title?.rendered ?
			<div className="">
				<Link href={`/discover/${post.slug}`} className="">
					<h2 className="text-lg pt-4 pb-3 font3  uppercase text-[#274F37]">{unEscape(post.title.rendered)}</h2>
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
				<Intro delay={i * 50} className={`	
					overflow-visible
					
					[&.not-in-view_.content]:opacity-0
					[&.not-in-view_.content]:translate-y-[4rem]
					[&.in-view_.content]:opacity-100
					[&.in-view_.content]:translate-y-[0%]
					[&.in-view_.content]:ease-in-out
					[&.in-view_.content]:duration-500
			
				`}>
					<div className={`${i === 0 ? 'col-span-3 flex max-md:flex-wrap gap-x-10' : 'col-span-3 md:col-span-1'}`}>
						{image}
						<div className="md:basis-1/2 flex flex-wrap content-center">
							{title}
							{excerpt}
							<Link href={`/discover/${post.slug}`} className="md:basis-1/2 pt-3 uppercase font3 text-[#274F37]">Read More</Link>

						</div>
					</div>

				</Intro>
			</article>

		) : false
	})


	return (
		<>

			<div className="posts-wrap grid grid-cols-3 gap-10 text-[#274F37]">
				{postsMap}
			</div>

			<Pagination
				hasNextPage={hasNextPage}
				hasPrevPage={hasPrevPage}
				prevLink={prevLink}
				nextLink={nextLink}
			/>
		</>
	)
}

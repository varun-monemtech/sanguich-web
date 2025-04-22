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
	const POSTS_PER_PAGE = 4;

	const allPosts = await getPosts();

	const paginatedPosts = allPosts.slice(0, POSTS_PER_PAGE);
	const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

	const hasNextPage = totalPages > 1;

	const posts = paginatedPosts?.map((post: any, i: number) => {

		const image = post.yoast_head_json.og_image?.[0].url ?
			<Link href={`/news/${post?.slug}`} className="basis-full md:basis-1/2">
				<LoadImage
					src={post.yoast_head_json.og_image?.[0].url}
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
		<div className="px-10 bg-[#D0C8B9]  pt-13">

			<div className='flex justify-center py-2 items-center text-[3em] relative is-inview inview border-type-7 '>
				<h2 className="text-[#274F37] px-[0.1em] py-0 !m-0 z-[1001] bg-[#D0C8B9] font2">News</h2>
				<div className="decor-wrap !p-0 z-[-1] justify-center">
					<div className="decor-top with-extra">
						<div className="decor-top-left"></div>
						<div className="decor-top-center with-extra">
							<div className="decor-top-center-extra-left"></div>
							<div id="space-logo" className="decor-top-center-extra-center"></div>
							<div className="decor-top-center-extra-right"></div>
						</div>
						<div className="decor-top-right"></div>
					</div>
				</div>
			</div>

			<div className="posts-wrap grid grid-cols-3 gap-10 text-[#274F37]">
				{posts}
			</div>

			{/* Pagination */}
			<div className="pagination-controls flex justify-center gap-3 mt-12">
				<Link
					href={'news'}
					className={`opacity-50 pointer-events-none group flex flex-row-reverse justify-center items-center gap-1 next-page uppercase font1`}
				>
					<div className="relative ">
						<div
							className={`arrow-prev-image cursor-pointer !right-0 group-hover:scale-110 ease-in-out transition-all duration-150 group-active:scale-95`}
							role="button"
							tabIndex={0}
							aria-label='Previous Tab'
						/>
					</div>
					<span className="block text-[#274F37] group-hover:opacity-80 transition-all duration-150">
						Prev
					</span>
				</Link>
				<Link
					href="/news/page/2"
					className={`${hasNextPage ? '' : 'opacity-50 pointer-events-none'} group flex justify-center items-center gap-1 next-page uppercase font1`}
				>
					<div className="relative">
						<div
							className={`arrow-next-image cursor-pointer !left-0 group-hover:scale-110 ease-in-out transition-all duration-150 group-active:scale-95`}
							role="button"
							tabIndex={0}
							aria-label='Next Tab'
						/>
					</div>
					<span className="block text-[#274F37] group-hover:opacity-80 transition-all duration-150">
						Next
					</span>
				</Link>
			</div>
		</div>
	)
}
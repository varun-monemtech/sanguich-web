import Link from "next/link"
import { LoadImage } from "@/components/new/LoadImage"
import { notFound } from "next/navigation"

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
export async function generateMetadata({ params }: { params: { page: string } }) {
	return {
		title: `Blog - Page ${params.page}`,
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

// Generuję statycznie 10 stron
export function generateStaticParams() {
	return [
		{ page: '2' },
		{ page: '3' },
		{ page: '4' },
		{ page: '5' },
		{ page: '6' },
		{ page: '7' },
		{ page: '8' },
		{ page: '9' },
		{ page: '10' },
		{ page: '11' },
	]
}

export default async function PaginatedPage({ params }: { params: { page: string } }) {
	// Używam stałej wartości - 2 posty na stronę
	const POSTS_PER_PAGE = 4;

	const page = Number(params.page);

	// Walidacja strony
	if (isNaN(page) || page < 1) {
		notFound();
	}

	const allPosts = await getPosts();

	// Calculate pagination
	const startIndex = (page - 1) * POSTS_PER_PAGE;
	const endIndex = startIndex + POSTS_PER_PAGE;
	const paginatedPosts = allPosts.slice(startIndex, endIndex);
	const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

	// Sprawdzam czy strona istnieje
	if (page > totalPages) {
		notFound();
	}

	const hasNextPage = page < totalPages;
	const hasPrevPage = page > 1;

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
		<div className="p-10 bg-[#D0C8B9]">
			<h1 className="text-center">NEWS</h1>
			<div className="posts-wrap grid grid-cols-3 gap-10 text-[#274F37]">
				{posts}
			</div>

			{/* Pagination */}
			<div className="pagination-controls flex justify-center gap-3 mt-12">
				<Link
					href={page === 2 ? '/news' : `/news/page/${page - 1}`}
					className={`${hasPrevPage ? '' : 'opacity-50 pointer-events-none'} group flex flex-row-reverse justify-center items-center gap-1 next-page uppercase font1`}

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
					href={`/news/page/${page + 1}`}

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
import { notFound } from "next/navigation"
import PostsTemplate from "../../_components/PostsTemplate"
import { ToTopOnLoad } from "@/app/(new)/_components/ToTopOnLoad"
import { Metadata, ResolvingMetadata } from "next"


async function getPosts() {
	const res = await fetch(`https://wordpress-797258-5874632.cloudwaysapps.com/wp-json/wp/v2/posts`,
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

// export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
// 	const params = await props.params;
// 	return {
// 		title: `Blog - Page ${params.page}`,
// 		description: process.env.NEXT_PUBLIC_SITEDESCRIPTION,
// 		siteName: process.env.NEXT_PUBLIC_SITENAME,
// 		images: [
// 			{
// 				url: 'urltoimg',
// 				width: 800,
// 				height: 600
// 			}
// 		],
// 		locale: 'en-US',
// 	}
// }

async function getPage() {
	const res = await fetch('https://wordpress-797258-5874632.cloudwaysapps.com/wp-json/wp/v2/pages?slug=discover',
		{
			// cache: 'no-store',
			next: {
				revalidate: 3600
			}
		}
	)
	return res.json().then((data) => data[0])
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }>}, parent: ResolvingMetadata): Promise<Metadata>  {
  const resolvedParams = await params;
  const { yoast_head_json } = await getPage()
  const previousOpenGraphData = (await parent).openGraph || {}

  return {
    ...(yoast_head_json?.title && { title: yoast_head_json?.title + ' - Page ' + resolvedParams.page }),
    ...(yoast_head_json?.description && { description: yoast_head_json?.description }),
    openGraph: {
      ...previousOpenGraphData,
      ...(yoast_head_json?.title && { title: yoast_head_json?.title + ' - Page ' + resolvedParams.page }),
      ...(yoast_head_json?.description && { description: yoast_head_json?.description }),
    }
  }
}

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

export default async function PaginatedPage(props: { params: Promise<{ page: string }> }) {
	const params = await props.params;
	const POSTS_PER_PAGE = 4;

	const page = Number(params.page);

	if (isNaN(page) || page < 1) {
		notFound();
	}

	const allPosts = await getPosts();

	// Calculate pagination
	const startIndex = (page - 1) * POSTS_PER_PAGE;
	const endIndex = startIndex + POSTS_PER_PAGE;
	const paginatedPosts = allPosts.slice(startIndex, endIndex);
	const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

	if (page > totalPages) {
		notFound();
	}

	const hasNextPage = page < totalPages;
	const hasPrevPage = page > 1;


	return (
		<>
			<ToTopOnLoad />
			<PostsTemplate
				posts={paginatedPosts}
				hasNextPage={hasNextPage}
				hasPrevPage={hasPrevPage}
				prevLink={`/discover/page/${page - 1}`}
				nextLink={`/discover/page/${page + 1}`}
			/>
		</>
	)
} 
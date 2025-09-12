import { notFound } from "next/navigation"
import PostsTemplate from "../../_components/PostsTemplate"
import { ToTopOnLoad } from "@/app/(new)/_components/ToTopOnLoad"


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

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
	const params = await props.params;
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
				prevLink={`/news/page/${page - 1}`}
				nextLink={`/news/page/${page + 1}`}
			/>
		</>
	)
} 
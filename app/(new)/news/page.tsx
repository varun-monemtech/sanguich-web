
import { ToTopOnLoad } from "../_components/ToTopOnLoad"
import PostsTemplate from "./_components/PostsTemplate"

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


	return (
		<>
			<ToTopOnLoad />
			<PostsTemplate
				posts={paginatedPosts}
				hasNextPage={hasNextPage}
				hasPrevPage={false}
				nextLink={`/news/page/2`}
				prevLink={`/news`}
			/>
		</>
	)
}

import { ToTopOnLoad } from "../_components/ToTopOnLoad"
import PostsTemplate from "./_components/PostsTemplate"
import { Metadata, ResolvingMetadata } from 'next'

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

async function getPage() {
	const res = await fetch('https://cms.sanguich.com/wp-json/wp/v2/pages?slug=discover',
		{
			// cache: 'no-store',
			next: {
				revalidate: 3600
			}
		}
	)
	return res.json().then((data) => data[0])
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }>}, parent: ResolvingMetadata): Promise<Metadata>  {
  const resolvedParams = await params;
  const { yoast_head_json } = await getPage()
  const previousOpenGraphData = (await parent).openGraph || {}

  return {
    ...(yoast_head_json?.title && { title: yoast_head_json?.title }),
    ...(yoast_head_json?.description && { description: yoast_head_json?.description }),
    openGraph: {
      ...previousOpenGraphData,
      ...(yoast_head_json?.title && { title: yoast_head_json?.title }),
      ...(yoast_head_json?.description && { description: yoast_head_json?.description }),
    }
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
				nextLink={`/discover/page/2`}
				prevLink={`/discover`}
			/>
		</>
	)
}
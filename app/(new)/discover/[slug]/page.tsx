import { Metadata, ResolvingMetadata } from 'next';
import { ToTopOnLoad } from '../../_components/ToTopOnLoad';
import PostTemplate from '../_components/PostTemplate'


export async function generateStaticParams() {
	const res = await fetch('https://wordpress-797258-5874632.cloudwaysapps.com/wp-json/wp/v2/posts',
		{
			// cache: 'no-store',
			next: {
				revalidate: 3600
			}
		}
	).then((res) => res.json())
	return res.map((post: any) => ({
		slug: post.slug
	}))
}

// Getting all posts
async function getAllPosts() {
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

// Getting content here
async function getPost(slug: string) {
	const res = await fetch(`https://wordpress-797258-5874632.cloudwaysapps.com/wp-json/wp/v2/posts?slug=${slug}`,
		{
			// cache: 'no-store',
			next: {
				revalidate: 3600
			}
		}
	)
	const data = await res.json()
	return data[0] // API returns array of one, so return first
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }>}, parent: ResolvingMetadata): Promise<Metadata>  {
  const resolvedParams = await params;
	const {yoast_head_json} = await getPost(resolvedParams.slug)
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

export default async function MainPage(props: any) {
	const params = await props.params;
	const post = await getPost(params.slug)
	const allPosts = await getAllPosts()

	// Find current post index
	const currentIndex = allPosts.findIndex((p: any) => p.slug === post.slug)

	// Get prev and next posts
	const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
	const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

	return (
		<>
			<ToTopOnLoad />
			<PostTemplate post={post}
				hasNextPage={!!nextPost}
				hasPrevPage={!!prevPost}
				prevLink={`/discover/${prevPost?.slug}`}
				nextLink={`/discover/${nextPost?.slug}`}
			/>
		</>
	)
}
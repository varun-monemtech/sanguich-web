import PostTemplate from '../_components/PostTemplate'

function unEscape(htmlStr: String) {
	htmlStr = htmlStr?.replace(/&lt;/g, "<");
	htmlStr = htmlStr?.replace(/&gt;/g, ">");
	htmlStr = htmlStr?.replace(/&quot;/g, "\"");
	htmlStr = htmlStr?.replace(/&#39;/g, "\'");
	htmlStr = htmlStr?.replace(/&amp;/g, "&");
	htmlStr = htmlStr?.replace(/&#038;/g, "&");

	return htmlStr;
}

export async function generateStaticParams() {
	const res = await fetch('https://cms.sanguich.com/wp-json/wp/v2/posts',
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

// Getting content here
async function getPost(slug: string) {
	const res = await fetch(`https://cms.sanguich.com/wp-json/wp/v2/posts?slug=${slug}`,
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

// Get Metadata
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
	const params = await props.params;
	const post = await getPost(params.slug)

	return {
		title: `${unEscape(post?.title?.rendered)}`,
		description: post?.yoast_head_json?.description,
		url: `${process.env.NEXT_PUBLIC_SITEURL}/discover/${params?.slug}`,
		siteName: process.env.NEXT_PUBLIC_SITENAME,
		openGraph: {
			title: post?.yoast_head_json?.title,
			description: post?.yoast_head_json?.description,
			url: `${process.env.NEXT_PUBLIC_SITEURL}/discover/${params?.slug}`,
			locale: 'en_US',
			type: 'website',
		},
		locale: 'en-US',
		type: 'website'
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
			<PostTemplate post={post}
				hasNextPage={!!nextPost}
				hasPrevPage={!!prevPost}
				prevLink={`/news/${prevPost?.slug}`}
				nextLink={`/news/${nextPost?.slug}`}
			/>
	)
}
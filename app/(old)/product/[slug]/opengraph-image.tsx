import { ImageResponse } from 'next/og'
 
// Route segment config
// export const runtime = 'edge'
 
// Image metadata
export const alt = 'Featured image'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/jpg'

// const image = fetch(new URL('../../../public/img/og.jpg', import.meta.url)).then((res) =>
//   res.arrayBuffer(),
// )
 
// Font
// const interSemiBold = fetch(
//   new URL('../../../EVG/css/fonts/Montserrat-ExtraBold.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer())

// const font = fetch(new URL('../../../EVG/css/fonts/Montserrat-ExtraBold.ttf', import.meta.url)).then(
//   (res) => res.arrayBuffer(),
// )

const getTheFont = async () => {
  const response = await fetch(
    new URL('@/EVG/css/fonts/intensa/Intensa-College.ttf', import.meta.url)
   )
   const font = await response.arrayBuffer()
   return font
 }

async function getPost(slug: string) {
  console.log("Generating image for slug:", slug);
	const res = await fetch(`https://evgreen.unixstorm.org/FRS-3/wp-json/wp/v2/posts?slug=${slug}`,
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
 
// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
 
	const post = await getPost(params.slug)
  // const imageData = await image;
  // const fontData = await font
  
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          position: 'relative',
          fontSize: 36,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          whiteSpace: 'pre-wrap',
        }}
      >
        <div
          style={{
            position: 'absolute',
            zIndex: '0',
            display: 'flex',
          }}
        >
          <img
            width="1200"
            height="630"
            src={post?.x_featured_media_medium}
            style={{
              objectFit: 'cover',
              // borderRadius: 128,
            }}
          />
        </div>
        <div
          style={{
            position: 'relative',
            zIndex: '200',
            display: 'flex',
            color: 'white',
            padding: '1em',
            background: 'rgba(0,0,0,0.4)',
          }}
        >
          {post?.title?.rendered}
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await getTheFont(),
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
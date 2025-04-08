import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
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
   const res = await response.arrayBuffer()
   return res
 }

const getTheOgBG = async () => {
  const response = await fetch(
     new URL('../../public/og-sang.jpeg', import.meta.url)
   )
   const res = await response.arrayBuffer()
   return res
}
 
// Image generation
export default async function Image() {
 
  const imageData: any = await getTheOgBG()
  
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          position: 'relative',
          fontSize: 72,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
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
            src={imageData}
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
            background: 'transparent',
          }}
        >
          TASTE LA TRADICIÓN
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
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
    {
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
'use client'
import Image from 'next/image'
import { useState } from 'react'

const ProductImages = ({ images }) => {
  const [ currentImage, setCurrentImage] = useState(0)
  
  
  return (
    <>
     <div className="main-image span-12">
        <Image
          src={images[currentImage]?.src}
          key={images[currentImage]?.id}
          alt={images[currentImage]?.altText ? images[currentImage]?.altText : 'Product'}
          width={1200}
          height={1600}
        />
      </div>
      <div className="gallery span-12 grid-12">
        {images.map( (image, i) => (
          <div key={i} onClick={() => setCurrentImage(i)} className="gallery-item span-3">
            <Image
              src={image.src}
              key={image.id}
              alt={image.altText ? image.altText : 'Product'}
              width={600}
              height={400}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductImages
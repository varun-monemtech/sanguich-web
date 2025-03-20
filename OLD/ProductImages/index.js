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
          width={images[currentImage]?.width}
          height={images[currentImage]?.height}
        />
      </div>
      <div className="gallery span-12 grid-12">
        {images.map( (image, i) => (
          <div key={i} onClick={() => setCurrentImage(i)} className="gallery-item span-3">
            <Image
              src={image.src}
              key={image.id}
              alt={image.altText ? image.altText : 'Product'}
              width={image.width}
              height={image.height}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default ProductImages
'use client'
import Link from "next/link"
import { useContext } from "react"
import './style.scss'
import Image from "next/image"
// import ProductGrid from "../../OLD/ProductGrid"
import { useState } from "react"
import NaviContext from "../../context/NaviContext"
// This function fetches API to get static parameters (slugs) that normally would be deducted from URL,
// this way we can generate static pages and avoid the loading component flash. It's pretty gatsby-like.
// Should return an array of objects where each object represents the populated dynamic segments of a single route.
// - Each property in the object is a dynamic segment to be filled in for the route.
// - The properties name is the segment's name, and the properties value is what that segment should be filled in with.
// /product/[id]	{ id: string }[]
// /products/[category]/[product]	{ category: string, product: string }[]
// /products/[...slug]	{ slug: string[] }[]
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params



export default function OtherProducts({ allProduct }) {
	const naviContext = useContext(NaviContext)

  const [ currentSlide, setCurrentSlide] = useState(0)
  let slidesLength = naviContext.windowSize?.mobile ? allProduct?.length - 1 : allProduct?.length - 3

	return (
		<>
      {/* <ProductGrid /> */}
      <div className="slider" style={{overflow: 'hidden'}}>
        <div onClick={() => currentSlide > 0 ? setCurrentSlide(currentSlide - 1) : null} className={currentSlide > 0 ? "arrow arrow-left" : "arrow arrow-left disabled"}></div>
        
        {allProduct.map( (node, i) => (
          <div key={i} className={`slide slide-${currentSlide}`}>
            {/* <pre>
              <code>{JSON.stringify(node, null, 2)}</code>
            </pre> */}
            <Link href={`/product/${node.handle}`}>
              <div className="img-container">
                <Image
                  src={node.images[0].src}
                  width={node.images[0].width}
                  height={node.images[0].height}
                  key={node.images[0].id}
                  alt={node.altText ? node.altText : 'Product Image'}
                />
              </div>
              <p className="title font1">{node.title}</p>
            </Link>
          </div>
        ))}

        <div onClick={() => currentSlide < slidesLength ? setCurrentSlide(currentSlide + 1) : null } className={currentSlide < slidesLength ? "arrow arrow-right" : "arrow arrow-right disabled"}></div>
      </div>
		</>
	)
}
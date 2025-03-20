'use client'
import React, { useContext, useEffect, useState } from 'react'
// import { useStaticQuery, graphql, Link } from 'gatsby'

import StoreContext from '../../context/StoreContext'

import "./style.scss"

import Gallery from '../../components/Gallery'
import Image from 'next/image'
import Link from 'next/link'

const ProductGrid = () => {
  const { store } = useContext(StoreContext)
  const shopData = null
  // useStaticQuery(
  //   graphql`
  //     query {
  //       allShopifyCollection {
  //         edges {
  //           node {
  //             title
  //             products {
  //               id
  //               title
  //               handle
  //               descriptionHtml
  //               createdAt
  //               images {
  //                 id
  //                 originalSrc
  //                 localFile {
  //                   ...imgStandard
  //                 }
  //               }
  //               variants {
  //                 price
  //               }
  //             }
  //           }
  //         }
  //       }
  //       allShopifyProduct(
  //         sort: {
  //           fields: [createdAt]
  //           order: ASC
  //         }
  //       ) {
  //         edges {
  //           node {
  //             id
  //             title
  //             handle
  //             createdAt
  //             images {
  //               id
  //               originalSrc
  //               localFile {
  //                 ...imgStandard
  //               }
  //             }
  //             variants {
  //               price
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `
  // )

  const [collectionData, setCollectionData] = useState(null)
  const [productsData, setProductsData] = useState(null)

  useEffect(() => {
    store.client.product.fetchAll().then((products) => {
      // Do something with the products
      setProductsData(products)
    })
    store.client.collection.fetchAllWithProducts().then((collections) => {
      // Do something with the products
      setCollectionData(collections)
    })
  },[])


  const getPrice = price => Intl.NumberFormat(undefined, {
    currency: store.checkout.currencyCode ? store.checkout.currencyCode : 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? price : 0))

  const shopFeaturedProduct = collectionData?.[0]?.products?.map((node) => {
    const firstProduct = node
    return (
      <div key={`choke-on-this-fucking-key-${node.id}`} className="gallery border-type-6 is-inview inview aspect-ratio span-12 gallery-center">

        <div className="decor-wrap">
          <div className="decor-top">
            <div className="decor-top-left"></div>
            <div className="decor-top-center"></div>
            <div className="decor-top-right"></div>
          </div>
          <div className="decor-center">
            <div className="decor-center-left"></div>
            <div className="decor-center-right"></div>
          </div>
          <div className="decor-bottom">
            <div className="decor-bottom-left"></div>
            <div className="decor-bottom-center"></div>
            <div className="decor-bottom-right"></div>
          </div>
        </div>

        <Link href={`/product/${firstProduct?.handle}/`} key={firstProduct?.id} className="gallery-inner">
          <Gallery {...firstProduct} />
          {/* <Image
            src={firstProduct?.images?.[0]?.src}
            alt={'handle'}
            width={2560}
            height={1200}
            className="img-cover"
          /> */}
{/* 
          {firstProduct?.variants?.[0].price ? 
            <div className="gallery-overlay-price hidden">
              <div className="inner c5">
                <h6 className="price">{getPrice(firstProduct?.variants?.[0].price)}</h6>
              </div>
            </div>
          : null} */}

          <span className="featured h6">Featured</span>
{/* 
          <div className="gallery-overlay hidden">
            <div className="inner c5">
              {firstProduct?.title ? <h4>{firstProduct?.title}</h4> : null}
              <div className="description" dangerouslySetInnerHTML={{ __html: firstProduct?.descriptionHtml }} />
              <div className="shop-now">
                // <Link to={`/product/${firstProduct.handle}/`} className="btn uppercase font1"><span>Shop Now</span></Link>
              </div>
            </div>
          </div> */}

          <div className="shop-now-basic">
            <div className="uppercase font1" target="_blank" rel="noreferrer noopener"><span>Order Online</span></div>
          </div>
        </Link>
      </div>
    )
  })
  
  return (
    <>
      {shopFeaturedProduct}
      <div className="grid-12 span-12 product-grid">
        {productsData
          ? productsData.map(({ id, handle, title, images: [firstImage], variants: [firstVariant] }) => (
          <article key={id} className="span-3 span-6-tablet span-6-mobile product-single">
            <Link href={`/product/${handle}/`} className="aspect-ratio">
              {firstImage &&
                  (<Image
                    src={firstImage.src}
                    alt={firstImage.altText ? firstImage.altText : 'Shop Item'}
                    width={firstImage.width}
                    height={firstImage.height}
                    className="img-cover"
                  />)}
              {/* <h6 className="price hidden">{title} {getPrice(firstVariant.price)}</h6> */}
              <div className="shop-now hidden">
                <div className="uppercase font1" target="_blank" rel="noreferrer noopener"><span>Shop Now</span></div>
              </div>
              <div className="shop-now-basic">
                <div className="uppercase font1" target="_blank" rel="noreferrer noopener"><span>Order Online</span></div>
              </div>
            </Link>
          </article>
          ))
          : 
          <div className="span-12 shop-intro padd-2">
            <h2 className="text-center">No products found :(</h2>      
          </div>
          }
      </div>
      {/* <pre>
        <code>{JSON.stringify( productsData, null, 2)}</code>
      </pre> */}
    </>
  )
}

export default ProductGrid

import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import StoreContext from '../../../context/StoreContext'

import "./style.scss"

import Img from "gatsby-image"
import Gallery from '../../Gallery'

const ProductGrid = () => {
  const { store: {checkout} } = useContext(StoreContext)
  const shopData = useStaticQuery(
    graphql`
      query {
        allShopifyCollection {
          edges {
            node {
              title
              products {
                id
                title
                handle
                descriptionHtml
                createdAt
                images {
                  id
                  originalSrc
                  localFile {
                    ...imgStandard
                  }
                }
                variants {
                  price
                }
              }
            }
          }
        }
        allShopifyProduct(
          sort: {
            fields: [createdAt]
            order: ASC
          }
        ) {
          edges {
            node {
              id
              title
              handle
              createdAt
              images {
                id
                originalSrc
                localFile {
                  ...imgStandard
                }
              }
              variants {
                price
              }
            }
          }
        }
      }
    `
  )


  const getPrice = price => Intl.NumberFormat(undefined, {
    currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? price : 0))
  
  return (
    <>
      <div className="grid-12 span-12 product-grid">
        {shopData.allShopifyProduct?.edges
          ? shopData.allShopifyProduct.edges.map(({ node: { id, handle, title, images: [firstImage], variants: [firstVariant] } }) => (
          <article key={id} className="span-3 span-6-tablet span-12-mobile product-single">
            <Link to={`/product/${handle}/`} className="aspect-ratio">
              {firstImage && firstImage.localFile &&
                  (<Img
                    fluid={firstImage.localFile?.childImageSharp.fluid}
                    alt={handle}
                    className="img-cover"
                  />)}
              <h6 className="price hidden">{title} {getPrice(firstVariant.price)}</h6>
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
    </>
  )
}

export default ProductGrid

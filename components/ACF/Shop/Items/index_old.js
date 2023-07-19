import React, { useState, useEffect } from 'react'
import './style.scss'

import { useQuery, gql } from '@apollo/client'

import Gallery from '../../../../Gallery'

const POSTS_QUERY = gql`
{
  products(first: 20) {
    nodes {
      id
      slug
      link
      name
      description
      onSale
			featured
      image {
        srcSet
      }
			galleryImages {
				nodes {
					srcSet
				}
			}
      ... on SimpleProduct {
        price
				onSale
				salePrice
				regularPrice
      }
      ... on GroupProduct {
        price
				onSale
      }
      ... on ExternalProduct {
        price
				onSale
      }
      ... on VariableProduct {
        price
				onSale
      }
    }
  }
}
`

function Posts(props) {
	
	const anchor = props.anchor
	const classes = props.classes

	const [itemData, setitemData] = useState(false)
	const [products, setProducts] = useState(false)

	const { loading, error, data, refetch } = useQuery(POSTS_QUERY)

	//console.log('shop:',loading, error, data)

	useEffect(() => {
			setProducts(() => ( data?.products?.nodes.map((node,i) => {
				const item = {}
				const image = node.image?.srcSet
				const gallery = node.galleryImages?.nodes
		
				// If gallery on product is specified, use it to fuel slider, otherwise just use image
				if (gallery && gallery.length > 0) {
					item.gallery = node.galleryImages
				} else if (image) {
					var obj = {srcSet: image}
					item.gallery = {nodes: []}
					item.gallery.nodes.push(obj)
				}
				
				item.details = {
					name: node.name,
					price: node.price,
					link: node.link,
					description: node.description,
					featured: node.featured,
				}
		
				function handleClick() {
					setitemData(item)
				}

				if (item.details.featured === true) {
					setitemData(item)
				}

				if (i === 0) {
					setitemData(item)
				}
		
				return (
					<article key={node.id} className="span-3 span-6-tablet span-12-mobile product-single">
						<a href={item.details?.link} className="aspect-ratio">
							<img className="img-cover" srcSet={image} alt=""/>
							<h6 className="price">{item.details?.price}</h6>
							<div className="shop-now">
								<div className="uppercase font1" target="_blank" rel="noreferrer noopener"><span>Shop Now</span></div>
							</div>
						</a>
					</article>
				)
			})))
	}, [data])

  return (
		<section id={`section-${anchor}`} className={`content shop-featured c4 grid-12 ${classes}`}>

			{anchor ?
				<div id={anchor} className="anchor"></div>
			: null}

			{loading ?
			<div className="span-12 shop-intro padd-2">
				<h2 className="text-center">Loading shop inventory...</h2>
			</div>
			:
			<>

				<div className="gallery border-type-6 is-inview inview aspect-ratio span-12 gallery-center">

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

					<div className="gallery-inner">
						<Gallery {...itemData.gallery} />

						{itemData.details?.price ? 
							<div className="gallery-overlay-price">
								<div className="inner c5">
									<h6 className="price">{itemData.details?.price}</h6>
								</div>
							</div>
						: null}

						<h6 className="featured">Featured</h6>

						<div className="gallery-overlay">
							<div className="inner c5">
								{itemData.details?.name ? <h4>{itemData.details?.name}</h4> : null}
								<div className="description" dangerouslySetInnerHTML={{ __html: itemData.details?.description }} />
								<div className="shop-now">
									<a href={itemData.details?.link} className="btn uppercase font1" target="_blank" rel="noreferrer noopener"><span>Shop Now</span></a>
								</div>
							</div>
						</div>

					</div>
				</div>
				
				<div className="grid-12 span-12 product-grid">
					{products}
				</div>

			</>
			}

		</section>
	)
};

export default Posts
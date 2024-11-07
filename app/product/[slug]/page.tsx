import Link from "next/link"
import Client from 'shopify-buy'
import ProductFormWrap from '../../../OLD/ProductFormWrap'
import ProductImages from '../../../OLD/ProductImages'
import OtherProducts from '../../../OLD/OtherProducts'

import './style.scss'
import Image from "next/image"

// This function fetches API to get static parameters (slugs) that normally would be deducted from URL,
// this way we can generate static pages and avoid the loading component flash. It's pretty gatsby-like.
// Should return an array of objects where each object represents the populated dynamic segments of a single route.
// - Each property in the object is a dynamic segment to be filled in for the route.
// - The properties name is the segment's name, and the properties value is what that segment should be filled in with.
// /product/[id]	{ id: string }[]
// /products/[category]/[product]	{ category: string, product: string }[]
// /products/[...slug]	{ slug: string[] }[]
// https://nextjs.org/docs/app/api-reference/functions/generate-static-params


const client = Client.buildClient(
	{
		storefrontAccessToken: "7604381f9d72ff2f959b734b6c7b4f41",
		domain: `sanguich-de-miami.myshopify.com`,
		apiVersion: '2023-07'
	}
)

export async function generateStaticParams() {
	const res = await client.product.fetchAll().then((products) => {
		return products
	})
	return res.map((product: any) => ({
		slug: product.handle
	}))
}

// Getting content here
async function getProduct(slug: string) {
	const res = await client.product.fetchByHandle(slug).then((product: any) => {
		// Do something with the product
		return product
	})
	return res
}

// Getting content here
async function getProducts() {
	const res = await client.product.fetchAll().then((products: any) => {
		// Do something with the product
		return products
	})
	return res
}

// // Get Metadata
// export async function generateMetadata( { params }: { params: { slug: string }}) {
// 	const post = await getProduct(params.slug)
// 	return {
// 		title: `${post?.title?.rendered}`,
// 		description: post?.excerpt?.rendered?.replace(/(<([^>]+)>)/gi, ""),
// 		// url: 'theurl',
// 		siteName: process.env.NEXT_PUBLIC_SITENAME,
// 		// openGraph: {
// 		// 	title: `${process.env.NEXT_PUBLIC_SITENAME}`,
// 		// 	description: process.env.NEXT_PUBLIC_SITEDESCRIPTION,
// 		// 	url: process.env.NEXT_PUBLIC_SITEURL,
// 		// 	images: '/opengraph-image.jpg',
// 		// 	locale: 'en_US',
// 		// 	type: 'website',
// 		// },
// 		locale: 'en-US',
// 		type: 'website'
// 	}
// }

export default async function MainPage({ params }: any) {
	const product = await getProduct(params.slug)
	const products = await getProducts()

	// Clear out product object, remove all functions so we can pass it down to children
	var productFunctionLess=JSON.parse(JSON.stringify(product))
	var productsFunctionLess=JSON.parse(JSON.stringify(products))

	return (
		<>

				<div className="span-12 grid-12">
					<div className='content-box span-6 span-12-mobile'
						// style={{top: heightE > height ? height - heightE : 0}}
						>
						<div className='content-holder animated'>
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
							<a href="#other-items" className="to-bottom animated" aria-label="Scroll To Other Items" title="Scroll To Other Items"></a>
							{/* <Link href={`/product/${allProduct?.nodes[prev].handle}`} className="to-prev" />
							<Link href={`/product/${allProduct?.nodes[next].handle}`} className="to-next" /> */}

							<ProductFormWrap handle={params.slug} />
						</div>
					</div>
					<div className="span-6 span-12-mobile grid-12 container border-type-7" >
					<div className="decor-wrap">
								<div className="decor-top">
									<div className="decor-top-left"></div>
									<div className="decor-top-center"></div>
									<div className="decor-top-right"></div>
								</div>
						</div>
						<ProductImages images={...productFunctionLess.images} />
					</div>
				</div>
				<div className="span-12 bar relative shop-featured">
					<div id="other-items" className="anchor"></div>
						<div className="header">
							<h2 className="fancyfont font2"><span className="capitalize">O</span>ther <span className="capitalize">I</span>tems</h2>
						</div>
						<OtherProducts allProduct={productsFunctionLess} />
						{/* <ProductGrid /> */}
						{/* <div className="slider">
							<div onClick={() => currentSlide > 0 ? setCurrentSlide(currentSlide - 1) : null} className={currentSlide > 0 ? "arrow arrow-left" : "arrow arrow-left disabled"}></div>
							
							{allProduct.nodes.map( (node, i) => (
								<div key={i} className={`slide slide-${currentSlide}`}>
									<Link to={`/product/${node.handle}`}>
										<div className="img-container">
											<Img
											fluid={node.images[0].src}
											key={node.images[0].id}
											alt={node.title}
											imgStyle={{objectFit: 'cover'}}
											objectPosition='50% 50%'
											/>  
										</div>
										<p className="title font1">{node.title}</p>
									</Link>
								</div>
							))}

							<div onClick={() => currentSlide < slidesLength ? setCurrentSlide(currentSlide + 1) : null } className={currentSlide < slidesLength ? "arrow arrow-right" : "arrow arrow-right disabled"}></div>
						</div> */}
				</div>


			{/* <button id="showDialog" onClick={() => document.getElementById("favDialog").showModal()}>Show the dialog</button> */}

			{/* <button onClick={document.getElementById('test').showModal()}>click for modal</button> */}

			{/* <pre>
				<code>{JSON.stringify(product, null, 2)}</code>
			</pre> */}

			{/* <div 
				className={classNames('shadow-small', {
					'hover:shadow-medium transition-shadow duration-200': slug,
				})}
			/> */}
		</>
	)
}
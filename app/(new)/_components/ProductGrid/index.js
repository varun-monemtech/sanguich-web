'use client'

import { useContext, useEffect, useState } from 'react'

import Link from 'next/link'
import { LoadImage } from '@/components/new/LoadImage'
import StoreContext from '@/context/StoreContext'
import './style.scss'
import Intro from '@/animations/Intro_Framer'

function ACFShop(props) {

	const anchor = props.anchor
	const classes = props.classes

	const { store } = useContext(StoreContext)

	const [productsData, setProductsData] = useState(null)

	useEffect(() => {
		store.client.product.fetchAll().then((products) => {
			setProductsData(products)
		})
	}, [])

	return (
		<>
			<section id={`section-${anchor}`} className={`frs-grid content shop-featured border-type-7 c4   ${classes} `}>
				<Intro delay={50}>
					{anchor ?
						<div id={anchor} className="anchor"></div>
						: null}
					<div className='grid-12'>
						<div className='span-12 heading-section'>
							<h2 className="title c4 font2">Shop</h2>
							<div className="decor-wrap">
								<div className="decor-top with-extra">
									<div className="decor-top-left"></div>
									<div className="decor-top-center with-extra">
										<div className="decor-top-center-extra-left"></div>
										<div id="space-logo" className="decor-top-center-extra-center"></div>
										<div className="decor-top-center-extra-right"></div>
									</div>
									<div className="decor-top-right"></div>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-12 gap-2 md:gap-6 md:px-10 span-12 product-grid">
							{productsData
								? productsData.map(({ id, handle, title, images: [firstImage], variants: [firstVariant] }, index) => (
									<article key={index} className=" col-span-6 md:col-span-4 rounded-xl border-[2px] border-solid !border-[#DBA920] overflow-hidden product-single">
										<Link href={`/product/${handle}/`} className="aspect-ratio ">
											{firstImage &&
												(<LoadImage
													src={firstImage.src}
													alt={firstImage.altText ? firstImage.altText : 'Shop Item'}
													width={firstImage.width}
													height={firstImage.height}
													className="img-cover"
												/>)}
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
								<div className="col-span-12 shop-intro padd-2">
									<h2 className="text-center">No products found :(</h2>
								</div>
							}
						</div>

						<div className='span-12 bottom-heading-section'>
							<p className="title uppercase c4 font1">Order Online</p>
							<div className="decor-wrap">
								<div className="decor-top with-extra">
									<div className="decor-top-left"></div>
									<div className="decor-top-center with-extra">
										<div className="decor-top-center-extra-left"></div>
										<div id="space-logo" className="decor-top-center-extra-center"></div>
										<div className="decor-top-center-extra-right"></div>
									</div>
									<div className="decor-top-right"></div>
								</div>
							</div>
						</div>
					</div>
				</Intro>

			</section>
		</>
	)
};

export default ACFShop
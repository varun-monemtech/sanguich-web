'use client'
import React, { useContext, useEffect, useState } from 'react'
import StoreContext from '../../context/StoreContext'
import ProductForm from '../ProductForm'

export default function ProductFormWrap({handle}) {
  const { store } = useContext(StoreContext)
	
  const [productsData, setProductsData] = useState(null)

  useEffect(() => {
    store.client.product.fetchByHandle(handle).then((product) => {
			// Do something with the product
      setProductsData(product)
    })
  },[])

	// console.log(productsData)

	return (
		<>
			{productsData ? 
				<ProductForm product={productsData} />
			: null}
			<pre>
				<code>{JSON.stringify(productsData, null, 2)}</code>
			</pre>
		</>
	)
}
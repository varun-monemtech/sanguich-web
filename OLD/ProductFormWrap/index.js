'use client'
import React, { useContext, useEffect, useState } from 'react'
import StoreContext from '../../context/StoreContext'
import ProductForm from '../ProductForm'

export default function ProductFormWrap({handle}) {
  const { store } = useContext(StoreContext)
	
  const [productsData, setProductsData] = useState(null)

  useEffect(() => {
    store.client.product.fetchByHandle(handle).then((product) => {
			// Clear out product object, remove all functions so we can pass it down to children
			var objectFunctionLess=JSON.parse(JSON.stringify(product))
			// Do something with the product
      setProductsData(objectFunctionLess)
    })
  },[])

	return (
		<>
			{productsData ? 
				<ProductForm product={productsData} />
			: null}
			{/* <pre>
				<code>{JSON.stringify(productsData, null, 2)}</code>
			</pre> */}
		</>
	)
}
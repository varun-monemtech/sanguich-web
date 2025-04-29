'use client'
import React, { useState, useContext, useEffect, useCallback } from 'react'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import {reduce} from "lodash"
import Link from 'next/link'

import StoreContext from '../../context/StoreContext'
import "./style.scss"
import dynamic from "next/dynamic";
const CreatableSelect = dynamic(() => import("react-select/creatable"), { ssr: false });


const useQuantity = () => {
	const { store: {checkout} } = useContext(StoreContext)
	const items = checkout ? checkout.lineItems : []
	const total = reduce(items, (acc, item) => acc + item.quantity, 0)
	return [total !== 0, total]
}

const ProductForm = ({ product }) => {
  const {
    options,
    variants,
    variants: [initialVariant],
    // ProductPriceRangeV2: { minVariantPrice },
  } = product
  const [variant, setVariant] = useState({ ...initialVariant })
  // console.log('variant',variant)
  const [quantity, setQuantity] = useState(1)
  const {
    addVariantToCart,
    store: { client, adding },
  } = useContext(StoreContext)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)
  const [inventoryError, setInventoryError] = useState(null)
  const [maxStockReached, setMaxStockReached] = useState(false)

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        // this checks the currently selected variant for availability
        const result = fetchedProduct.variants.filter(
          variant => variant.id === productVariant.id
        )
        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [client.product, productVariant.id, variants]
  )

  useEffect(() => {
    checkAvailability(product.id)
  }, [productVariant, checkAvailability, product.id])

  const handleQuantityChange = ({ target }) => {
    // Enforce a hard maximum for testing purposes
    const maxStock = 3
    const newQuantity = parseInt(target.value)
    
    if (newQuantity > maxStock) {
      setMaxStockReached(true)
      setQuantity(maxStock)
    } else {
      setMaxStockReached(false)
      setQuantity(newQuantity)
    }
  }
  
  const handleSubstractQuantity = () => {
    if(quantity > 1) {
      setQuantity(quantity - 1)
      setMaxStockReached(false)
    }
  }
  
  const handleAddQuantity = () => {
    // Enforce a hard maximum for testing purposes
    const maxStock = 3
    if (quantity >= maxStock) {
      setMaxStockReached(true)
    } else {
      setQuantity(quantity + 1)
    }
  }

  const handleOptionChangeSelect = (optionIndex,target) => {
    const { value } = target
    const currentOptions = [...variant.selectedOptions]

    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      value,
    }

    const selectedVariant = find(variants, ({ selectedOptions }) => {
      return isEqual(currentOptions, selectedOptions) ? true : false
    })

    setVariant({ ...selectedVariant })
  }

  const handleAddToCart = () => {
    setInventoryError(null)
    
    // Direct feedback based on quantity
    const maxStock = 3 // Hard-coded for testing
    if (quantity > maxStock) {
      setMaxStockReached(true)
      setQuantity(maxStock)
      setInventoryError(`Only ${maxStock} items available`)
      return
    }
    
    // If within limits, proceed with add
    addVariantToCart(productVariant.id, quantity)
  }

  /* 
  Using this in conjunction with a select input for variants 
  can cause a bug where the buy button is disabled, this 
  happens when only one variant is available and it's not the
  first one in the dropdown list. I didn't feel like putting 
  in time to fix this since its an edge case and most people
  wouldn't want to use dropdown styled selector anyways - 
  at least if the have a sense for good design lol.
  */
  const checkDisabled = (name, value) => {
    const match = find(variants, {
      selectedOptions: [
        {
          name: name,
          value: value.value,
        },
      ],
    })
    if (match === undefined) return true
    if (match.available === true) return false
    return true
  }

  const price = Intl.NumberFormat(undefined, {
    // currency: minVariantPrice.currencyCode,
    currency: variant?.price?.currencyCode ? variant.price.currencyCode : 'USD',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant?.price?.amount)

  const [hasItems] = useQuantity()

	// Select
	const customStyles = {
		control: (base, state) => ({
			...base,
			boxShadow: "none",
		}),
		option: (base, state) => ({
			...base,
			color: state.isDisabled ? '#888' : state.isSelected ? '#2A4B2E' : state.isFocused ? '#2A4B2E' : '#D0C8B9',
			cursor: state.isDisabled ? 'not-allowed' : 'default',
		}),
		valueContainer: (base) => ({
			...base,
			minHeight: 30,
		}),
    menu: provided => ({ ...provided, zIndex: 9999 })
	}
  
  return (
    <div className="product-details">
      <h1 className="product-title uppercase colored text-center h3">{product.title}</h1>
      <h2 className="product-price text-center h3">{price}</h2>
      <div className="product-description text-center"
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      />
      {options.map(({ id, name, values }, index) => (
        <div className="product-option" key={id}>
          {name !== 'Title' ?
            <>
              <label htmlFor={name}>{name} </label>
              <CreatableSelect
                name={name}
                onChange={event => handleOptionChangeSelect(index, event)}
                options={values.map(value => {
                  const isDisabled = checkDisabled(name, value)
                  return {
                    value: value.value,
                    label: isDisabled ? `${value.value} (out of stock)` : value.value,
                    isDisabled
                  }
                })}
                styles={customStyles}
                theme={theme => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    text: '#D0C8B9',
                    primary: '#DCBA7B',
                    primary75: '#DCBA7B',
                    primary50: '#DCBA7B',
                    primary25: '#DCBA7B',
                  
                    danger: '#DE350B',
                    dangerLight: '#FFBDAD',
                  
                    neutral0: '#213C24',
                    neutral5: '#DCBA7B',
                    neutral10: 'hsl(0, 0%, 90%)',
                    neutral20: '#DCBA7B',
                    neutral30: '#D0C8B9',
                    neutral40: 'hsl(0, 0%, 60%)',
                    neutral50: 'hsl(0, 0%, 92%)',
                    neutral60: 'hsl(0, 0%, 40%)',
                    neutral70: 'hsl(0, 0%, 30%)',
                    neutral80: 'hsl(0, 0%, 90%)',
                    neutral90: 'hsl(0, 0%, 100%)',
                  },
                })}
              />
            </>
          : null }
        </div>
      ))}
      <div className="product-option">
      <label htmlFor="quantity">QTY {maxStockReached && <span style={{color: 'red'}}>(Max: 3)</span>}</label>
      <div className="input-number-wrap">
        <button className="subtract" onClick={handleSubstractQuantity} >-</button>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          max="3" /* Hard-coded max for testing */
          step="1"
          onChange={handleQuantityChange}
          value={quantity}
          style={{borderColor: maxStockReached ? 'red' : undefined}}
        />
        <button className="add" onClick={handleAddQuantity} >+</button>
      </div>
      </div>
      <div className="product-summary text-center">
        <div className="button-box">
          <button
            type="submit"
            disabled={!available || adding}
            onClick={handleAddToCart}
          >
            {adding ? "Adding..." : "Add to Cart"}
          </button>
          {!available && <p>This Product is out of Stock!</p>}
          {inventoryError && <p style={{color: 'red', fontWeight: 'bold'}}>{inventoryError}</p>}
          {maxStockReached && <p style={{color: 'red'}}>Maximum stock reached</p>}
        </div>
        <div className="button-box">
          {hasItems ?
            <Link className="btn fancy" href="/cart">
              <span className="square">View Cart</span>
            </Link>
          : null }
        </div>
      </div>
    </div>
  )
}

export default ProductForm

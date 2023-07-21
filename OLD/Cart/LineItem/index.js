'use client'
import React, { useContext, useState, useEffect } from 'react'

import StoreContext from '../../../context/StoreContext'

const LineItem = props => {
  const { line_item } = props
  const {
    removeLineItem,
    store: { client, checkout },
    updateLineItem,
  } = useContext(StoreContext)

  const variantImage = line_item.variant.image ? (
    <img
      src={line_item.variant.image.src}
      alt={`${line_item.title} product shot`}
      height="60px"
    />
  ) : null

  const selectedOptions = line_item.variant.selectedOptions
    ? line_item.variant.selectedOptions.map(
      option => `${option.name}: ${option.value} `
    )
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, line_item.id)
  }

  // Using state to track frontend
  const [quantity, setQuantity] = useState(line_item.quantity)
  // Fire shopify update only after 300ms to buffer sequence of quick add/subtract clicks or keyboard inputs
  useEffect(() => {
    let queueBuffer = null
    queueBuffer = setTimeout(() => {
      updateLineItem(client, checkout.id, line_item.id, quantity)
    }, 300)
    return () => clearTimeout(queueBuffer)
  }, [quantity])

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value)
  }

  const handleSubstractQuantity = () => {
    if (quantity > 1) {
      setQuantity(parseInt(quantity) - 1)
    }
  }
  const handleAddQuantity = () => {
    setQuantity(parseInt(quantity) + 1)
  }

  //console.log(selectedOptions)


  return (
    <div className="cart-item">
      <div className="cart-line-pic">{variantImage}</div>
      <p className="cart-line-title">
        {line_item.title}
        {`  `}
        {line_item.variant.title === !'Default Title'
          ? line_item.variant.title
          : ''}
      </p>
      <div className="cart-line-options">{selectedOptions && selectedOptions[0] !== "Title: Default Title " ? selectedOptions : null}</div>
      <div className="cart-line-quantity">
        <span>Quantity: {parseInt(line_item.quantity) !== parseInt(quantity) ? "..." : line_item.quantity}</span>
        <div className="input-number-wrap">
          <button className="subtract" onClick={handleSubstractQuantity} data-li={{ line_item }} >-</button>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            step="1"
            onChange={handleQuantityChange}
            value={quantity}
          />
          <button className="add" onClick={handleAddQuantity} data-li={{ line_item }} >+</button>
        </div>
      </div>
      <div onClick={handleRemove} className='btn'>
        <a><span>Remove</span></a>
      </div>
    </div>
  )
}

export default LineItem

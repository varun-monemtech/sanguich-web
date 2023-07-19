import React, { useContext } from 'react'

import StoreContext from '../../../context/StoreContext'
import LineItem from './LineItem'
import './style.scss'

const Cart = () => {
  const {
    store: { checkout },

  } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const line_items = checkout.lineItems.map(line_item => {
    return <LineItem key={line_item.id.toString()} line_item={line_item} />
  })

  return (
    <div className="cart-details">
      <div className="cart-items">
        {line_items}
      </div>
      <div className="cart-summary">
        <h2>Subtotal</h2>
        <p>$ {checkout.subtotalPrice}</p>
        <h2>Taxes</h2>
        <p>$ {checkout.totalTax}</p>
        <h2 className="total">Total</h2>
        <p className="total">$ {checkout.totalPrice}</p>
        <div onClick={handleCheckout} className={`btn ${checkout.lineItems.length === 0 ? 'disabled' : ''}`}>
          <a><span>Check out</span></a>
        </div>
      </div>
    </div>
  )
}

export default Cart
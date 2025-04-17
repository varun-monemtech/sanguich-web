import React, {useContext} from 'react'
import './style.scss'
import reduce from 'lodash/reduce'

import StoreContext from '@/context/StoreContext'
import Link from 'next/link'

const useQuantity = () => {
	const { store: {checkout} } = useContext(StoreContext)
	const items = checkout ? checkout.lineItems : []
	const total = reduce(items, (acc, item) => acc + item.quantity, 0)
	return [total !== 0, total]
}

function CartIndicator(props) {
	const { store: {checkout} } = useContext(StoreContext)
	const [hasItems, quantity] = useQuantity()

	const handleCheckout = () => {
		window.open(checkout.webUrl)
	}

  return (
		<>
			{hasItems ?
				<div id="master-cart-indicator" className="is-inview flex font1">
					<div className="checkout" onClick={handleCheckout}>
						Checkout
					</div>
					<Link className="cart" href="/cart">
						<div className="cart-label flex">
							<span>Items in Cart</span>
							<i className="icon-cart"><span className="circle">{quantity}</span></i>
						</div>
					</Link>
				</div>
			: null }
		</>
  )
}

export default CartIndicator
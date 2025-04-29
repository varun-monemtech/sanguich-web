'use client'
import fetch from 'isomorphic-fetch'
import React, { useState, useEffect, useRef } from 'react'
import Client from 'shopify-buy'

import Context from '../context/StoreContext'

const client = Client.buildClient(
  {
    storefrontAccessToken: "7604381f9d72ff2f959b734b6c7b4f41",
    domain: `sanguich-de-miami.myshopify.com`,
  },
  fetch
)

const ContextProvider = ({ children }) => {
  let initialStoreState = {
    client,
    adding: false,
    checkout: { lineItems: [] },
    products: [],
    shop: {},
  }

  const [store, updateStore] = useState(initialStoreState)
  const isRemoved = useRef(false)

  useEffect(() => {
    const initializeCheckout = async () => {
      const isBrowser = typeof window !== 'undefined'
      const existingCheckoutID = isBrowser
        ? localStorage.getItem('shopify_checkout_id')
        : null

      const setCheckoutInState = checkout => {
        if (isBrowser) {
          localStorage.setItem('shopify_checkout_id', checkout.id)
        }

        updateStore(prevState => {
          return { ...prevState, checkout }
        })
      }

      const createNewCheckout = () => store.client.checkout.create()
      const fetchCheckout = id => store.client.checkout.fetch(id)

      if (existingCheckoutID) {
        try {
          const checkout = await fetchCheckout(existingCheckoutID)
          if (!isRemoved.current && !checkout.completedAt) {
            setCheckoutInState(checkout)
            return
          }
        } catch (e) {
          localStorage.setItem('shopify_checkout_id', null)
        }
      }

      const newCheckout = await createNewCheckout()
      if (!isRemoved.current) {
        setCheckoutInState(newCheckout)
      }
    }

    initializeCheckout()
  }, [store.client.checkout])

  useEffect(() => () => {
    isRemoved.current = true
  })

  return (
    <Context.Provider
      value={{
        store,
        addVariantToCart: async (variantId, quantity) => {
          if (variantId === '' || !quantity) {
            const errorMsg = 'Both a size and quantity are required.';
            console.error(errorMsg);
            return errorMsg;
          }

          updateStore(prevState => {
            return { ...prevState, adding: true }
          })

          const { checkout, client } = store
          const checkoutId = checkout.id
          const lineItemsToUpdate = [
            { variantId, quantity: parseInt(quantity, 10) },
          ]

          try {
            const updatedCheckout = await client.checkout.addLineItems(checkoutId, lineItemsToUpdate);
            
            if (updatedCheckout.userErrors && updatedCheckout.userErrors.length > 0) {
              const inventoryError = updatedCheckout.userErrors.find(err => 
                err.field && err.field.includes('quantity') || 
                err.message && err.message.toLowerCase().includes('inventory') ||
                err.message && err.message.toLowerCase().includes('stock')
              );

              if (inventoryError) {
                const errorMsg = inventoryError.message || 'Not enough items in stock.';
                console.error('Inventory Error:', inventoryError);
                updateStore(prevState => ({ ...prevState, adding: false }));
                return errorMsg;
              }
            }

            updateStore(prevState => {
              return { ...prevState, checkout: updatedCheckout, adding: false }
            })
            console.log('Item added successfully');
            return null;

          } catch (error) {
            const errorMsg = 'Error adding item to cart.';
            console.error('Shopify SDK Error:', error);
            updateStore(prevState => {
              return { ...prevState, adding: false }
            });
            return errorMsg;
          }
        },
        removeLineItem: (client, checkoutID, lineItemID) => {
          return client.checkout
            .removeLineItems(checkoutID, [lineItemID])
            .then(res => {
              updateStore(prevState => {
                return { ...prevState, checkout: res }
              })
            })
        },
        updateLineItem: (client, checkoutID, lineItemID, quantity) => {
          const lineItemsToUpdate = [
            { id: lineItemID, quantity: parseInt(quantity, 10) },
          ]

          return client.checkout
            .updateLineItems(checkoutID, lineItemsToUpdate)
            .then(res => {
              updateStore(prevState => {
                return { ...prevState, checkout: res }
              })
            })
        },
      }}
    >
      {children}
    </Context.Provider>
  )
}
export default ContextProvider
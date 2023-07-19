import React from 'react'
import './style.scss'

import ProductGrid from '../../../../OLD/ProductGrid'

function ACFShop(props) {

  const anchor = props.anchor
  const classes = props.classes

  return (
    <>
      <section id={`section-${anchor}`} className={`content shop-featured c4 grid-12 ${classes}`}>

        {anchor ?
          <div id={anchor} className="anchor"></div>
          : null}

        <ProductGrid />

      </section>
    </>
  )
};

export default ACFShop
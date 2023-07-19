import React from 'react'
import './style.scss'

import Image from 'next/image'
import Map from '../../../Map/GMap'

function Address(props) {

  const anchor = props.anchor
  const classes = props.classes
  const itemsCount = props.items.length

  const itemsMap = props.items?.map((node, i) => {
    let image = node.img

    let ph1 = node.phone.slice(0, 3)
    let ph2 = node.phone.slice(3, 6)
    let ph3 = node.phone.slice(6, node.phone.length + 1)

    return (

      <div key={i} className={itemsCount % 2 == 0 ? "double span-12 span-12-mobile grid-12" : "single span-12 span-12-mobile grid-12"}>

        <div className="span-6 span-12-tablet grid-12">
          <div className="span-12 relative" >
            <Image
              src={image.url}
              width={1200}
              height={1600}
              alt={image.alt}
              style={{ objectFit: "cover" }}
              quality="90"
            />
          </div>
          <div className="content-container span-12">
            <p className="uppercase underline">{node.address}</p>
            <p>
              <a className="lighten-green" href={`tel:${node.phone}`}>{`${ph1} ${ph2} ${ph3}`}</a>
              <br />
              <a className="green uppercase" href={`mailto:${node.mail}`}>{node.mail}</a>
            </p>
            <p className="uppercase marg-bottom-off">{node.hours}</p>
            {/* <p className="green-border">CLOSED ON WEDNESDAYS</p> */}
          </div>
        </div>

        <div className="span-6 span-12-tablet map-part">
          <Map {...node.map} />
        </div>

      </div>
    )
  })

  return (
    <>
      {classes ?
        <section id={`section-${anchor}`} className={`content c4 grid-12 is-inview ${classes}`}>

          {anchor ?
            <div id={anchor} className="anchor"></div>
            : null}

          {itemsMap}

        </section>
        : null}
    </>
  )
}

export default Address
import React from 'react'
import './style.scss'

import Image from 'next/image'

function SeenOn(props) {

  const anchor = props.anchor
  const classes = props.classes

  const itemsMap = props.items?.map((node, i) => {
    let logo = node.img

    if (node.link || node.file) {
      return (
        <a key={i} href={node?.file?.localFile ? node.file.localFile.publicURL : node.link} aria-label='Press Logo Link' className="single-item span-3 span-5-mobile" target="_blank" rel="noreferrer noopener">
          <div className='image-wrapper'>
            <Image
              src={logo.url}
              width={150}
              height={80}
              alt={logo.alt}
              style={{ objectFit: "contain" }}
              quality="90"
            />
          </div>
        </a>
      )
    } else {
      return (
        <div key={i} className="single-item span-3 span-5-mobile">
          <div className='image-wrapper'>
            <Image
              src={logo.url}
              width={150}
              height={80}
              alt={logo.alt}
              style={{ objectFit: "contain" }}
              quality="90"
            />
          </div>

        </div>
      )
    }
  })

  return (
    <>
      {classes ?
        <section id={`section-${anchor}`} className={`content c4 grid-12 is-inview ${classes}`}>

          {anchor ?
            <div id={anchor} className="anchor"></div>
            : null}

          <div className="span-12 grid-12 c4">

            <div className="header span-12 span-12-mobile">
              <h2 className="seen-on-font font2">
                <span className="capitalize">S</span>een <span className="capitalize">O</span>n
              </h2>
            </div>

            <div className="item-container span-12 span-12-mobile grid-15 center">
              {itemsMap}
            </div>

          </div>

        </section>
        : null}
    </>
  )
}

export default SeenOn
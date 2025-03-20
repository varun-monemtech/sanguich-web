'use client'
import React from 'react'
import './style.scss'

import Image from 'next/image'
import CF7Catering from '../../../Form/CF7/Catering'
import { useInView } from 'react-intersection-observer'

function Catering(props) {
	const [io, ioInView] = useInView({ triggerOnce: true })

  const anchor = props.anchor
  const classes = props.classes
  const image = props.img


  return (
    <>
      {classes ?
        <section ref={io} id={`section-${anchor}`} className={`content c4 grid-12 is-inview ${classes} ${ioInView ? 'inview' : ''}`}>

          {anchor ?
            <div id={anchor} className="anchor"></div>
            : null}

          <div className="img span-6 span-12-tablet">

            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image.alt}
              style={{ objectFit: "cover" }}
              quality="90"
            />

          </div>

          <div className="catering span-6 span-12-tablet border-type-3 fs-85">

            <div className="decor-wrap">
              <div className="decor-top">
                <div className="decor-top-left"></div>
                <div className="decor-top-center"></div>
                <div className="decor-top-right"></div>
              </div>
              <div className="decor-center">
                <div className="decor-center-left"></div>
                <div className="decor-center-right"></div>
              </div>
              <div className="decor-bottom">
                <div className="decor-bottom-left"></div>
                <div className="decor-bottom-center"></div>
                <div className="decor-bottom-right"></div>
              </div>
            </div>

            <CF7Catering />

          </div>

        </section>
        : null}
    </>
  )
}

export default Catering
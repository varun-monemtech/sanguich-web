'use client'
import React from 'react'
import './style.scss'

import Image from 'next/image'
import { Parallax } from 'react-scroll-parallax'
import { useInView } from 'react-intersection-observer'

function Order(props) {

  const [io, ioInView] = useInView({ triggerOnce: true })
  const anchor = props.anchor
  const classes = props.classes
  const image = props.img
  const image2 = props.img2
  const image3 = props.img3


  return (
    <>
      {classes ?
        <section id={`section-${anchor}`} className={`content c4 is-inview ${ioInView ? 'inview' : ''} ${classes}`}>

          {anchor ?
            <div id={anchor} className="anchor"></div>
            : null}

          <div className="img c4 ">

            <div className="order bg-overlay overlay"></div>

            <Parallax className="order-parallax" translateY={[-40, 0]} tagOuter="figure">
              <Image
                src={image.url}
                width={1500}
                height={900}
                alt={image.alt}
                style={{ objectFit: "cover" }}
                className="image"
                quality="90"
              />
            </Parallax>

          </div>

          <div className="links">

            {/* <div className="link font1">
							<h2 className="font2 colored"><span className="capitalize">O</span>rder&nbsp;<span className="capitalize">O</span>nline:</h2>
						</div> */}

            <div className="link layer font1 uppercase">
              <a href="https://www.toasttab.com/sanguich/v3/" target="_blank" rel="noreferral noopener" className="logo">

                <Image
                  src={image2.url}
                  width={400}
                  height={100}
                  alt={image.alt}
                  style={{ objectFit: "contain" }}
                  className="image"
                  quality="90"
                />
              </a>
            </div>

            <div className="link layer font1 uppercase">
              <a href="https://www.goldbelly.com/sanguich-de-miami" target="_blank" rel="noreferral noopener" className="logo">

                <Image
                  src={image3.url}
                  width={400}
                  height={100}
                  alt={image.alt}
                  style={{ objectFit: "contain" }}
                  className="image"
                  quality="90"
                />
              </a>
            </div>

          </div>

        </section>
        : null}
    </>
  )
}

export default Order
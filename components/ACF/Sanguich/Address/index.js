'use client'
import React from 'react'
import './style.scss'
import MultiButton from './MultiButton'
import Image from 'next/image'
// import Map from '../../../Map/GMap'
import { useInView } from 'react-intersection-observer'

function Address(props) {
  const [io, ioInView] = useInView({ triggerOnce: true })

  const anchor = props.anchor
  const classes = props.classes

  const itemsMap = props.items?.map((node, i) => {
    let image = node.img

    let ph1 = node.phone?.slice(0, 3)
    let ph2 = node.phone?.slice(3, 6)
    let ph3 = node.phone?.slice(6, node.phone.length + 1)

    return (

      <div key={i} className="span-6 span-12-tablet grid-12 tile">

        <div className="span-12 relative aspect-ratio" >
          <Image
            src={image.url}
            width={1200}
            height={1600}
            alt={image.alt}
            style={{ objectFit: "cover" }}
            quality="90"
          />
          {i >= 2 ? <div className='coming-soon'><h2>COMING SOON</h2></div> : null}
        </div>
        <div className="content-container span-12">
          <h6 className='uppercase font3 heading'>{node.name}</h6>
          <p className={`uppercase ${node.map ? 'underline' : ''}  m-top-off`}>
            {node?.map?.place_id ? <a target='_blank' href={`https://www.google.com/maps/place/?q=place_id:${node?.map?.place_id}`}>{node.address}</a> : <span className='padd-top block'>{node.address}</span>}
          </p>
          <p>
            {i === 1 ? "NO DINE-IN | " : null}
            {node.phone ? <a className="lighten-green" href={`tel:${node.phone}`}>{`${ph1} ${ph2} ${ph3} |`}</a> : null}
            <a className="green uppercase" href={`mailto:${node.mail}`}>{` ${node.mail}`}</a>
          </p>
          <p className="uppercase marg-bottom-off">{node.hours}</p>
          {/* <p className="green-border">CLOSED ON WEDNESDAYS</p> */}
        </div>
        <div className='span-12 flex padd-bottom'>
          <MultiButton links={node.links} />
        </div>
      </div>

      // <div className="span-6 span-12-tablet map-part">
      //   <Map {...node.map} />
      // </div>
    )
  })

  return (
    <>
      {classes ?
        <section ref={io} id={`section-${anchor}`} style={{ zIndex: 101 }} className={`content c4 grid-12 border-type-7 is-inview ${classes}  ${ioInView ? 'inview' : ''} `}>

          {anchor ?
            <div id={anchor} className="anchor"></div>
            : null}

          <div className='span-12 heading-section'>
            <h2 className="title c4 font2"><span className="capitalize" style={{textTransform: "none !important"}}>l</span>ocations</h2>
            <div className="decor-wrap">
              <div className="decor-top with-extra">
                {/* <div className="decor-top-left"></div> */}
                <div className="decor-top-center with-extra">
                  <div className="decor-top-center-extra-left"></div>
                  <div id="space-logo" className="decor-top-center-extra-center"></div>
                  <div className="decor-top-center-extra-right"></div>
                </div>
                {/* <div className="decor-top-right"></div> */}
              </div>
            </div>
          </div>

          <div className={"double main-grid span-12 span-12-mobile grid-12"}>
            {itemsMap}
          </div>

          <div className='locations-bottom-decor span-12'>
            <div className="decor-wrap">
              <div className="decor-top with-extra">
                {/* <div className="decor-top-left"></div> */}
                <div className="decor-top-center with-extra">
                  <div className="decor-top-center-extra-left"></div>
                  <div id="space-logo" className="decor-top-center-extra-center"></div>
                  <div className="decor-top-center-extra-right"></div>
                </div>
                {/* <div className="decor-top-right"></div> */}
              </div>
            </div>
          </div>

        </section>
        : null}
    </>
  )
}

export default Address
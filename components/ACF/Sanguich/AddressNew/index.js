'use client'
import React, { useState } from 'react'
import './style.scss'
import MultiButton from './MultiButton'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import GMap from '../../../GMap'

function AddressNew(props) {
  const [io, ioInView] = useInView({ triggerOnce: true })
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const anchor = props.anchor
  const classes = props.classes
	
  const itemsMap = props.items?.map((node, i) => {
    let image = node.img

    let ph1 = node.phone?.slice(0, 3)
    let ph2 = node.phone?.slice(3, 6)
    let ph3 = node.phone?.slice(6, node.phone.length + 1)
    return (
      <div 
        key={i} 
        className={`span-12 span-12-tablet grid-12 tile gap-1 grid-item ${(hoveredIndex === i || selectedIndex === i) ? 'hovered' : ''}`}
        onMouseEnter={() => setHoveredIndex(i)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => setSelectedIndex(i)}
      >

        <div className="span-5 relative aspect-ratio">
          {image?.url &&
            <Image
              src={image.url}
              width={1200}
              height={1600}
              alt={image.alt}
              style={{ objectFit: "cover" }}
              quality="90"
							className='rounded-lg'
            />
          }
          {/* {i >= 3 ? <div className='coming-soon'><h2>COMING SOON</h2></div> : null} */}
        </div>
        <div className="content-container span-7">
          <h3 className='uppercase font3 heading'>{node.name}</h3>
          <p className={`uppercase ${node.map ? 'underline' : ''}  m-top-off`}>
            {node?.map?.place_id ? <a target='_blank' href={`https://www.google.com/maps/place/?q=place_id:${node?.map?.place_id}`}>{node.address}</a> : <span className='padd-top block'>{node.address}</span>}
          </p>
          <p>
            {i === 1 ? "NO DINE-IN | " : null}
            {node.phone ? <a className="lighten-green" href={`tel:${node.phone}`}>{`${ph1} ${ph2} ${ph3} `}</a> : null}
						|
            <a className="green uppercase" href={`mailto:${node.mail}`}>{` ${node.mail}`}</a>
          </p>
          <p className="uppercase marg-bottom-off">{node.hours}</p>
          {/* <p className="green-border">CLOSED ON WEDNESDAYS</p> */}
					<div className='span-12 flex padd-bottom'>
          <MultiButton links={node.links} />
        </div>
        </div>
      
      </div>


    )
  })

  return (
    <>
      {classes ?
        <section ref={io} id={`section-${anchor}-new`} style={{ zIndex: 101 }} className={`content c4  border-type-7 is-inview ${classes}  ${ioInView ? 'inview' : ''} `}>

          {anchor ?
            <div id={anchor} className="anchor"></div>
            : null}

          <div className='heading-section'>
            <h2 className="title c4 font2"><span className="capitalize" style={{textTransform: "none !important"}}>l</span>ocations</h2>
            <div className="decor-wrap">
              <div className="decor-top with-extra">
                <div className="decor-top-center with-extra">
                  <div className="decor-top-center-extra-left"></div>
                  <div id="space-logo" className="decor-top-center-extra-center"></div>
                  <div className="decor-top-center-extra-right"></div>
                </div>
              </div>
            </div>
          </div>

					<div className='grid-12 gap-2'>
						<div className={" main-grid  span-6 grid-12 rounded-lg padd"}>
							{itemsMap}
						</div>
						<div className="span-6 span-12-tablet ">
							<div className='aspect-square overflow-hidden rounded-lg'>
								<GMap 
                  allVenues={props.items} 
                  hoveredIndex={hoveredIndex} 
                  setHoveredIndex={setHoveredIndex}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                />
							</div>
						</div>
					</div>

   

          <div className='locations-bottom-decor span-12'>
            <div className="decor-wrap">
              <div className="decor-top with-extra">
                <div className="decor-top-center with-extra">
                  <div className="decor-top-center-extra-left"></div>
                  <div id="space-logo" className="decor-top-center-extra-center"></div>
                  <div className="decor-top-center-extra-right"></div>
                </div>
              </div>
            </div>
          </div>

        </section>
        : null}
    </>
  )
}

export default AddressNew
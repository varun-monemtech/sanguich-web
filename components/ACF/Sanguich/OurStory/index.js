'use client'
import React from 'react'
import './style.scss'
import { useInView } from 'react-intersection-observer'

function OurStory(props) {

  const [io, ioInView] = useInView({ triggerOnce: true })
  const anchor = props.anchor
  const classes = props.classes
  // const header = props.header
  const content = props.content


  return (
    <>
      {classes ?
        <section ref={io} id={`section-${anchor}`} className={`content c5 grid-12 is-inview ${ioInView ? 'inview' : ''} ${classes}`}>

          {anchor ?
            <div id={anchor} className="anchor"></div>
            : null}

          <div className="border-out">
            <div className="border-in"></div>
          </div>

          <div className="span-12 grid-12 c5">

            <div className="header span-12">
              <h2 className="font2">
                <span className="capitalize">O</span>ur <span className="capitalize">S</span>tory
              </h2>
            </div>

            <div className="content-container span-12">
              <div className='content-holder' dangerouslySetInnerHTML={{ __html: content }} />
            </div>

          </div>

        </section>
        : null}
    </>
  )
}

export default OurStory
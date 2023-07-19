import React from 'react'
import './style.scss'
import VideoHTML from '../../../Video/HTML'

function Hola(props) {

  const anchor = props.anchor
  const classes = props.classes
  const image = props.img
  const video = props.video_file?.url


  return (
    <>
      {classes ?
        <section id={`section-${anchor}`} className={`content c4 grid-12 is-inview ${classes}`}>

          {anchor ?
            <div id={anchor} className="anchor"></div>
            : null}

          <div className="img span-12 grid-12 c4 ">
            <VideoHTML file={video} placeholder={image} revealonclick={true} autoplay={true} />
          </div>

        </section>
        : null}
    </>
  )
}

export default Hola
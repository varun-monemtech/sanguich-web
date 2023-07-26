'use client'
import React from 'react'
import Image from 'next/image'

//import PropTypes from 'prop-types'
import './style.scss'
import { Parallax } from 'react-scroll-parallax'
import VideoComponent from '../../../Video/HTML'
import Link from 'next/link'

function SingleIMG(props) {
  const image = props.img
  const content = props.wysiwyg
  const video = props.video_file?.url
  const parallax = props.parallax
  const bg_overlay = props.bg_overlay
  const theme = props.theme

  // useEffect(() => {
  // 	window.requestAnimationFrame(() => {
  // 		props.parallaxController.update()
  //   })
  // },[props.parallaxController])

  return (
    <div className={`single-img ${theme}`}>

      <div className="decor-wrap">
        <div className="decor-top with-extra">
          <div className="decor-top-left"></div>
          <div className="decor-top-center with-extra">
            <div className="decor-top-center-extra-left"></div>
            <div id="space-logo" className="decor-top-center-extra-center"></div>
            <div className="decor-top-center-extra-right"></div>
          </div>
          <div className="decor-top-right"></div>
        </div>
        <div className="decor-center">
          <div className="decor-center-left"></div>
          <div className="decor-center-right"></div>
        </div>
        <div className="decor-bottom">
          <div className="decor-bottom-left"></div>
          <div className="decor-bottom-center with-extra">
            <div className="decor-bottom-center-extra-left"></div>
            <div id="space-arrow" className="decor-bottom-center-extra-center"></div>
            <div className="decor-bottom-center-extra-right"></div>
          </div>
          <div className="decor-bottom-right"></div>
        </div>
      </div>
      <div className="logo"></div>
      <a href="#homepage-menu" className="to-next animated"  scroll={false}></a>

      {image && parallax ? (
        <Parallax className="hero-parallax" translateY={[-20, 20]}>
          <Image
            src={image.url}
            width={1500}
            height={1200}
            alt={image.alt}
            style={{ objectFit: "cover" }}
            quality="90"
            className="image-1"
          />
        </Parallax>
      ) : image ? (
        <>
          <Image
            src={image.url}
            width={1500}
            height={1200}
            alt={image.alt}
            style={{ objectFit: "cover" }}
            quality="90"
            className="image-1"
          />
        </>
      ) : null}

      {bg_overlay ?
        <div className='bg-overlay' style={{ opacity: bg_overlay }}>
          <div className='bg-overlay-x' style={{ opacity: bg_overlay }}></div>
        </div>
        : null}

      <div className='hero-content'>
        <div className="hero-content-animator">
          <div className='hero-content-box splittext-lines' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>

      <div className="animated video-hero-box">
        <VideoComponent file={video} autoplay={true} />
      </div>
    </div>
  )
}

export default SingleIMG
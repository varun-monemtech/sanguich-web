'use client'
import React from 'react'
import './style.scss'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'

function PostTemplate({post}) {
	const [io, ioInView] = useInView({ triggerOnce: true })

  return (
      <div id="post-template" className="c4 ">
        <section ref={io} id="homepage-hero" className={`hero is-inview ${ioInView ? 'inview' : ''} border-type-1 c4`}>
          <div className="img-container hero">
            <div className="decor-wrap ">
              <div className="decor-top with-extra">
                <div className="decor-top-left"></div>
                <div className="decor-top-center with-extra">
                  <div className="decor-top-center-extra-left"></div>
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

            <a href="#scroll" className="to-next animated" scroll={false}></a>

            <div className="img-wrapper">
              <h2 className="title" dangerouslySetInnerHTML={{ __html: post?.title?.rendered }} />
              <Image src={post?.acf?.hero?.url} width="2500" height="1800" quality="85" alt={post?.acf?.hero?.alt} />

              <div className='bg-overlay' style={{ opacity: 0.3 }}>
                <div className='bg-overlay-x' style={{ opacity: 0.3 }}></div>
              </div>
            </div>


          </div>
        </section>

        <div id="header-fold-breakpoint"></div>

        <div className="content">
          <div id="scroll" className="anchor"></div>
          <h2 className="content-title text-center" dangerouslySetInnerHTML={{ __html: post?.title?.rendered }} />
          <div className="wysiwyg-inject" dangerouslySetInnerHTML={{ __html: post?.acf?.content }} />
          {post?.acf?.video ?
            <div className="video">
              <div className="iframe-container">
                <iframe id="i_video" width="1120" height="600" src={post?.acf?.video ? post?.acf.video : null} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
              </div>
            </div>
            : null}
          {post?.acf?.image ?
            <div className="img-wrapper img wysiwyg-inject">
              <Image src={post?.acf?.image?.url} width="1200" height="600" quality="85" alt={post?.acf?.image?.alt} />
            </div>
            : null}
        </div>
      </div>
  )
}

export default PostTemplate
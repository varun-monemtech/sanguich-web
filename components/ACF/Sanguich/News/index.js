import React from 'react'
import './style.scss'
import Link from "next/link"
import Image from 'next/image'

function News({ anchor, classes, posts }) {

  const recentNews = posts.map((post, i) => {
    return (
      <div key={i} className='single-post span-12 grid-12'>

        <div className='img-container'>
          <Image src={post?.x_featured_media_original} width="500" height="200" quality="85" alt='post thumbnail' />
        </div>

        <div className='content-box'>
          <h3 className="title" dangerouslySetInnerHTML={{ __html: post?.title?.rendered }} />

          <div className='content-holder' dangerouslySetInnerHTML={{ __html: post?.acf?.excerpt }} />

          <div className="read-more">
            <Link href={`discover/${post?.slug}`}>
              <p>- READ MORE</p>
            </Link>
          </div>
        </div>

      </div>
    )
  })


  return (
    <section id={`section-${anchor}`} className={`content c4 grid-12 is-inview ${classes ? classes : ''}`}>

      {anchor ?
        <div id={anchor} className="anchor"></div>
        : null}

      <div className="background-img"></div>

      <div className="header span-12-mobile">
        <h2 className="news-font font2">
          <span className="capitalize">N</span>ews
        </h2>
      </div>

      <div className='post-container grid-12'>
        {recentNews ? recentNews : null}

      </div>

    </section>
  )
}

export default News
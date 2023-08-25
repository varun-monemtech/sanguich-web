'use client'
import React, { useState } from 'react'
import './style.scss'

function MultiButton({ links }) {
  const [multiBtnOpen, setMultiBtnOpen] = useState(false)

  const dropButtonInside = links?.map((node, i) => {
    if (i > 0)
      return (
        <a key={i} href={node.url} className={`button-dropdown-item`} target="_blank" rel="noreferrer noopener">
          <span>{node.title}</span>
        </a>
      );
  })

  return (
    links?.length > 0 ?
      <div className='multi-button' tabIndex="1" onClick={() => setMultiBtnOpen(true)} onMouseLeave={() => setMultiBtnOpen(false)}>
        <div className={`btn btn-border ${multiBtnOpen ? 'border-bottom-off' : ''}`}>
          <span className='multi-btn-span'>{links?.[0]?.title}<div className='icon icon-arrow-bottom'></div> </span>
        </div>
        {multiBtnOpen ?
          <div className='button-dropdown-menu'>
            {dropButtonInside}
          </div>
          : null}
      </div>
      :
      null
  )
}

export default MultiButton
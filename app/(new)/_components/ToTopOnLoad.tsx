'use client'
import { useEffect } from 'react'

// Due to next js skipping layout components on navigation scroll to top, we have to do it manually. The no-scroll class momentarily disables smooth scroll behavior on the html element.
export const ToTopOnLoad = () => {

  useEffect(() => {
    
    const htmlElement = document.querySelector('html')

    if (htmlElement) {
      htmlElement.classList.add('no-scroll')

      setTimeout(() => {
        htmlElement.classList.remove('no-scroll')
      }, 500)
    }

    window.scrollTo(0, 0)
  }, [])

  return null
}
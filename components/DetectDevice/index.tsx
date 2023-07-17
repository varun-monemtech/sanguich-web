'use client'
import { useEffect } from "react"

// Detect device is good and works but it's too slow, introduces flash of content
export const DetectDevice = () => {

	useEffect(() => {
    
		// Add classes to body based on what we are dealing with screen-wise
		function updateClasses() {
			if (document.body) {
				const vw = window.innerWidth
				const vh = window.innerHeight
				if (vw >= 1920) { document.body.classList.add('desktop') } else { document.body.classList.remove('desktop') }
				if (1368 <= vw && vw < 1920) { document.body.classList.add('laptop') } else { document.body.classList.remove('laptop') }
				if (vw >= 768 && vw <= 1368 && vh >= 768) { document.body.classList.add('tablet') } else { document.body.classList.remove('tablet') }
				if (vw < 768 || (vw <= 1368 && vh < 768)) { document.body.classList.add('mobile') } else { document.body.classList.remove('mobile') }
				if (vw >= vh) { document.body.classList.add('landscape') } else { document.body.classList.remove('landscape') }
				if (vh > vw) { document.body.classList.add('portrait') } else { document.body.classList.remove('portrait') }
			}
		}

		// Listen to resizes
		window.addEventListener('resize', updateClasses)

    // Fire once at page load
		updateClasses()

    // Remove listener when done
    return () => window.removeEventListener('resize', updateClasses)
  },[])

	return false
}
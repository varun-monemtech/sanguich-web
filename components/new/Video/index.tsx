'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Play, Pause, Volume, VolumeX, X, Maximize, Minimize } from 'lucide-react'
import { useInView } from 'framer-motion'
import {
  Dialog,
  DialogContent,	
  DialogClose,
	DialogTitle
} from '@/components/shadcn/ui/dialog'
import { LoadImage } from '../LoadImage'

type VideoProps = {
  url: string
  shortVersion?: string
  imgCover?: {
    url: string
    alt?: string
  }
  vidCover?: string
  mode: 'bg' | 'inline' | 'lightbox'
  autoPlay?: boolean
  wrapperClasses?: string
  videoClasses?: string
  overlay?: {
    color?: string
    opacity?: number
    pattern?: string
    content?: string
    classes?: string
  }
  captions?: string // URL to the VTT file
}

const VideoComponent = ({
  url,
  shortVersion,
  imgCover,
  vidCover,
  mode = 'inline',
  autoPlay = true,
  wrapperClasses = '',
  videoClasses = '',
  overlay,
  captions
}: VideoProps) => {
  // Refs
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef)
  
  // State
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showLightbox, setShowLightbox] = useState(false)
  const [currentSource, setCurrentSource] = useState(shortVersion || url)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [manuallyPaused, setManuallyPaused] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Handlers
  const handlePlayPause = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
      setManuallyPaused(true)
    } else {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
      setManuallyPaused(false)
    }
  }, [isPlaying])

  const handleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (mode === 'bg') return
    setIsMuted(!isMuted)
  }, [isMuted, mode])

  const handleFirstInteraction = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    // Skip interaction handling for:
    // 1. Already interacted
    // 2. Background mode
    // 3. Lightbox mode without covers
    if (hasInteracted || mode === 'bg' || (mode === 'lightbox' && !imgCover && !vidCover)) return

    setHasInteracted(true)
    setCurrentSource(url)
    setIsMuted(false)

    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [hasInteracted, mode, url])

  const handleLightboxOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (mode !== 'lightbox') return
    
    // When no covers are provided, pause the main video
    if (!imgCover && !vidCover && videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
    
    setShowLightbox(true)
    setCurrentSource(url)
    setIsMuted(false)
  }, [mode, url, imgCover, vidCover])

  const handleLightboxChange = useCallback((open: boolean) => {
    setShowLightbox(open)
    if (!open) {
      // For lightbox dialog video
      const dialogVideo = document.querySelector('.dialog-content video')
      if (dialogVideo instanceof HTMLVideoElement) {
        dialogVideo.pause()
      }
      
      // For main video - resume autoplay if in lightbox mode without covers
      if (mode === 'lightbox' && !imgCover && !vidCover && videoRef.current && !manuallyPaused && isInView) {
        setIsMuted(true) // Ensure video is muted when resuming
        videoRef.current.play().catch(() => {})
        setIsPlaying(true)
      }
    }
  }, [mode, imgCover, vidCover, manuallyPaused, isInView])

  const handleFullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Try to use the video element directly for fullscreen on mobile
    const videoElement = videoRef.current
    const containerElement = containerRef.current
    
    if (!videoElement || !containerElement) return
    
    if (!document.fullscreenElement) {
      // Try different approaches for fullscreen, starting with the container
      try {
        // Try standard fullscreen API on the container first (works on desktop)
        containerElement.requestFullscreen().then(() => {
          setIsFullscreen(true)
        }).catch((err) => {
          console.log("Container fullscreen failed, trying video element", err);
          
          // If container fullscreen fails, try with the video element directly (better for mobile)
          if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen().then(() => {
              setIsFullscreen(true)
            }).catch(err => {
              console.error(`Video fullscreen failed: ${err.message}`);
            });
          } 
          // iOS Safari and some mobile browsers need webkitEnterFullscreen
          else if ((videoElement as any).webkitEnterFullscreen) {
            (videoElement as any).webkitEnterFullscreen();
            setIsFullscreen(true);
          }
          // Fallback for older iOS
          else if ((videoElement as any).webkitRequestFullscreen) {
            (videoElement as any).webkitRequestFullscreen();
            setIsFullscreen(true);
          }
        });
      } catch (err) {
        console.error("Error with fullscreen:", err);
        
        // Direct attempt with video element if the first approach throws
        try {
          if ((videoElement as any).webkitEnterFullscreen) {
            (videoElement as any).webkitEnterFullscreen();
            setIsFullscreen(true);
          } else if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
            setIsFullscreen(true);
          }
        } catch (finalErr) {
          console.error("All fullscreen attempts failed:", finalErr);
        }
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false)
        }).catch(err => {
          console.error(`Error exiting fullscreen: ${err.message}`);
        });
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, [])

  // Handle visibility changes
  useEffect(() => {
    if (!videoRef.current || !autoPlay || mode === 'lightbox' || !hasInteracted) return

    if (isInView && !manuallyPaused) {
      videoRef.current.play().catch((error) => {
        console.error('Video playback failed:', error)
        // Show the fallback image if video fails to play
        if (mode === 'bg' && imgCover) {
          const img = containerRef.current?.querySelector('img')
          img?.classList.add('video-failed')
        }
      })
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isInView, autoPlay, mode, manuallyPaused, imgCover, hasInteracted])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Render helpers
  const renderOverlay = () => {
    if (!overlay) return null

    // Show overlay content when:
    // 1. Any cover (video or image) is showing (!hasInteracted)
    // 2. Main video is paused (hasInteracted && !isPlaying)
    const shouldShowOverlayContent = !hasInteracted || (hasInteracted && !isPlaying)
    
    // Show overlay background when:
    // 1. In bg mode OR
    // 2. Video is not playing (either not interacted or paused)
    const shouldShowOverlayBg = mode === 'bg' || !hasInteracted || !isPlaying

    // Hide overlay background when showing cover image
    const showingCoverImage = !hasInteracted && imgCover && !vidCover

    return (
      <>
        {/* Overlay background - hidden when showing cover image or when video is playing in inline/lightbox mode */}
        {!showingCoverImage && (
          <div 
            className={`absolute inset-0 pointer-events-none blend-screen blend-soak transition-opacity duration-700 z-[51] ${shouldShowOverlayBg ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundColor: overlay.color || 'black',
              opacity: shouldShowOverlayBg ? (overlay.opacity || 0.5) : 0,
              backgroundImage: overlay.pattern ? `url(${overlay.pattern})` : 'none',
              transitionProperty: 'opacity',
              transitionDuration: '700ms',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        )}
        {/* Overlay content - always above bg when visible */}
        {overlay.content && (
          <div 
            className={`absolute inset-0 z-[53] pointer-events-none transition-opacity duration-700 ${shouldShowOverlayContent ? 'opacity-100' : 'opacity-0'} ${overlay.classes || ''}`}
            dangerouslySetInnerHTML={{ __html: overlay.content }}
          />
        )}
      </>
    )
  }

  const renderControls = () => {
    // Don't show in bg or lightbox mode
    if (mode === 'bg' || mode === 'lightbox') return null
    
    // Only show when no cover is displayed
    const hasCover = !hasInteracted && (vidCover || imgCover)
    if (hasCover) return null

    return (
      <>
        <div className="mute-indicator absolute top-4 right-4 flex gap-2 z-[53]">
          <button
            onClick={handleMute}
						aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="regular p-2 text-white/80 hover:text-white transition-colors"
          >
            {isMuted ? (
              <div className="transform transition-all duration-300 animate-in-from-top">
                <VolumeX />
              </div>
            ) : (
              <div className="transform transition-all duration-30 animate-in-from-bottom">
                <Volume />
              </div>
            )}
          </button>
        </div>
        
        <div className="fullscreen-indicator absolute bottom-4 right-4 flex gap-2 z-[53]">
          <button
            onClick={handleFullscreen}
						aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            className="regular p-2 text-white/80 hover:text-white transition-colors"
          >
            {isFullscreen ? (
              <div className="transform transition-all duration-300 animate-in-from-top">
                <Minimize />
              </div>
            ) : (
              <div className="transform transition-all duration-300 animate-in-from-bottom">
                <Maximize />
              </div>
            )}
          </button>
        </div>
      </>
    )
  }

  const renderPlayButton = () => {
    if (mode === 'bg') return null

    const handleClick = (e: React.MouseEvent) => {
      if (mode === 'lightbox') {
        handleLightboxOpen(e)
        return
      }

      if (!hasInteracted) {
        handleFirstInteraction(e)
      } else {
        handlePlayPause(e)
      }
    }

    // Always show play button before first interaction or when video is paused after interaction
    const showPlayButton = !hasInteracted || (hasInteracted && !isPlaying)

    return (
      <button
        onClick={handleClick}
				aria-label={isPlaying ? 'Pause' : 'Play'}
        className="regular absolute inset-0 flex items-center justify-center z-[52] bg-black/20 hover:bg-black/30 transition-colors group"
      >
        {showPlayButton && (
          <div className="p-4 w-20 h-20 max-md:w-12 max-md:h-12 group-hover:scale-110 transition bg-[url('/videos/play.png')] bg-center bg-no-repeat bg-contain">
            {/* <Play size={120} className="text-white" /> */}
          </div>
        )}
      </button>
    )
  }

  const renderLightbox = () => {
    if (mode !== 'lightbox') return null

    return (
      <Dialog open={showLightbox} onOpenChange={handleLightboxChange}>
				<DialogTitle className='hidden'>
					Video
				</DialogTitle>
        <DialogContent className="max-w-6xl h-[80vh] p-0 bg-black">
          <DialogClose className="regular absolute top-4 right-4 p-2 text-white hover:text-gray-300 z-10">
            <X size={24} />
          </DialogClose>
          <div className="w-full h-full flex items-center justify-center">
            <video
              key={url} // Force video element recreation when url changes
              src={url}
              className="w-full h-full object-contain"
              controls
              autoPlay
              playsInline
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <div 
        ref={containerRef}
        className={`relative overflow-hidden w-full h-full ${wrapperClasses}`}
      >
        {((mode === 'inline' || mode === 'lightbox') && !hasInteracted) ? (
          vidCover ? (
            <video 
              src={vidCover}
              className={`absolute inset-0 w-full h-full object-cover z-[50] transition-opacity duration-1000 ${hasInteracted ? 'opacity-0' : 'opacity-100'}`}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : imgCover ? (
            <LoadImage
              src={imgCover.url}
							width={1920}
							height={1080}
              alt={imgCover.alt || ''}
              className="absolute inset-0 w-full h-full object-cover z-[50]"
            />
          ) : null
        ) : null}
        
        {/* For bg mode, show imgCover only if video fails to load */}
        {mode === 'bg' && imgCover && (
          <LoadImage
            src={imgCover.url}
						width={1920}
						height={1080}
            alt={imgCover.alt || ''}
            className="absolute inset-0 w-full h-full object-cover opacity-0 [&.video-failed]:opacity-100 transition-opacity duration-300"
            // onError={(e) => {
            //   e.currentTarget.classList.add('video-failed')
            // }}
          />
        )}
        
        <video
          ref={videoRef}
          src={currentSource}
          className={`w-full h-full object-cover ${videoClasses}`}
          muted={isMuted}
          loop
          playsInline
          autoPlay={autoPlay && (mode !== 'lightbox' || (!imgCover && !vidCover))}
          controls={false}
          preload={hasInteracted ? 'auto' : 'none'}
        >
          {captions && (
            <track
              default
              kind="captions"
              srcLang="en"
              src={captions}
              label="English"
            />
          )}
        </video>
        {renderOverlay()}
        {renderControls()}
        {renderPlayButton()}
      </div>
      {renderLightbox()}
    </>
  )
}

export default VideoComponent
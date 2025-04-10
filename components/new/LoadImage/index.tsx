'use client'
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

type SafeNumber = number | `${number}`

type TButtonProps = {
  src: string,
  width: SafeNumber | undefined,
  height: SafeNumber | undefined,
  realDimmensions?: boolean,
  quality?: SafeNumber | undefined,
  sizes?: string,
  alt: string,
  title?: string,
  className?: string,
  onClick?: Function,
  placeholder?: "blur" | "empty" | undefined,
  blurDataURL?: string,
  priority?: boolean,
  noloader?: boolean,
  loading?: 'eager' | 'lazy' | undefined,
  bg?: boolean,
  contain?: boolean,
  theme?: "light" | "dark" | undefined,
  fixed?: boolean,
  animation?: "reveal-up" | "reveal-down" | "reveal-left" | "reveal-right" | "fade" | "fade-fast" | "none" | undefined,
}

export const LoadImage = ({
  src,
  width,
  height,
  realDimmensions = false,
  quality = 75,
  sizes,
  alt = "",
  title,
  className: classes,
  placeholder,
  blurDataURL,
  priority,
  loading = "lazy",
  noloader = false,
  bg,
  contain = false,
  theme = "dark",
  animation = "fade",
  fixed = false
}: TButtonProps) => {
  const [isLoading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current
        setContainerSize({ width: offsetWidth, height: offsetHeight })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const adjustedWidth: number = containerSize.height * (Number(width) || 1) / (Number(height) || 1)
  const realSize = Math.max(containerSize.width, Math.floor(adjustedWidth))

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${classes ? classes : ''} ${bg ? 'absolute w-full h-full inset-0' : ''}`}
      style={realDimmensions ? { aspectRatio: `${width}/${height}` } : {}}
    >
      <Image
        src={src}
        width={Number(width)}
        height={Number(height)}
        quality={Number(quality)}
        sizes={realSize > 0 && !sizes ? `${Math.round(realSize)}px` : sizes || '0px'}
        alt={alt || 'background asset'}
        title={title}
        placeholder={placeholder}
        blurDataURL={placeholder && blurDataURL ? blurDataURL : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgACAAIAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A5GS4g0OK1ayRpGAPnSN0PtRRRUxpxkryHKpKLtFn/9k='}
        priority={priority}
        loading={!priority ? loading : 'eager'}
        className={`
          w-full h-full max-h-[calc(100svh_+_50vw)]
          ${animation === "fade" ? 'transition duration-1000 opacity-0' : ''}
          ${animation === "fade" && !isLoading ? 'opacity-100' : ''}
          ${animation === "fade-fast" ? 'transition duration-300 opacity-0' : ''}
          ${animation === "fade-fast" && !isLoading ? 'opacity-100' : ''}
          ${contain ? 'object-contain' : 'object-cover'} object-center
          ${fixed ? 'bg-fixed' : ''}
        `}
        onLoad={() => setLoading(false)}
      />
      {animation !== "fade" && animation !== 'none' && (
        <div 
          className={`cover
            z-80 absolute top-0 left-0 w-full h-full
            transition duration-1000 ease-in-out
            ${animation === 'reveal-up' ? isLoading ? 'translate-y-0' : 'translate-y-[-100%]' : ''}
            ${animation === 'reveal-down' ? isLoading ? 'translate-y-0' : 'translate-y-[100%]' : ''}
            ${animation === 'reveal-left' ? isLoading ? 'translate-x-0' : 'translate-x-[-100%]' : ''}
            ${animation === 'reveal-right' ? isLoading ? 'translate-x-0' : 'translate-x-[100%]' : ''}
          `}
        />
      )}
      {!noloader && (
        <div 
          className={`loader z-100 absolute top-0 left-0 w-full h-full bg-no-repeat bg-center transition-opacity duration-1000 ease-in-out delay-1000
            ${theme === 'dark' ? 'bg-loader-dark opacity-50' : 'bg-loader-light'}
            ${!isLoading ? 'bg-none hidden' : ''}
          `}
        />
      )}
    </div>
  )
}
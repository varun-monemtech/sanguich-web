'use client'
import cn from "classnames"
import './style.scss'
import Image from "next/image"
import { useState } from "react"

type SafeNumber = number | `${number}`

interface ButtonProps {
	src: string,
	width: SafeNumber | undefined,
	height: SafeNumber | undefined,
	quality: SafeNumber | undefined,
	alt: string,
	className?: string,
	onClick?: Function,
	placeholder?: "blur" | "empty" | undefined,
	blurDataURL?: string,
	priority?: boolean
}

export const LoadImage = ({ src, width, height, quality, alt, className: classes, placeholder, blurDataURL, priority }: ButtonProps) => {
	const [isLoading, setLoading] = useState(true)

	return (
		<>
			<Image
				src={src}
				width={width}
				height={height}
				quality={quality}
				alt={alt}
				placeholder={placeholder}
				blurDataURL={placeholder && blurDataURL ? blurDataURL : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgACAAIAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A5GS4g0OK1ayRpGAPnSN0PtRRRUxpxkryHKpKLtFn/9k='}
				priority={priority}
				className={cn('media-with-loading', {
						[`${classes}`]: classes,
					},
					isLoading
						? 'grayscale blur-xl scale-110'
						: 'grayscale-0 blur-0 scale-100'
				)}
				onLoadingComplete={() => setLoading(false)}
			/>
			<div className={cn('loading-media z-0', 
				isLoading
					? null
					: 'loaded'
			)}
			/>
		</>
	)
}
'use client'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import './style.scss'
import Image from 'next/image'


// Convert time to readable format
// function convertTime(time) {
// 	let minutes = Math.floor(time / 60)
// 	let seconds = Math.floor(time - minutes * 60)
// 	let minuteValue
// 	let secondValue

// 	if (minutes < 10) {
// 		minuteValue = '0' + minutes
// 	} else {
// 		minuteValue = minutes
// 	}

// 	if (seconds < 10) {
// 		secondValue = '0' + seconds
// 	} else {
// 		secondValue = seconds
// 	}

// 	let mediaTime = minuteValue + ':' + secondValue

// 	return mediaTime
// }

// Prepare time UI
// function setTime(media) {
// 	if(media) {

// 		let current = convertTime(media.currentTime)
// 		let total = convertTime(media.duration)
		
// 		let timeUi = `${current} / ${total}`

// 		return timeUi

// 	}
// }

function HTMLVideo(props) {
	const player = useRef(null)
	const [io, ioInView] = useInView({ triggerOnce: false })

	//const [currentTime, setCurrentTime] = useState('00:00')
	const [isPlaying, setIsPlaying] = useState(false)
	const [isMuted, setIsMuted] = useState(true)
	const hover = props.hover ? props.hover : false
	const hideVolumeButton = props.hideVolumeButton ? props.hideVolumeButton : false

	const {
		onMobile,
		file,
		fileResponsive,
		image,
		imageResponsive,
		alt,
		mode,
		caption,
		captionClasses,
		parallaxFrom,
		parallaxTo,
		bgOverlayColor,
		bgOverlay,
		disableInteraction,
		track
	} = props



	// Animations
	const baseDuration = 500

	// Play
	const vPlay = useCallback(() => {
    player?.current?.play().catch((e)=>{
			console.log('video play error', e)
	 	})
		setIsPlaying(true)
  }, [player])

	// Pause
	const vPause = useCallback(() => {
		if(!disableInteraction) {
			player?.current?.pause()
			setIsPlaying(false)
		}
  }, [player,disableInteraction])

	// Play when in view
	useLayoutEffect(() => {
		ioInView && !hover ? vPlay() : vPause()
	},[ioInView,hover,vPlay,vPause])

	// Play from beginning
	function vHoverPlay() {
		player?.current?.play().catch((e)=>{
			console.log('video play error', e)
		})
		// player.current.currentTime = 0 
		setIsPlaying(true)
	}

	// Toggle Reveal
	function vReveal(e) {
		if(!disableInteraction) {
			vPlay()
			if(!props.permamute) {
				vMute()
			}
			if(isMuted) {
				player.current.currentTime = 0
			}
		}
	}
	
	// Mute / Unmute
	function vMute() {
		if(!disableInteraction) {
			setIsMuted(!isMuted)
		}
	}

	// Pause and Restart
	function vHoverPause() {
		if(!disableInteraction) {
			player?.current?.pause()
			// player.current.currentTime = 0 
			setIsPlaying(false)
		}
	}
	
	// Time
	// useLayoutEffect(() => {
	// 	const timeupdate = (e) => {
	// 		setCurrentTime(setTime(e.target.currentTime))
  //   }
	// 	player?.current?.addEventListener('timeupdate', timeupdate)

	// 	return () => player?.current?.removeEventListener('timeupdate', timeupdate)
	// },[])

	const source = file + '#t=0.1'
	const sourceResponsive = fileResponsive + '#t=0.1'

	const url = 
		fileResponsive && ((onMobile && mode === 'bg') || (onMobile && (mode === 'inline' && isMuted)) || mode === 'lightbox' || (mode === 'inline' && isMuted)) ?
			sourceResponsive
		:
			source

	useLayoutEffect(() => {
		//player.current.load()
		const delay = setTimeout(() => {
			player.current.play().catch((e)=>{
				console.log('video play error', e, url)
				})
		}, 50)

		return () => clearTimeout(delay)
	},[url])

	return (
		<>
			{file || image ?
				<div ref={io} className={`video-html-wrap inview ${isPlaying ? 'is-playing' : 'is-not-playing'} ${props.className} ${mode !== 'bg' ? 'interactive' : ''}`} onClick={(e) => vReveal(e)} role="presentation">
					{/* <button onClick={vPlay}>play</button> */}
					{/* <button onClick={vPause}>pause</button> */}
					{/* <button onClick={vMute}>sound is {isMuted ? 'off' : 'on'}</button> */}
					{/* {currentTime} | {isPlaying ? 'playing' : 'not playing'} */}
					<div className={`mute-indicator ${hideVolumeButton || disableInteraction ? 'hide' : ''}`} onClick={vMute} role="presentation">
						{
							isMuted ?
							<div className="muted-on animate-in-from-top">
								<svg viewBox="0 0 32 32">
									<g>
										<rect x="24.8" y="10" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -3.7396 22.9129)" width="2" height="12"/>
										<rect x="19.8" y="15" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -3.7396 22.9129)" width="12" height="2"/>
									</g>
									<path d="M19.8,2.6l-11.5,8H2.7v10.7h5.6l11.5,8.3V2.6z"/>
								</svg>
							</div> :
							<div className="muted-off animate-in-from-bottom">
								<svg viewBox="0 0 24 32">
									<path d="M19.8,2.6l-11.5,8H2.7v10.7h5.6l11.5,8.3V2.6z"/>
								</svg>
							</div>
						}
					</div>

					{ parallaxFrom && parallaxFrom !== 0 && parallaxTo && parallaxTo !== 0 ?
						// <Parallax className="parallax" translateY={[parallaxFrom, parallaxTo]}>
							<div className='parallax-inner' style={{
								height: 100 + (Math.abs(parallaxFrom) + Math.abs(parallaxTo)) * 0.5 + '%'
							}}>
								{/* <Intro switch={url} in={{fade: 500}} delayIn={0} mounted={true} stay={true} className="switch-intro"> */}
									{ imageResponsive || image ?
										<Image
											width={img.width}
											height={img.height}
											src={img.url}
											alt={img.alt}
										/>	
									: null }
									<video
										src={url}
										controls={props.showControls}
										ref={player}
										muted={isMuted ? true : null}
										onTouchStart={() => hover ? vHoverPlay() : null}
										onMouseEnter={() => hover ? vHoverPlay() : null}
										onMouseLeave={() => hover ? vHoverPause() : null}
										onTouchEnd={() => hover ? vHoverPause() : null}
										loop
										playsInline
										disablePictureInPicture
										allow="autoplay"
									>
										{track ?
											<track
												default
												kind="captions"
												srcLang="en"
												src={null}
											/>
										: null }
									</video>
								{/* </Intro> */}
							</div>
						// </Parallax>
					:
						<>
							{/* <Intro switch={url} in={{fade: 500}} delayIn={0} mounted={true} stay={true} className="switch-intro"> */}
								{ imageResponsive || image ?
									<Image
										width={img.width}
										height={img.height}
										src={img.url}
										alt={img.alt}
									/>
								: null }
								<video
									src={url}
									controls={props.showControls}
									ref={player}
									muted={isMuted ? true : null}
									onTouchStart={() => hover ? vHoverPlay() : null}
									onMouseEnter={() => hover ? vHoverPlay() : null}
									onMouseLeave={() => hover ? vHoverPause() : null}
									onTouchEnd={() => hover ? vHoverPause() : null}
									loop
									playsInline
									disablePictureInPicture
									allow="autoplay"
								>
									{track ?
										<track
											default
											kind="captions"
											srcLang="en"
											src={null}
										/>
									: null }
								</video>
							{/* </Intro> */}
						</>
					}

					{/* <Transition
						in={mode === 'inline' && isMuted }
						timeout={baseDuration}
						appear={true}
						onEntering={fadeIn}
						onExiting={fadeOut}
						mountOnEnter={true}
					>
						<>
						<div className="cover blend-screen blend-soak">
							<div className="video-overlay-play bg-overlay overlay"></div>
							<SanityOverlay bgOverlayColor={bgOverlayColor} bgOverlay={bgOverlay} />
						</div>
						</>
					</Transition> */}

					{
						caption ? 
							<div className={`caption-video ${captionClasses ? captionClasses : ''}`}>
								<div
									dangerouslySetInnerHTML={{ __html: props.code }}
								/>
							</div>
						:
						null
					}

					{props.children}

					{/* {mode !== 'inline' ?
						<SanityOverlay bgOverlayColor={bgOverlayColor} bgOverlay={bgOverlay} />
					: null } */}

				</div>
			: null }
		</>
	)
}

export default HTMLVideo
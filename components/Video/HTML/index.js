'use client'
import React, { useEffect, useRef, useState } from 'react'

import './style.scss'
import { useInView } from 'react-intersection-observer'

import Image from 'next/image'
import { Parallax } from 'react-scroll-parallax'
import { Transition } from 'react-transition-group'
import anime from 'animejs'

// Convert time to readable format
function convertTime(time) {
  let minutes = Math.floor(time / 60)
  let seconds = Math.floor(time - minutes * 60)
  let minuteValue
  let secondValue

  if (minutes < 10) {
    minuteValue = '0' + minutes
  } else {
    minuteValue = minutes
  }

  if (seconds < 10) {
    secondValue = '0' + seconds
  } else {
    secondValue = seconds
  }

  let mediaTime = minuteValue + ':' + secondValue

  return mediaTime
}

// Prepare time UI
function setTime(media) {
  if (media) {

    let current = convertTime(media.currentTime)
    let total = convertTime(media.duration)

    let timeUi = `${current} / ${total}`

    return timeUi

  }
}

function Vimeo(props) {
  const player = useRef(null)
  const [io, ioInView] = useInView({ triggerOnce: false })

  const [currentTime, setCurrentTime] = useState('00:00')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  // Animations
  const baseDuration = 250
  // Animating fade in/out
  const fadeIn = element => {
    anime
      .timeline()
      .add({
        targets: element,
        opacity: [0, 1],
        duration: baseDuration,
        easing: 'cubicBezier(.5,.08,.54,.9)',
      })
  }
  const fadeOut = element => {
    anime
      .timeline()
      .add({
        targets: element,
        opacity: [1, 0],
        duration: baseDuration,
        easing: 'cubicBezier(.5,.08,.54,.9)'
      })
  }

  // Play when in view
  useEffect(() => {
    ioInView && props.autoplay ? vPlay() : vPause(); setIsMuted(true);
  }, [ioInView])

  // Toggle Play
  function vToggle(e) {
    isPlaying ? player.current.pause() : player.current.play()
    vMute()
    setIsPlaying((old) => !old)
  }

  // Toggle Reveal
  function vReveal(e) {
    vPlay()
    vMute()
    if (isMuted) { player.current.currentTime = 0 }
  }

  // Play
  function vPlay() {
    player.current.play()
    setIsPlaying(true)
  }

  // Mute / Unmute
  function vMute() {
    setIsMuted(!isMuted)
  }

  // Pause
  function vPause() {
    player.current.pause()
    setIsPlaying(false)
  }

  // Time
  useEffect(() => {
    player.current.addEventListener('timeupdate', () => { setCurrentTime(setTime(player.current)) })
  }, [])


  return (
    <div ref={io} className='video-vimeo-wrap' onClick={(e) => vReveal(e)}>
      {/* <div className="controls"><button onClick={vPlay}>play</button><button onClick={vPause}>pause</button><button onClick={vMute}>sound is {isMuted ? 'off' : 'on'}</button>{currentTime} | {isPlaying ? 'playing' : 'not playing'}</div> */}
      <video ref={player} muted={isMuted ? true : null} loop playsInline disablePictureInPicture allow="autoplay">
        <source src={props.file} type="video/mp4" />
        <track
          default kind="captions"
          srcLang="en"
          src="none.vtt" />
      </video>

      <Transition
        in={props.revealonclick && isMuted}
        timeout={baseDuration}
        appear={true}
        onEntering={fadeIn}
        onExiting={fadeOut}
        mountOnEnter={true}
      >
        <div className="cover" style={{ opacity: '0.5', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          {/* <Parallax className="hola-parallax" y={[-20, 20]} tagOuter="figure">
						<Img fluid={props.placeholder}
							imgStyle={{objectFit: 'cover'}}
							objectPosition='50% 50%' />
					</Parallax> */}
          <div className="hola bg-overlay overlay"></div>
        </div>
      </Transition>
    </div>
  )
}

export default Vimeo
'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from "framer-motion"
import './style.scss'

type TIntro = {
	children?: any,
	cover?: boolean,
	frame?: boolean,
	bg?: boolean,
	id?: string,
	className?: string,
	contentClassName?: string,
	stay?: boolean,
	visible?: boolean | null,
	delay?: number,
}

export default function Intro({
	children,
	cover = false,
	frame = false,
	bg = false,
	id,
	className: classes = 'no-additional-classes',
	contentClassName: contentClasses = 'no-additional-classes',
	stay = true,
	visible: _visible = null,
	delay = 0,
}: TIntro ) {

	const ref = useRef<HTMLDivElement | null>(null)

	// Inview
  const isInView = useInView(ref, {once: stay})

	// Visibility - load in/out trigger
	const [visible, setVisible] = useState(false)

	// Add potential delays to visibility and overriding inview
	useEffect(() => {
		const timeout = setTimeout(() => {
			setVisible(_visible !== null ? _visible : isInView)
		}, delay)
		timeout
		if(!_visible) {
			return () => clearTimeout(timeout)
		}
	}, [isInView, delay, _visible])

  return (
		<div
			ref={ref}
			id={id}
			className={`intro
				relative overflow-hidden
				${visible ? 'in-view' : 'not-in-view'}
				${classes ? classes : ''}
		`}>

			<div
				className={`
					content transition-[opacity,transform,left,right,top,bottom,visibility,color,background-color,background-image,background-position,background-size,border-radius]
					z-100
					block
					${contentClasses}
				`}
			>
				{children}
			</div>

			{cover &&
				<div
					className={`
						cover
						z-200 absolute inset-0 w-full h-full
						transition
					`}
				/>
			}

			{bg &&
				<div
					className={`
						bg
						-z-10 absolute inset-0 w-full h-full
						transition
					`}
				/>
			}

			{frame &&
				<>
					<div
						className={`
							frame frame-x frame-l
							z-200 absolute
							block left-0 top-0 w-[2px] h-full
							transition
						`}
					/>
					<div
						className={`
							frame frame-x frame-r
							z-200 absolute right-0 top-0 w-[2px] h-full
							transition
						`}
					/>
					<div
						className={`
							frame frame-y frame-t
							z-200 absolute left-0 top-0 w-full h-[2px]
							transition
						`}
					/>
					<div
						className={`
							frame frame-y frame-b
							z-200 absolute right-0 bottom-0 w-full h-[2px]
							transition
						`}
					/>
				</>
			}

		</div>
  )
}
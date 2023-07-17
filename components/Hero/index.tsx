import cn from "classnames"
import './style.scss'

interface HeroProps {
	className?: string,
	children: React.ReactNode
}

interface HeroElementProps {
	children: React.ReactNode
}

// Optional components - main hero title
export const HeroTitle = ({ children }: HeroElementProps) => {
	return <h1 className="relative z-200 title">{children}</h1>
}

// Optional components - main hero sub-title
export const HeroSubTitle = ({ children }: HeroElementProps) => {
	return <h2 className="relative z-200 subtitle">{children}</h2>
}

export const Hero = ({ className: classes, children }: HeroProps) => {
	return (
		<section
			className={cn('hero', {
				[`${classes}`]: classes,
			})}
		>
			<div className="flex">
				{children}
			</div>
		</section>
	)
}
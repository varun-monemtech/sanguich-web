import LoadTransition from '../../animations/LoadTransition'
import './style.scss'

interface BackgroundProps {
	children: React.ReactNode
}

export const Background = ({ children }: BackgroundProps) => {
	return (
		<div className="bg inset-0">
			<LoadTransition className="media z-10">
				{children}
			</LoadTransition>
			<div className="loading-media z-0"></div>
		</div>
	)
}
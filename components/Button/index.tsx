import cn from "classnames"
import Link from "next/link"
import { cva, VariantProps } from 'class-variance-authority'
import './style.scss'

interface ButtonProps extends VariantProps<typeof buttonClasses> {
	children: React.ReactNode,
	onClick?: Function,
	className?: string,
	href?: string,
	formMethod?: string,
	value?: string
}

const buttonClasses = cva('rounded-full', {
	variants: {
		variant: {
			primary: 'bg-primary-gradient group-hover:bg-primary-gradient-variant group-hover:shadow-primary text-white group-hover:text-gray-100 group-active:text-gray-200 group-hover:top-[1px] group-active:top-[2px] relative',
			secondary: 'bg-secondary-gradient group-hover:bg-secondary-gradient-variant group-hover:shadow-secondary text-white group-hover:text-gray-100 group-active:text-gray-200 group-hover:top-[1px] group-active:top-[2px] relative',
			complimentary: '',
		},
		size: {
			small: 'text-sm px-3 py-1-5',
			medium: 'text-md px-4 py-2',
			large: 'text-lg px-6 py-3'
		}
	},
	defaultVariants: {
		variant: 'primary',
		size: 'medium'
	}
})

// // Optional components - main hero title
// export const HeroTitle = ({ children }: HeroElementProps) => {
// 	return <h1 className="relative z-200">{children}</h1>
// }

// // Optional components - main hero sub-title
// export const HeroSubTitle = ({ children }: HeroElementProps) => {
// 	return <h2 className="relative z-200 text-lg">{children}</h2>
// }

export const Button = ({ href, onClick, formMethod, value, className: classes, children, variant, size }: ButtonProps) => {
	return  href ? (
		<Link
			href={href}
			onClick={() => onClick ? onClick() : false}
			className={cn('frs-btn relative inline-flex items-center no-underline group [&_span]:transition-colors', {
				[`${classes}`]: classes,
			})}
		>
			<span
				className={buttonClasses({ variant, size })}
			>
				{children}
			</span>
		</Link>
	) : (
		<button
			onClick={() => onClick ? onClick() : false}
			className={cn('frs-btn relative inline-flex items-center no-underline group [&_span]:transition-colors', {
				[`${classes}`]: classes,
			})}
			formMethod={formMethod}
			value={value}
		>
			<span
				className={buttonClasses({ variant, size })}
			>
				{children}
			</span>
		</button>
	)
}
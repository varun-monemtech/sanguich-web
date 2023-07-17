'use client'

import { motion } from 'framer-motion'

export default function LoadTransition({ className: classes, children }: {className?: string, children: any }) {
	
	return (
		<motion.div
			className={classes}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: .35 }}
		>
			{children}
		</motion.div>
	)
}
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: {children: any }) {
	const pathname = usePathname()
	
	return (
		<AnimatePresence mode='wait'>
			<motion.div
				key={pathname}
				// initial={{ opacity: 0, y: 20 }} this stops initial page load yuck
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{
					duration: .5,
					type: "spring",
					stiffness: 140,
					damping: 20
				}}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}
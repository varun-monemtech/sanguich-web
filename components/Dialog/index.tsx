'use client'
import { useEffect, useRef, useState } from 'react'
import './style.scss'
import { createPortal } from 'react-dom'

const PortalDialog = ({ children }: { children: React.ReactNode }) => {
	const ref = useRef<Element | null>(null)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		ref.current = document.querySelector<HTMLElement>("#portal-dialog")
		setMounted(true)
	}, [])

	return (mounted && ref.current) ? createPortal(<div>{children}</div>, ref.current) : null
}

export const Dialog = ({ __ref, children }: { __ref: any, children: React.ReactNode}) => {

	return (
		<PortalDialog>
			<dialog
				ref={__ref}
				onSubmit={(event) => {
					const formData = new FormData(event.target as HTMLFormElement)
					console.log(formData.get('test-input'))
				}}
				onClick={(event) => {
					const target = event.target as HTMLDialogElement
					if (target.nodeName === 'DIALOG') {
						target.close()
					}
				}}
				onClose={(event) => {
					const target = event.target as HTMLDialogElement
					console.log(target.returnValue)
				}}
				className='frs-dialog x0'
			>
				<button
					type="button"
					onClick={() => __ref?.current?.close()}
					className='close c1 hover-c2'
				>
					<span className="sr-only">close</span> &times;
				</button>
				
				<div className="frs-dialog-children-wrap">
					{children}
				</div>

			</dialog>
		</PortalDialog>
	)
}
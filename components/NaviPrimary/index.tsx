'use client'
import React, { useContext, useRef } from 'react'
import './style.scss'
import Link from 'next/link'
import { Button } from '../Button'
import NaviContext from '../../context/NaviContext'
import cn from 'classnames'
import { Dialog } from '../Dialog'


// import Logo from '../Logo'

export const NaviPrimary = ({ children, items, className: classes }: { children?: React.ReactNode, items: any, className?: string}) => {
	const naviContext: any = useContext(NaviContext)

	const dialogRef = useRef<HTMLDialogElement>(null)
	const dialogRef2 = useRef<HTMLDialogElement>(null)

	const itemsLinks = items?.map((item: any, i:number) => {
		return (
			<li key={`navi-primary-item-${i}`}>
				<Link
					href={`/post/${item.slug}`}
				>
						{item.title.rendered}
				</Link>
			</li>
		)
	})

  return (
		<nav
			className={cn('navi-wrapper primary fs-85', {
				[`${classes}`]: classes,
				[`open`]: naviContext.isActive,
			})}
		>
			<ul>
				<li>
					<Link
						href={`/`}
					>
						home
					</Link>
				</li>
				<li>
					<Link
						href={`/blog/`}
					>
						blog
					</Link>
				</li>
				{/* {itemsLinks} */}
				{/* <li>
					<Button
						variant="secondary"
						size="small"
						className='pr-1 pl-1'
						onClick={() => dialogRef?.current?.showModal()}
					>
						Sign Up
					</Button>
					<Dialog __ref={dialogRef}>
						<h3>This is a Sign Up Dialog</h3>
						<form method="dialog" action="">
							<input type="text" className='mb-4' name="test-input" />
							<Button
								variant="secondary"
								size="medium"
								className='mr-1'
								formMethod='dialog'
								value='cancel'
							>
								Cancel
							</Button>
							<Button
								variant="primary"
								size="medium"
								formMethod='dialog'
								value='submit'
							>
								Submit
							</Button>
						</form>
					</Dialog>
				</li> */}
				{/* <li>
					<Button
						variant="primary"
						size="small"
						className='pr-2 pl-0'
						onClick={() => dialogRef2?.current?.showModal()}
					>
						Log In
					</Button>
					<Dialog __ref={dialogRef2}>
						<h3>This is a Log In Dialog</h3>
						<form method="dialog" action="">
							<input type="text" className='mb-4' name="test-input" />
							<Button
								variant="secondary"
								size="medium"
								className='mr-1'
								formMethod='dialog'
								value='cancel'
							>
								Cancel
							</Button>
							<Button
								variant="primary"
								size="medium"
								formMethod='dialog'
								value='submit'
							>
								Submit
							</Button>
						</form>
					</Dialog>
				</li> */}
			</ul>
		</nav>
  )
}
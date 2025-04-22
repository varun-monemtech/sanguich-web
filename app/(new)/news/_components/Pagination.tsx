import Link from "next/link";

export default function Pagination({ hasNextPage, hasPrevPage, prevLink, nextLink }:
	{ hasNextPage: boolean, hasPrevPage: boolean, prevLink: string, nextLink: string }) {
	return (
		<div className="flex justify-center gap-3 py-6">
			<Link
				href={prevLink}
				className={`${hasPrevPage ? '' : 'opacity-50 pointer-events-none'} group flex flex-row-reverse justify-center items-center gap-1 next-page uppercase font1`}
			>
				<div className="relative ">
					<div
						className={`arrow-prev-image cursor-pointer !right-0 group-hover:scale-110 ease-in-out transition-all duration-150 group-active:scale-95`}
						role="button"
						tabIndex={0}
						aria-label='Previous Tab'
					/>
				</div>
				<span className="block text-[#274F37] group-hover:opacity-80 transition-all duration-150">
					Prev
				</span>
			</Link>

			<Link
				href={nextLink}
				className={`${hasNextPage ? '' : 'opacity-50 pointer-events-none'} group flex justify-center items-center gap-1 next-page uppercase font1`}
			>
				<div className="relative">
					<div
						className={`arrow-next-image cursor-pointer !left-0 group-hover:scale-110 ease-in-out transition-all duration-150 group-active:scale-95`}
						role="button"
						tabIndex={0}
						aria-label='Next Tab'
					/>
				</div>
				<span className="block text-[#274F37] group-hover:opacity-80 transition-all duration-150">
					Next
				</span>
			</Link>
		</div>
	)
}
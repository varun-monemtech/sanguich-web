import Link from "next/link";

export default function Pagination({ hasNextPage, hasPrevPage, prevLink, nextLink }:
	{ hasNextPage: boolean, hasPrevPage: boolean, prevLink: string, nextLink: string }) {
	return (
		<div className="flex justify-center gap-3 py-6">
			{hasPrevPage ? (
				<Link
					href={prevLink}
					className="group flex flex-row-reverse justify-center items-center gap-1 next-page uppercase font1"
				>
					<div className="relative">
						<div
							className="arrow-prev-image cursor-pointer !right-0 group-hover:scale-110 ease-in-out transition-all duration-150 group-active:scale-95"
							role="button"
							tabIndex={0}
							aria-label='Previous Tab'
						/>
					</div>
					<span className="block text-[#274F37] group-hover:opacity-80 transition-all duration-150">
						Prev
					</span>
				</Link>
			) : (
				<div className="opacity-80 flex flex-row-reverse justify-center items-center gap-1 next-page uppercase font1">
					<div className="relative">
						<div
							className="arrow-prev-image !right-0"
		
						/>
					</div>
					<span className="block text-[#274F37]">
						Prev
					</span>
				</div>
			)}

			{hasNextPage ? (
				<Link
					href={nextLink}
					className="group flex justify-center items-center gap-1 next-page uppercase font1"
				>
					<div className="relative">
						<div
							className="arrow-next-image cursor-pointer !left-0 group-hover:scale-110 ease-in-out transition-all duration-150 group-active:scale-95"
							role="button"
							tabIndex={0}
							aria-label='Next Tab'
						/>
					</div>
					<span className="block text-[#274F37] group-hover:opacity-80 transition-all duration-150">
						Next
					</span>
				</Link>
			) : (
				<div className="opacity-80 flex justify-center items-center gap-1 next-page uppercase font1">
					<div className="relative">
						<div
							className="arrow-next-image !left-0"
		
						/>
					</div>
					<span className="block text-[#274F37]">
						Next
					</span>
				</div>
			)}
		</div>
	)
}
import React from 'react'
import { LoadImage } from '@/components/new/LoadImage'
import Pagination from './Pagination'
import Intro from '@/animations/Intro_Framer'

function PostTemplate({ post, hasNextPage, hasPrevPage, prevLink, nextLink }: { post: any, hasNextPage: boolean, hasPrevPage: boolean, prevLink: string, nextLink: string }) {

	return (
		<section id="post-template-new" className={` text-[#274F37] hero`}>

			<Intro className={`	
					overflow-visible
					
					[&.not-in-view_.content]:opacity-0
					[&.not-in-view_.content]:translate-y-[4rem]
					[&.in-view_.content]:opacity-100
					[&.in-view_.content]:translate-y-[0%]
					[&.in-view_.content]:ease-in-out
					[&.in-view_.content]:duration-500
			
				`}>
				<div className="relative ">
	
					<LoadImage
						src={post?.acf?.hero?.url}
						width={post?.acf?.hero?.width}
						height={post?.acf?.hero?.height}
						alt={post?.acf?.hero?.alt}
						className={'[&_img]:relative aspect-[3.62/1] rounded-[2rem]'}

					/>
				</div>
			</Intro>
			<div id="header-fold-breakpoint"></div>

			<div className="py-5 text-center">
				<Intro delay={250} className={`	
					overflow-visible
					
					[&.not-in-view_.content]:opacity-0
					[&.not-in-view_.content]:translate-y-[4rem]
					[&.in-view_.content]:opacity-100
					[&.in-view_.content]:translate-y-[0%]
					[&.in-view_.content]:ease-in-out
					[&.in-view_.content]:duration-500
			
				`}>
					<div className='max-w-4xl mx-auto [&_img]:max-w-2xl [&_img]:mx-auto '>
						<h2 className="font3 !mb-1 !mt-2 uppercase h4" dangerouslySetInnerHTML={{ __html: post?.title?.rendered }} />
						<div className=" [&_img]:relative" dangerouslySetInnerHTML={{ __html: post?.acf?.content }} />
					</div>
					{post?.acf?.video ?
								<iframe id="i_video" className='mx-auto' width="1120" height="600" src={post?.acf?.video ? post?.acf.video : null} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
						: null}
					{post?.acf?.image ?
						<div >
							<LoadImage
								src={post?.acf?.image?.url}
								width={post?.acf?.image?.width}
								height={post?.acf?.image?.height}
								alt={post?.acf?.image?.alt}
								className={'[&_img]:relative aspect-[3.62/1] my-10 rounded-[2rem]'}
							/>
						</div>
						: null}
				</Intro>
			</div>

			<Pagination
				hasNextPage={hasNextPage}
				hasPrevPage={hasPrevPage}
				prevLink={prevLink}
				nextLink={nextLink}
			/>
		</section>
	)
}

export default PostTemplate
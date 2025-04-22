import React from 'react'
import { LoadImage } from '@/components/new/LoadImage'
import Pagination from './Pagination'
import Intro from '@/animations/Intro_Framer'

function PostTemplate({ post, hasNextPage, hasPrevPage, prevLink, nextLink }: { post: any, hasNextPage: boolean, hasPrevPage: boolean, prevLink: string, nextLink: string }) {

	return (
		<section  id="post-template-new" className={`bg-[#D0C8B9] px-12 text-[#274F37] hero`}>
			<Intro className={`	
					overflow-visible
					
					[&.not-in-view_.content]:opacity-0
					[&.not-in-view_.content]:translate-y-[4rem]
					[&.in-view_.content]:opacity-100
					[&.in-view_.content]:translate-y-[0%]
					[&.in-view_.content]:ease-in-out
					[&.in-view_.content]:duration-500
			
				`}>
				<div className="relative pt-24">
					<div className="decor-wrap ">
						<div className="decor-top with-extra">
							<div className="decor-top-left"></div>
							<div className="decor-top-center with-extra">
								<div className="decor-top-center-extra-left"></div>
								<div className="decor-top-center-extra-right"></div>
							</div>
							<div className="decor-top-right"></div>
						</div>
						<div className="decor-center">
							<div className="decor-center-left"></div>
							<div className="decor-center-right"></div>
						</div>
					</div>
					<LoadImage
						src={post?.acf?.hero?.url}
						width={post?.acf?.hero?.width}
						height={post?.acf?.hero?.height}
						alt={post?.acf?.hero?.alt}
						className={'[&_img]:relative aspect-[21/5] rounded-[2rem]'}

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
					<h2 className="font3 !mb-1 !mt-2 uppercase h4" dangerouslySetInnerHTML={{ __html: post?.title?.rendered }} />
					<div className="max-w-7xl mx-auto [&_img]:relative" dangerouslySetInnerHTML={{ __html: post?.acf?.content }} />
					{post?.acf?.video ?
						<div >
							<div>
								<iframe id="i_video" width="1120" height="600" src={post?.acf?.video ? post?.acf.video : null} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
							</div>
						</div>
						: null}
					{post?.acf?.image ?
						<div >
							<LoadImage
								src={post?.acf?.image?.url}
								width={post?.acf?.image?.width}
								height={post?.acf?.image?.height}
								alt={post?.acf?.image?.alt}
								className={'[&_img]:relative aspect-[21/8] my-10 rounded-[2rem]'}
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
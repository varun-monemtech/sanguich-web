'use client'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { LoadImage } from '@/components/new/LoadImage'

function PostTemplate({ post }) {
	const [io, ioInView] = useInView({ triggerOnce: true })

	return (
		<section ref={io} id="post-template-new" className={`bg-[#D0C8B9] px-12 text-[#274F37] hero is-inview ${ioInView ? 'inview' : ''} border-type-7 `}>


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

			<div id="header-fold-breakpoint"></div>

			<div className="py-5 text-center">
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
			</div>
		</section>
	)
}

export default PostTemplate
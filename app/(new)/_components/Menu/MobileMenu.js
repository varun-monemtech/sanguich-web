'use client'
import React from 'react'
import './style.scss'
import Intro from '@/animations/Intro_Framer'
import { LoadImage } from '@/components/new/LoadImage'
import BorderHeading from '../BorderHeading'

function MobileMenu(props) {
  const anchor = props.anchor
  const classes = props.classes
  const menus = props.menus

  return (
    <>
      {/* Hidden container for preloading all menu images - position absolute to remove from flow */}
      <div style={{ display: 'none', position: 'absolute', width: '0', height: '0', overflow: 'hidden' }} aria-hidden="true">
        {menus?.map((menu, menuIndex) => (
          menu.items?.map((item, itemIndex) => {
            const image = item?.img
            return image ? (
              <img
                key={`preload-${menuIndex}-${itemIndex}`}
                src={image.url}
                alt=""
                loading="lazy"
              />
            ) : null
          })
        ))}
      </div>

      {anchor ?
        <section id={`section-${anchor}`} className={`frs-grid frs-grid-ultrawide bg-[#D0C8B9] border-type-7 ${classes}`}>
          <Intro delay={50}>
            {anchor ? <div id={anchor} className="anchor"></div> : null}

						<BorderHeading>
							<h2 className={`text-[#274F37] m-0 px-[0.1em] py-0 bg-[#D0C8B9] font2 z-[1001]`}>Menu</h2>
						</BorderHeading>
						<div className='hr-decor mx-auto' />

            <div className='content-box'>
              <div className='animated'>
                {menus.map((menu, menuIndex) => (
                  <div key={`mobile-menu-${menuIndex}`} className="menu-category mb-16 p-2">

                    <h4 className="text-center font-bold text-[1.5em] mb-6 text-[#274F37] flex items-center justify-center gap-2">
											<LoadImage
												src={"/swirl-left.png"}
												alt={"Decor"}
												className="relative w-8 h-full aspect-[144/88] contain"
												width={144}
												height={88}
												loading="lazy"
											/>
											<span className="basis-auto grow-0 uppercase text-[1.75rem]">
												{menu.title}
											</span>
											<LoadImage
												src={"/swirl-right.png"}
												alt={"Decor"}
												className="relative w-8 h-full aspect-[144/88] contain"
												width={144}
												height={88}
												loading="lazy"
											/>
										</h4>
                    
                    <div className="max-w-[50rem] mx-auto text-[#274F37] px-3 sm:px-6">
                      {menu.items.map((item, itemIndex) => {
                        if (item.subgroup) {
                          return (
                            <div key={`mobile-menu-item-${menuIndex}-${itemIndex}`} className="col-1 subgroup fs-85 mt-10 mb-3">
                              <h4 className="uppercase text-center text-[#274F37] font-semibold">{item.subgroup}</h4>
                            </div>
                          )
                        } else {
                          return (
                            <div key={`mobile-menu-item-${menuIndex}-${itemIndex}`} className="flex items-center gap-2 mb-2 last:mb-0 pb-2 border-b border-[#274F37]/20 last:border-b-0">
                              <div className="description flex-1 pr-1">
                                <h4 className="uppercase text-[1.2em] font-bold mb-1 text-[#274F37]">{item.name}</h4>
                                {item.description && (
                                  <p className="text-[0.9em] text-[#274F37]/90 max-w-prose mt-0">{item.description}</p>
                                )}
                              </div>
                              
                              {item.img ? (
                                <div className="relative w-36 h-auto aspect-[16/10] flex-shrink-0 bg-[#c0b7a8] border rounded-xl border-[#DCBA7B] overflow-hidden">
																	<LoadImage
                                    src={item.img.url}
                                    alt={item.img.alt || item.name}
                                    className="w-full h-full object-cover"
																		width={item.img.width}
																		height={item.img.height}
                                    loading="lazy"
                                  />
                                </div>
                              ) : (
                                <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-[#c0b7a8] rounded"></div>
                              )}
                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Intro>
        </section>
      : null}
    </>
  )
}

export default MobileMenu 
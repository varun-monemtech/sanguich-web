'use client'
import React, { useState, useEffect } from 'react'
import './style.scss'
import Intro from '@/animations/Intro_Framer'
import { LoadImage } from '@/components/new/LoadImage'
import BorderHeading from '../BorderHeading'
import { motion, AnimatePresence } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { SearchIcon } from 'lucide-react'

function MobileMenu(props) {
  const anchor = props.anchor
  const classes = props.classes
  const menus = props.menus
  const [openMenus, setOpenMenus] = useState([0]) // Initially open first menu category
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const [lightbox, setLightbox] = useState({ open: false, image: null })
  const [featuredItems, setFeaturedItems] = useState([])

  useEffect(() => {
    // Filter for featured items across all menu categories
    const featured = []
    menus?.forEach(menu => {
      menu.items?.forEach(item => {
        if (item.featured) {
          featured.push({...item, menuCategory: menu.title})
        }
      })
    })
    
    // For testing - if no featured items found, use the first item from each menu
    if (featured.length === 0 && menus?.length > 0) {
      menus.forEach(menu => {
        if (menu.items?.length > 0) {
          const firstItem = menu.items[0]
          featured.push({...firstItem, menuCategory: menu.title})
        }
      })
    }
    
    setFeaturedItems(featured)
  }, [menus])

  const toggleMenu = (index) => {
    if (index === 0 && !hasInteracted) {
      setHasInteracted(true)
      setShowHint(false)
    }
    
    setOpenMenus(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index)
      } else {
        return [...prev, index]
      }
    })
  }
  
  const expandMenu = () => {
    setHasInteracted(true)
    setShowHint(false)
    // Ensure menu stays open by not removing it from openMenus
  }

  const openLightbox = (image) => {
    setLightbox({ open: true, image })
  }

  const closeLightbox = () => {
    setLightbox({ open: false, image: null })
  }

  // Custom arrow components that mimic the Menu component style
  const SliderArrowPrev = (props) => {
    const { className, onClick } = props
    return (
      <div 
        className="menu-slider-arrow-prev arrow-prev cursor-pointer !-top-[2.5rem] !w-[2.5rem]" 
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label="Previous slide"
      />
    )
  }

  const SliderArrowNext = (props) => {
    const { className, onClick } = props
    return (
      <div 
        className="menu-slider-arrow-next arrow-next cursor-pointer !-top-[2.5rem] !w-[2.5rem]" 
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label="Next slide"
      />
    )
  }

  // Featured items slider settings
  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <SliderArrowNext />,
    prevArrow: <SliderArrowPrev />,
    customPaging: function(i) {
      return (
        <div className="w-2 h-2 cursor-pointer">
          <span className="block w-full h-full transition-all duration-300 rounded-full bg-[#8B8476] hover:bg-[#274F37]/50"></span>
        </div>
      );
    }
  }

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

            <div className="px-3 pt-6 sm:px-6 [&_.decor-wrap]:[filter:contrast(0.5)]">
              <BorderHeading>
                <h2 className={`text-[#274F37] m-0 px-[0.1em] py-0 bg-[#D0C8B9] font2 z-[1001]`}>Menu</h2>
              </BorderHeading>
            </div>
            <div className='hr-decor mx-auto' />

            {/* Featured Items Carousel */}
            {featuredItems.length > 0 && (
              <div className="px-3 sm:px-6 pt-4 pb-8 relative [&_.slick-list]:!pb-3">
                <h3 className="text-[#274F37] text-lg uppercase font-bold text-center mb-4">Featured Items</h3>
                <div className="featured-slider">
                  <Slider {...sliderSettings}>
                    {featuredItems.map((item, index) => (
                      <div key={`featured-item-${index}`} className="px-2 h-full">
                        <div className="rounded-xl border border-[#96896F] overflow-hidden relative h-full flex flex-col shadow-sm">
                          {item.img ? (
                            <div className="relative aspect-[16/10]" onClick={() => openLightbox(item.img)}>
                              <LoadImage
                                src={item.img.url}
                                alt={item.img.alt || item.name}
                                className="w-full h-full object-cover"
                                width={item.img.width || 400}
                                height={item.img.height || 300}
                                loading="lazy"
                              />
                              <div className="absolute bottom-1 right-1">
                                <button aria-label="Search" className="regular bg-white rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                                  <SearchIcon className="w-2 h-2" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full aspect-[16/10] bg-[#c0b7a8]"></div>
                          )}
                          <div className="p-3 flex-1 flex flex-col">
                            <h3 className="text-[#274F37] text-md font-bold uppercase mb-1">{item.name}</h3>
                            {item.description && (
                              <p className="text-[#274F37]/90 text-sm mb-0 mt-0 line-clamp-2">{item.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            )}

            <div className='content-box'>
              <div className='animated'>
                {menus.map((menu, menuIndex) => (
                  <div key={`mobile-menu-${menuIndex}`} className="menu-category">
                    <button 
                      onClick={() => toggleMenu(menuIndex)}
                      className="w-full text-center font-bold text-[1.5em] !p-1 !py-3 !bg-transparent regular text-[#274F37] !flex items-center justify-center gap-2 cursor-pointer transition-all hover:opacity-90 border-b border-[#96896F]"
                      aria-expanded={openMenus.includes(menuIndex)}
                      aria-controls={`menu-items-${menuIndex}`}
                    >
                      <LoadImage
                        src={"/swirl-left.png"}
                        alt={"Decor"}
                        className="relative w-8 h-full aspect-[144/88] contain"
                        width={144}
                        height={88}
                        loading="lazy"
                      />
                      <h4 className="m-0 basis-auto grow-0 uppercase text-[1.5rem] flex items-center">
                        {menu.title}
                        <motion.span 
                          className="ml-2 inline-block -top-0.5 relative"
                          animate={{ rotate: openMenus.includes(menuIndex) ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <LoadImage
                            src={"/caret-down.png"}
                            alt={"Caret Down"}
                            className="relative w-2 h-full aspect-[72/63] contain"
                            width={72}
                            height={63}
                            loading="lazy"
                          />
                        </motion.span>
                      </h4>
                      <LoadImage
                        src={"/swirl-right.png"}
                        alt={"Decor"}
                        className="relative w-8 h-full aspect-[144/88] contain"
                        width={144}
                        height={88}
                        loading="lazy"
                      />
                    </button>
                    
                    <AnimatePresence>
                      {openMenus.includes(menuIndex) && (
                        <motion.div 
                          id={`menu-items-${menuIndex}`}
                          initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                          animate={{ 
                            height: menuIndex === 0 && !hasInteracted ? "180px" : "auto", 
                            opacity: 1, 
                            overflow: menuIndex === 0 && !hasInteracted ? "hidden" : "visible" 
                          }}
                          exit={{ height: 0, opacity: 0, overflow: "hidden" }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="w-full mx-auto text-[#274F37] px-3 sm:px-6 bg-[#B7B0A2] pt-3 relative border-b border-[#96896F]"
                        >
                          {menuIndex === 0 && showHint && !hasInteracted && (
                            <motion.div 
                              className="absolute inset-0 flex items-center justify-center bg-[#B7B0A2]/90 z-10 cursor-pointer"
                              initial={{ opacity: 1 }}
                              animate={{ opacity: hasInteracted ? 0 : 1 }}
                              exit={{ opacity: 0 }}
                              onClick={expandMenu}
                              transition={{ duration: 0.3 }}
                            >
                              <h4 className="text-[#274F37] text-center text-[1.25rem] px-6 py-3 flex items-center justify-center gap-2">
                                Click on category to expand
                                <LoadImage
                                  src={"/caret-down.png"}
                                  alt={"Caret Down"}
                                  className="relative w-2 h-full aspect-[72/63] contain"
                                  width={72}
                                  height={63}
                                  loading="lazy"
                                />
                              </h4>
                            </motion.div>
                          )}
                          
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
                                    <div 
                                      className="relative w-36 h-auto aspect-[16/10] flex-shrink-0 bg-[#c0b7a8] border rounded-xl border-[#DCBA7B] overflow-hidden cursor-pointer"
                                      onClick={() => openLightbox(item.img)}
                                    >
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </Intro>
        </section>
      : null}

      {/* Lightbox component */}
      <Lightbox
        open={lightbox.open}
        close={closeLightbox}
        slides={lightbox.image ? [{ src: lightbox.image.url, alt: lightbox.image.alt }] : []}
        animation={{ fade: 300 }}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  )
}

export default MobileMenu 
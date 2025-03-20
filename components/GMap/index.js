'use client'
import { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { GMapOptions } from './options'
import { usePathname } from 'next/navigation'

export default function GMap({ allVenues, hoveredIndex, setHoveredIndex, selectedIndex, setSelectedIndex }) {

	const gMapKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
	const path = usePathname()
	const [gridItems, setGridItems] = useState()

	useEffect(() => {
		const gridItems = document.getElementsByClassName('grid-item')
		if (gridItems)
			setGridItems(gridItems)
	}, [path])


	const defaultProps = {
		center: {
			lat: 25.97812938413917,
			lng: -80.13966106893585,
		},
		zoom: 12,
	}

	const addMarker = (google) => {
		const scaledSize = new google.maps.Size(40, 40)

		const infowindow = new google.maps.InfoWindow()
		const infotitle = new google.maps.InfoWindow({ disableAutoPan: true })
		const bounds = new google.maps.LatLngBounds()

		allVenues?.forEach((item, i) => {
			if(!item.map) return

			let clickFlag = false
			const titleString = `<div class="infobox"><h6>${item.name}</h6></div`
			const markupString = 
			`<div class="info-container">
				<div class="grid-item-restaurant">
				${item?.img ?
					`<div class="info-image">
						<img alt="${item.name}" src="${item?.img?.sizes?.medium}"/>
					</div>`
					: ''
				}
				</div>
				<div class='infobox grid-item-restaurant-description-box  font-[400]'>
					<h5 class="margin-off">${item.name}</h5>
					<div class="flex flex-wrap mt-1 text-[0.85em] justify-between jc-space-between">
						<h6 class="margin-off">${item.address ? item.address : ""}</h6>
						<h6 class="margin-off">${item.hours ? item.hours : ''}</h6>
					</div>
				</div>
			</div>`

			const icon = {
				url: "/map-marker.png",
				scaledSize: scaledSize
			}

			const iconFilled = {
				url: "/map-marker-filled.png",
				scaledSize: scaledSize
			}

			const position = { lat: item?.map?.lat, lng: item?.map?.lng }
			bounds.extend(position)

			const marker = new google.maps.Marker({
				position: position,
				map: google.map,
				icon: icon
			})

			// When clicking item boxes
			gridItems[i]?.addEventListener('click', function () {
				if (selectedIndex === i) {
					// If clicking the same item again, clear selection
					infowindow.close()
					infowindow.currentlyOpen = null
					infotitle.close()
					marker.setIcon(icon)
					setSelectedIndex(null)
				} else {
					// If clicking a different item
					infowindow.currentlyOpen = i
					infotitle.close()
					infowindow.close()
					infowindow.setContent(markupString)
					infowindow.open(marker.getMap(), marker)
					marker.setIcon(iconFilled)
					setSelectedIndex(i)
					// google.map.panTo(position)
					google.map.setZoom(13)
					google.map.panTo(position, {
						animate: true,
						duration: 1000
					})
				}
			})

			// When hovering item boxes
			gridItems[i]?.addEventListener('mouseover', function () {
				if (selectedIndex !== i) {
					infotitle.close() // Close previously opened infotitle
					if (infowindow.currentlyOpen !== i) {
						infotitle.setContent(titleString)
						infotitle.open(google.map, marker)
					}
					marker.setIcon(iconFilled)
					setHoveredIndex(i)
				}
			})

			// When hovering item boxes
			gridItems[i]?.addEventListener('mouseout', function () {
				if (selectedIndex !== i) {
					infotitle.close() // Close previously opened infotitle
					setHoveredIndex(null)
					marker.setIcon(icon)
				}
			})

			// When clicking markers
			marker.addListener("click", () => {
				if (selectedIndex === i) {
					// If clicking the same marker again, clear selection
					infowindow.close()
					infowindow.currentlyOpen = null
					infotitle.close()
					marker.setIcon(icon)
					setSelectedIndex(null)
				} else {
					// If clicking a different marker
					infowindow.currentlyOpen = i
					infotitle.close()
					infowindow.close()
					infowindow.setContent(markupString)
					infowindow.open(marker.getMap(), marker)
					marker.setIcon(iconFilled)
					setSelectedIndex(i)
					// google.map.panTo(position)
					google.map.setZoom(13)
					google.map.panTo(position, {
						animate: true,
						duration: 1000
					})
				}
			})

			// When hovering markers
			marker.addListener("mouseover", () => {
				if (selectedIndex !== i) {
					infotitle.close()
					if (infowindow.currentlyOpen !== i) {
						infotitle.setContent(titleString)
						infotitle.open(marker.getMap(), marker)
					}
					marker.setIcon(iconFilled)
					setHoveredIndex(i)
				}
			})

			// When hovering markers
			marker.addListener('mouseout', () => {
				if (selectedIndex !== i) {
					infotitle.close()
					setHoveredIndex(null)
					marker.setIcon(icon)
				}
			})

			// When clicking map
			google.map.addListener('click', () => {
				infowindow.close() // Close previously opened infowindow
				infowindow.currentlyOpen = null
				infotitle.close() // Close previously opened infotitle
				marker.setIcon(icon)
				setSelectedIndex(null)
				setHoveredIndex(null)
				google.map.fitBounds(bounds, {
					padding: 50,
					duration: 1000
				})
			})
		})

		// Fit bounds after all markers are added
		google.map.fitBounds(bounds)
	}



	return (
		<>
			<GoogleMapReact
				bootstrapURLKeys={{ key: gMapKey }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={(google) => addMarker(google)}
				options={GMapOptions}
			/>
		</>
	)
}
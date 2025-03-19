'use client'
import { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { GMapOptions } from './options'
import { usePathname } from 'next/navigation'

export default function GMap({ allVenues }) {

	const gMapKey = process.env.GATSBY_GOOGLE_API_KEY
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

		const scaledSize = new google.maps.Size(20, 20)
		const infowindow = new google.maps.InfoWindow()
		const infotitle = new google.maps.InfoWindow({ disableAutoPan: true })

		allVenues?.forEach((item, i) => {
			if(!item.map) return

			let clickFlag = false
			const titleString = `<div class="infobox"><h6>${item.name}</h6></div`
			const markupString = 
			`<div class="info-container">
				<div class="block-img">
					<div class="image-wrap aspect-ratio">
						<img class='aspect-square' alt="${item.name}" src="${item?.img?.url}"/>
					</div>
				</div>
				<div class='infobox font-[400]'>
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

			const marker = new google.maps.Marker({
				position: { lat: item?.map?.lat, lng: item?.map?.lng },
				map: google.map,
				icon: icon
			})

			// When clicking item boxes
			gridItems[i]?.addEventListener('click', function () {
				infowindow.currentlyOpen = i
				infotitle.close()
				infowindow.close()
				infowindow.setContent(markupString)
				infowindow.open(marker.getMap(), marker)
				marker.setIcon(iconFilled)
				clickFlag = true
			})

			// When hovering item boxes
			gridItems[i]?.addEventListener('mouseover', function () {
				infotitle.close() // Close previously opened infotitle
				infowindow.close() // Close previously opened infowindow
				infotitle.setContent(titleString)
				infotitle.open(google.map, marker)
				marker.setIcon(iconFilled)
			})

			// When hovering item boxes
			gridItems[i]?.addEventListener('mouseout', function () {
				if (!clickFlag) {
					infotitle.close() // Close previously opened infotitle
					infowindow.close() // Close previously opened infowindow
					marker.setIcon(icon)
				} else {
					clickFlag = false
				}
			})

			// When clicking markers
			marker.addListener("click", () => {
				infowindow.currentlyOpen = i
				infotitle.close()
				infowindow.close()
				infowindow.setContent(markupString)
				infowindow.open(marker.getMap(), marker)
				marker.setIcon(iconFilled)
				// gridItems[i]?.scrollIntoView({ behavior: "smooth", block: "center" })

			})

			// When hovering markers
			marker.addListener("mouseover", () => {
				infotitle.close()
				if (infowindow.currentlyOpen !== i) {
					infotitle.setContent(titleString)
					infotitle.open(marker.getMap(), marker)
				}
				marker.setIcon(iconFilled)
			})

			// When hovering markers
			marker.addListener('mouseout', () => {
				infotitle.close()
				marker.setIcon(icon)
			})

			// When defocusing marker
			google.map.addListener('click', () => {
				infowindow.close() // Close previously opened infowindow
				infowindow.currentlyOpen = null
				infotitle.close() // Close previously opened infotitle
				marker.setIcon(icon)
			})

			// marker.setMap(google.map)
		})
	}



	return (
		<>
			<GoogleMapReact
				// bootstrapURLKeys={{ key: "" }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={(google) => addMarker(google)}
				options={GMapOptions}
			/>
		</>
	)
}
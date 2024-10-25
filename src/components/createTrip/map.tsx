"use client"

import React, { useState, useEffect } from "react"
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "500px",
}

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
}

const MapPage = ({ recommendationData }: any) => {
  const [directionsResponse, setDirectionsResponse] = useState<any>(null)

  const center = {
    lat: recommendationData?.accommodations?.[0]?.latitude || defaultCenter.lat,
    lng: recommendationData?.accommodations?.[0]?.longitude || defaultCenter.lng,
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string, // Use your Google Maps API key here
  })

  useEffect(() => {
    if (recommendationData?.accommodations?.length > 1) {
      calculateRoute()
    }
  }, [recommendationData])

  const calculateRoute = async () => {
    if (!recommendationData?.accommodations || recommendationData.accommodations.length < 2) return

    const source = {
      lat: recommendationData.accommodations[0].latitude,
      lng: recommendationData.accommodations[0].longitude,
    }
    
    const destination = {
      lat: recommendationData.accommodations[1].latitude,
      lng: recommendationData.accommodations[1].longitude,
    }

    const directionsService = new google.maps.DirectionsService()

    const result = await directionsService.route({
      origin: "Dhaka",
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    })

    setDirectionsResponse(result)
  }

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="w-full py-8 container-custom mx-auto px-4 overflow-hidden">
      <h1 className="text-2xl font-bold mb-8">Explore the Map</h1>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />

        {recommendationData?.mealPlans?.map((item: any, index: number) => (
          <Marker
            key={index}
            position={{ lat: item.latitude, lng: item.longitude }}
            icon="/restaurant.svg"
          />
        ))}

        {recommendationData?.accommodations?.map((item: any, index: number) => (
          <Marker
            key={index}
            position={{ lat: item.latitude, lng: item.longitude }}
            icon="/hotel.svg"
          />
        ))}

        {/* Display the route if directionsResponse is available */}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  )
}

export default MapPage

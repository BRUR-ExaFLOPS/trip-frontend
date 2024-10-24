"use client"

import React from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "500px",
}

const center = {
  lat: 37.7749,
  lng: -122.4194,
}

const MapPage = ({ recommendationData }: any) => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string, // Use your Google Maps API key here
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div className="w-full py-8 container-custom mx-auto px-4 overflow-hidden">
      <h1 className="text-2xl font-bold mb-8">Explore the Map</h1>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />

        {recommendationData?.mealPlans?.map((item: any, index: number) => (
          <Marker position={{ lat: item.latitude, lng: item.longitude }} />
        ))}
      </GoogleMap>
    </div>
  )
}

export default MapPage

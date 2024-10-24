"use client"

import TripFinalForm from "@/components/createTrip/trip-final-form"
import Navbar from "@/components/navbar"
import { useSearchParams } from "next/navigation"
import React from "react"

const CreateTrip = () => {

  const params = useSearchParams()
  const destination = params.get('destination')
  const duration = params.get('duration')

 
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="w-full py-24 container-custom mx-auto px-4">
        <TripFinalForm destination={destination!} duration={duration!} />
        
      </div>
    </div>
  )
}

export default CreateTrip

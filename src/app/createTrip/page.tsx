import TripFinalForm from "@/components/createTrip/trip-final-form"
import Navbar from "@/components/navbar"
import React from "react"

const CreateTrip = () => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="w-full py-24 container-custom mx-auto px-4">
        <TripFinalForm />
      </div>
    </div>
  )
}

export default CreateTrip

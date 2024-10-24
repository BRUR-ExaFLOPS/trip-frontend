import React from "react"
import { Button } from "../ui/button"

const TripCard = ({ image, title, description, price }: any) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden w-full md:w-72">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold">{price}</span>
          <Button variant="default">Book Now</Button>
        </div>
      </div>
    </div>
  )
}

export default TripCard

import SuggestedTrips from "@/components/home/suggested-trips"
import TripForm from "@/components/home/trip-form"
import Navbar from "@/components/navbar"
import Image from "next/image"

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Navbar />
      <div className="w-full py-8 container-custom mx-auto px-4">
        <TripForm />
        <SuggestedTrips />
      </div>
    </main>
  )
}

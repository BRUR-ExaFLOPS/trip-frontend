import SuggestedTrips from "@/components/home/suggested-trips"
import TripForm from "@/components/home/trip-form"
import Navbar from "@/components/navbar"
import TypingAnimation from "@/components/ui/typing-animation"
import Image from "next/image"

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Navbar />
      <div className="w-full py-16 container-custom mx-auto px-4">
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex flex-col justify-start w-full lg:w-1/2">
            <TypingAnimation
              className="text-5xl lg:text-7xl text-left font-bold text-zinc-900"
              text="Find Your Next Adventure"
              duration={100}
            />
            <p className="text-lg font-light text-zinc-500 mt-2">
              Explore the world with us!
            </p>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-[500px] lg:w-1/2">
            <div className="row-span-2 bg-red-300 bg-[url('/image-1.jpg')] bg-cover bg-center"></div>
            <div className="bg-cyan-200 bg-[url('/image-2.jpg')] bg-cover bg-center"></div>
            <div className="col-start-2 row-start-2 bg-yellow-300 bg-[url('/image-3.jpg')] bg-cover bg-center"></div>
          </div>

          <div className="absolute translate-y-56 w-full max-w-[800px] bg-white shadow-xl rounded-2xl p-4">
            <TripForm />
          </div>
        </div>
      </div>
    </main>
  )
}

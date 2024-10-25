import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const Home = () => {
  // State to hold the fetched trips and search results
  const [trips, setTrips] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // Fetch trips from the API when the component mounts
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/travel/trip-details?username=test`
        )
        const data = await response.json()
        const formattedTrips = data.map((trip: any, index: number) => ({
          id: index + 1,
          destination: trip.destination,
          date: "Date not provided", // Replace this with actual date if available
          overview: `Accommodation: ${
            trip.accommodation?.name || "N/A"
          }. Meal Plan: ${trip.mealPlan?.name || "N/A"}`,
          accommodationPhotos: trip.accommodation?.photos || [],
          mealPlanPhotos: trip.mealPlan?.photos || [],
          _id: trip._id,
        }))
        setTrips(formattedTrips)
      } catch (error) {
        console.error("Error fetching trips:", error)
      }
    }

    fetchTrips()
  }, [])

  // Handle image search API
  const handleSearchImages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/travel/search-images?query=${searchQuery}`
      )
      const data = await response.json()
      setSearchResults(data) // Update search results state with the fetched data
    } catch (error) {
      console.error("Error fetching image search results:", error)
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <p className="text-zinc-600 text-lg mt-3">
        Welcome back and explore the world!
      </p>

      <div className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weather in Your Location</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sunny, 25°C
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Updated just now
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Image Search Section */}
      <div className="h-[400px] w-full bg-gray-100 rounded-xl p-6 md:p-12">
        <h1 className="text-4xl text-center">Search your trip images</h1>
        <p className="mt-2 text-zinc-600 text-center">
          This is an AI-powered image search. Please give your prompt to get the
          required images.
        </p>

        {/* Search Form */}
        <div className="flex flex-col items-center mt-6">
          <Input
            type="text"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 max-w-lg w-full"
          />
          <Button variant="default" onClick={handleSearchImages}>
            Search Images
          </Button>
        </div>
      </div>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="mt-8">
          <h2 className="text-3xl">Search Results</h2>
          <div className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((result: any) => (
              <Card key={result.id}>
                <CardHeader>
                  <CardTitle>{result.originalName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/travel/image/${result.filename}`}
                    alt={result.originalName}
                    className="rounded-lg"
                  />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {result.summary}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Trips Section */}
      <div className="mt-8">
        <h2 className="text-3xl">Your Trips</h2>
        <div className="py-6 flex flex-col gap-4">
          {trips.map((trip: any) => (
            <Card key={trip.id}>
              <CardHeader>
                <CardTitle>{trip.destination}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {trip.date}
                </p>
                <Link href={`/trip/${trip._id}`}>
                  <p className="mt-4 inline-block text-blue-500 hover:underline">
                    View Details
                  </p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

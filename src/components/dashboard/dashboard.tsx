import React from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

export const Home = () => {
  const trips = [
    {
      id: 1,
      destination: "Paris",
      date: "July 2024",
      overview: "Explore the city of lights and its famous landmarks.",
    },
    {
      id: 2,
      destination: "New York",
      date: "October 2024",
      overview: "Experience the hustle and bustle of the Big Apple.",
    },
    {
      id: 3,
      destination: "Tokyo",
      date: "December 2024",
      overview: "Discover the vibrant culture and technology of Japan.",
    },
  ]

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

      <div>
        <h2 className="text-3xl">Your Trips</h2>
        <div className="py-6 flex flex-col gap-4">
          {trips.map((trip) => (
            <Card key={trip.id}>
              <CardHeader>
                <CardTitle>{trip.destination}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {trip.date}
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {trip.overview}
                </p>

                <Link href={`/trip/${trip.id}`}>
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

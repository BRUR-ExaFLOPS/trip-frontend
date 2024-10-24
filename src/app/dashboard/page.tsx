"use client"

import React from "react"
import { HomeIcon, GlobeIcon, UserIcon, SettingsIcon } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-6">
        <nav className="space-y-4">
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-2"
          >
            <HomeIcon className="w-5 h-5" />
            Dashboard
          </Button>

          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-2"
          >
            <GlobeIcon className="w-5 h-5" />
            Explore Trips
          </Button>

          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-2"
          >
            <UserIcon className="w-5 h-5" />
            Profile
          </Button>

          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-2"
          >
            <SettingsIcon className="w-5 h-5" />
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 bg-white dark:bg-gray-900 p-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Hello, User
        </h1>
        <p className="text-zinc-600 text-lg mt-3">
          Welcome back and explore the world!
        </p>

        <div className="my-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample cards for different sections of the dashboard */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold">Weather in Your Location</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Check your upcoming and past bookings.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold">Explore Destinations</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Browse new places and plan your next trip.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold">Travel Preferences</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Update your preferred destinations and interests.
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

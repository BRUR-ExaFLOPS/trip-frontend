"use client"

import React from "react"
import { HomeIcon, GlobeIcon, UserIcon, SettingsIcon } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Home } from "@/components/dashboard/dashboard"
import TripBlogs from "@/components/dashboard/trip-blogs"

// Components for different sections

const Profile = () => (
  <div>
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
      Profile
    </h1>
    <p className="text-zinc-600 text-lg mt-3">
      Manage your profile and settings.
    </p>
  </div>
)

const Settings = () => (
  <div>
    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
      Settings
    </h1>
    <p className="text-zinc-600 text-lg mt-3">
      Update your preferences and configurations.
    </p>
  </div>
)

const Dashboard = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-6">
          <nav className="space-y-4">
            <Link to="/dashboard">
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start gap-2"
              >
                <HomeIcon className="w-5 h-5" />
                Dashboard
              </Button>
            </Link>

            <Link to="/dashboard/trip-blogs">
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start gap-2"
              >
                <GlobeIcon className="w-5 h-5" />
                Trip Blogs
              </Button>
            </Link>

            <Link to="/dashboard/profile">
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start gap-2"
              >
                <UserIcon className="w-5 h-5" />
                Profile
              </Button>
            </Link>

            <Link to="/dashboard/settings">
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start gap-2"
              >
                <SettingsIcon className="w-5 h-5" />
                Settings
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 bg-white dark:bg-gray-900 p-10">
          <Routes>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/dashboard/trip-blogs" element={<TripBlogs />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default Dashboard

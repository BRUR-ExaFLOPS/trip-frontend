"use client"

import React, { useState } from "react"
import {
  HomeIcon,
  GlobeIcon,
  UserIcon,
  SettingsIcon,
  MenuIcon,
} from "lucide-react"
import { Button } from "../../components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Home } from "@/components/dashboard/dashboard"
import TripBlogs from "@/components/dashboard/trip-blogs"

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
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <Router>
      <div className="flex h-screen">
        {/* Hamburger Icon for smaller screens */}
        <div className="absolute top-4 left-4 lg:hidden z-50">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <MenuIcon className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-6">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="space-y-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="flex w-full items-center justify-start gap-2"
                    onClick={() => setIsSheetOpen(false)} // Close Sheet on link click
                  >
                    <HomeIcon className="w-5 h-5" />
                    Dashboard
                  </Button>
                </Link>

                <Link to="/dashboard/trip-blogs">
                  <Button
                    variant="ghost"
                    className="flex w-full items-center justify-start gap-2"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <GlobeIcon className="w-5 h-5" />
                    Trip Blogs
                  </Button>
                </Link>

                <Link to="/dashboard/profile">
                  <Button
                    variant="ghost"
                    className="flex w-full items-center justify-start gap-2"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <UserIcon className="w-5 h-5" />
                    Profile
                  </Button>
                </Link>

                <Link to="/dashboard/settings">
                  <Button
                    variant="ghost"
                    className="flex w-full items-center justify-start gap-2"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <SettingsIcon className="w-5 h-5" />
                    Settings
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Left Sidebar for larger screens */}
        <aside className="hidden lg:block w-64 h-full bg-gray-100 dark:bg-gray-800 p-6">
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

        <main className="flex-1 bg-white dark:bg-gray-900 p-10 mt-8 lg:mt-0 lg:ml-12">
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

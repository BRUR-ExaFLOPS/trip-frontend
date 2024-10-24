"use client"

import React from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const Navbar = () => {
  return (
    <header className="w-full border-b bg-white dark:bg-gray-900">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <a href="/" className="text-xl font-bold text-black dark:text-white">
            MyTravelApp
          </a>

          <div className="hidden md:flex space-x-6">
            <a
              href="#destinations"
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Destinations
            </a>
            <a
              href="#tours"
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Tours
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              About Us
            </a>
          </div>
        </div>

        <Button variant="default">Sign In</Button>
      </nav>
    </header>
  )
}

export default Navbar

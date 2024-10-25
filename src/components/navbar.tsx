"use client"

import React from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <header className="w-full border-b bg-white dark:bg-gray-900">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <a href="/" className="text-xl font-bold text-black dark:text-white">
            <Image src="/logo.png" alt="logo" height={0} width={150} />
          </a>

          <div className="hidden md:flex space-x-6">
            <a
              href="#destinations"
              className="text-base text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Destinations
            </a>
            <a
              href="#tours"
              className="text-base text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Tours
            </a>
            <a
              href="#about"
              className="text-base text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              About Us
            </a>
          </div>
        </div>

        <Link href="/sign-in">
          <Button variant="default">
            <Image src="/google.svg" alt="google icon" height={0} width={18} />{" "}
            Sign In
          </Button>
        </Link>
      </nav>
    </header>
  )
}

export default Navbar

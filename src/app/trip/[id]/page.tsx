"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadCloudIcon } from "lucide-react"

const TripDetails = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setSelectedImages(Array.from(files))
    }
  }

  return (
    <div className="relative w-full py-16 container-custom mx-auto px-4">
      <Button
        className="absolute -translate-x-[100px] -translate-y-4 underline text-blue-600"
        variant="link"
        onClick={() => {
          window.location.href = "/dashboard"
        }}
      >
        Go back to dashboard
      </Button>

      <h1 className="text-4xl font-bold mt-12">Trip Name</h1>
      <p className="text-zinc-600 mt-4">Location</p>

      <Card className="max-w-[300px] mt-4">
        <CardHeader>
          <CardTitle>Weather of the Destination</CardTitle>
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

      {/* Image Upload Section */}
      <Card className="my-8">
        <CardHeader>
          <CardTitle className="text-xl">
            Upload your photos of this trip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4 max-w-[400px]"
          />
          <Button variant="default">
            <UploadCloudIcon /> Upload Images
          </Button>
        </CardContent>
      </Card>

      {/* Preview the selected images */}
      {selectedImages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {selectedImages.map((image, index) => (
            <Card key={index} className="shadow-md">
              <CardContent className="p-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Upload Preview ${index + 1}`}
                  className="rounded-lg"
                />
                <p className="text-sm mt-2 text-center">{image.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default TripDetails

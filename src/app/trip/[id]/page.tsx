"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TripDetails = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setSelectedImages(Array.from(files))
    }
  }

  return (
    <div className="w-full py-16 container-custom mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Trip Name</h1>

      {/* Image Upload Section */}
      <Card className="mb-8">
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
          <Button variant="default">Upload Images</Button>
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

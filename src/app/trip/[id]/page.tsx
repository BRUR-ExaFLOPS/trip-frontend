"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadCloudIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog" // Import ShadCN's Dialog
import { Skeleton } from "@/components/ui/skeleton"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const TripDetails = () => {
  const { toast } = useToast() // ShadCN's toast
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const { id } = useParams() // Trip ID from the URL

  // State to hold the fetched trip details
  const [trip, setTrip] = useState<any>()
  const [blogContent, setBlogContent] = useState<any>(null) // To store the blog content
  const [isLoadingBlog, setIsLoadingBlog] = useState(false) // For loading state of blog

  // Fetch trip details from the API
  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/travel/trip/${id}`
        )
        const data = await response.json()
        const formattedTrip = {
          id: id,
          destination: data.destination,
          date: "Date not provided", // Replace with actual date if available
          overview: `Accommodation: ${
            data?.accommodation?.name || "N/A"
          }. Meal Plan: ${data?.mealPlan?.name || "N/A"}`,
          accommodationPhotos: data?.accommodation?.photos || [],
          mealPlanPhotos: data?.mealPlan?.photos || [],
          images: data?.images?.map((image: any) => image.filename),
          lat: data?.accommodation?.geometry?.location?.lat,
          lng: data?.accommodation?.geometry?.location?.lng,
        }
        setTrip(formattedTrip)
      } catch (error) {
        console.error("Error fetching trip details:", error)
      }
    }

    fetchTripDetails()
  }, [id])

  const [weather, setWeather] = useState<any>()

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${Number(
            trip?.lat
          ).toFixed(4)}&lon=${Number(trip?.lng).toFixed(
            4
          )}&appid=252f9a5aa41ba1fe2d849073afd910fb`
        )
        const data = await response.json()

        console.log({ data })

        setWeather(data)
      } catch (error) {
        console.error("Error fetching trips:", error)
      }
    }

    fetchWeatherData()
  }, [trip])

  // Handle image selection
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setSelectedImages(Array.from(files))
    }
  }

  // Handle image upload to the API
  const handleImageSubmit = async () => {
    if (selectedImages.length === 0) {
      toast({
        title: "Error",
        description: "Please select images to upload.",
        variant: "destructive",
      })
      return
    }

    const formData = new FormData()
    selectedImages.forEach((image) => {
      formData.append("images", image)
    })

    try {
      const response = await fetch(
        `http://localhost:3000/travel/upload-trip-images?tripId=${id}`,
        {
          method: "POST",
          body: formData,
        }
      )

      if (response.ok) {
        toast({
          title: "Success",
          description: "Images uploaded successfully!",
        })
        setSelectedImages([]) // Clear the selected images after successful upload
      } else {
        toast({
          title: "Error",
          description: "Error uploading images.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error uploading images:", error)
      toast({
        title: "Error",
        description: "Error uploading images.",
        variant: "destructive",
      })
    }
  }

  // Handle blog generation
  const generateBlog = async () => {
    setIsLoadingBlog(true)
    try {
      const response = await fetch(
        `http://localhost:3000/travel/generate-blog/${id}`,
        {
          method: "GET",
        }
      )

      if (response.ok) {
        const blogData = await response.json()
        setBlogContent(blogData) // Assuming the API returns markdown content
        toast({
          title: "Success",
          description: "Blog generated successfully!",
        })
      } else {
        toast({
          title: "Error",
          description: "Error generating blog.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating blog:", error)
      toast({
        title: "Error",
        description: "Error generating blog.",
        variant: "destructive",
      })
    }
    setIsLoadingBlog(false)
  }

  return (
    <div className="relative w-full py-16 container-custom mx-auto px-4">
      <Button
        className="absolute -translate-x-4 -translate-y-4 underline text-blue-600"
        variant="link"
        onClick={() => {
          window.location.href = "/dashboard"
        }}
      >
        Go back to dashboard
      </Button>

      <h1 className="text-4xl font-bold mt-12">Trip to {trip?.destination}</h1>
      <p className="text-zinc-600 mt-4">{trip?.overview}</p>

      <Card className="max-w-[300px] mt-4 shadow-lg">
        <CardHeader>
          <CardTitle>Weather of the Destination</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sunny,{" "}
            {(
              Number(weather?.list?.[0]?.main?.temp || 273.16) - 273.16
            ).toFixed(2)}
            °C
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Updated just now
          </p>
        </CardContent>
      </Card>

      {/* Image Upload Section */}
      <Card className="my-8 flex flex-col items-center border-dashed">
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
            className="mt-1 max-w-[400px]"
          />
          <div className="flex justify-center">
            <Button
              variant="default"
              onClick={handleImageSubmit}
              className="mx-auto mt-4"
            >
              <UploadCloudIcon className="mr-2" /> Upload Images
            </Button>
          </div>
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

      <div className="flex items-center gap-4 mt-16">
        <h3 className="text-3xl text-zinc-900">Gallery</h3>

        {/* Trigger the Dialog to display the blog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={generateBlog} disabled={isLoadingBlog}>
              {isLoadingBlog ? "Generating Blog..." : "Generate Blog"}
            </Button>
          </DialogTrigger>

          <DialogContent className="w-full max-w-[1100px] max-h-[90vh] p-4 overflow-scroll">
            <DialogTitle>{blogContent?.title}</DialogTitle>
            {isLoadingBlog ? (
              // Skeleton with text generating animation
              <div className="space-y-3">
                <Skeleton className="h-4 w-5/6 animate-pulse bg-gradient-to-r from-gray-200 to-gray-400" />
                <Skeleton className="h-4 w-3/4 animate-pulse bg-gradient-to-r from-gray-200 to-gray-400" />
                <Skeleton className="h-4 w-4/6 animate-pulse bg-gradient-to-r from-gray-200 to-gray-400" />
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {blogContent ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {blogContent?.content}
                  </ReactMarkdown>
                ) : (
                  "No blog available."
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {trip?.images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {trip?.images.map((image: string, index: number) => (
            <Card key={index} className="shadow-md">
              <CardContent className="p-2">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/travel/image/${image}`}
                  alt={`Gallery Image ${index + 1}`}
                  className="rounded-lg"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default TripDetails

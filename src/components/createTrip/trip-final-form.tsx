"use client"

import React, { useEffect, useState } from "react"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import TypingAnimation from "../ui/typing-animation"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { TrainIcon, BusIcon, PlaneIcon, StarIcon } from "lucide-react"
import MapPage from "./map"

// Define validation schema using zod
const formSchema = z.object({
  tripPlan: z.enum(["Budget", "Mid-range", "Luxury"]),
  transport: z.enum(["Train", "Bus", "Flight"]),
  mealPlan: z.string().min(1, { message: "Meal Plan is required" }),
  accommodation: z.string().min(1, { message: "Accommodation is required" }),
})

const TripFinalForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripPlan: "Mid-range",
      transport: "Train",
      mealPlan: "",
      accommodation: "",
    },
  })

  const [recommendationData, setRecommendationData] = useState<any>([])

  async function getData() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/travel/travel-recommendations?destination=dhaka&duration=3`
      )
      const data = await res.json()
      console.log(data)
      setRecommendationData(data)
    } catch (error) {}
  }

  useEffect(() => {
    getData()
  }, [])

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      console.log("")
    } catch (error) {
      console.log(error)
    }

    console.log("Form data:", formData)
  }

  return (
    <div className="w-full my-16">
      <TypingAnimation
        className="text-6xl font-bold text-black dark:text-white"
        text="Finalize your trip"
        duration={100}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-3xl mt-6 mx-auto space-y-8"
        >
          {/* Trip Plan Dropdown */}
          <FormField
            control={form.control}
            name="tripPlan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trip Plan</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a trip plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Budget">Budget</SelectItem>
                      <SelectItem value="Mid-range">Mid-range</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Transport Option - Cards with Icons and Estimated Time */}
          <FormField
            control={form.control}
            name="transport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transport Option</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card
                    className={`cursor-pointer ${
                      field.value === "Train" ? "border-blue-500" : ""
                    }`}
                    onClick={() => field.onChange("Train")}
                  >
                    <CardHeader className="flex items-center">
                      <TrainIcon className="mr-2" />
                      <CardTitle>Train</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-zinc-700 text-center">
                        Estimated Time: 5 hours
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer ${
                      field.value === "Bus" ? "border-blue-500" : ""
                    }`}
                    onClick={() => field.onChange("Bus")}
                  >
                    <CardHeader className="flex items-center">
                      <BusIcon className="mr-2" />
                      <CardTitle>Bus</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-zinc-700 text-center">
                        Estimated Time: 7 hours
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer ${
                      field.value === "Flight" ? "border-blue-500" : ""
                    }`}
                    onClick={() => field.onChange("Flight")}
                  >
                    <CardHeader className="flex items-center">
                      <PlaneIcon className="mr-2" />
                      <CardTitle>Flight</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-zinc-700 text-center">
                        Estimated Time: 2 hours
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <MapPage />

          {/* Meal Plan Input */}
          <FormField
            control={form.control}
            name="mealPlan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Plan</FormLabel>
                <div className="flex space-x-4 overflow-x-auto">
                  {recommendationData?.mealPlans?.map(
                    (meal: any, index: number) => (
                      <Card
                        key={index}
                        onClick={() => field.onChange(meal.name)} // Updates form field when card is clicked
                        className={`cursor-pointer min-w-[200px] ${
                          field.value === meal.name ? "border-blue-500" : ""
                        }`}
                      >
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="w-full h-32 object-cover rounded-t-xl"
                        />
                        <CardContent>
                          <h4 className="text-lg font-bold">{meal.name}</h4>
                          <p className="text-sm text-zinc-600">{meal.price}</p>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Accommodation Input */}
          <FormField
            control={form.control}
            name="accommodation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accommodation</FormLabel>
                <div className="flex space-x-4 overflow-x-auto">
                  {recommendationData?.accommodations?.map(
                    (item: any, index: number) => (
                      <Card
                        key={index}
                        onClick={() => field.onChange(item.name)} // Updates form field when card is clicked
                        className={`cursor-pointer min-w-[200px] ${
                          field.value === item.name ? "border-blue-500" : ""
                        }`}
                      >
                        <img
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.photos[0]}`}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-t-md"
                        />
                        <CardContent className="p-2">
                          <h4 className="text-md font-bold">{item.name}</h4>
                          <p className="text-sm text-zinc-600">
                            {item.address}
                          </p>
                          <p className="text-sm text-zinc-600">
                            rating: {item.rating}
                          </p>
                          <p className="text-sm text-zinc-600 mt-2">
                            {item.price}
                          </p>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" variant="default" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default TripFinalForm

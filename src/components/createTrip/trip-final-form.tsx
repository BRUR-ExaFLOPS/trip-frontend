"use client"

import React from "react"
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
import { TrainIcon, BusIcon, PlaneIcon } from "lucide-react" // Icons for transport
import { Label } from "@radix-ui/react-label"

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
      tripPlan: "Mid-range", // Default trip plan
      transport: "Train", // Default transport option
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form data:", data)
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

          <div className="flex flex-col gap-4">
            <FormLabel className="mt-7">Map</FormLabel>
            <div className="w-full h-96 rounded-2xl bg-gray-200"></div>
          </div>

          {/* Meal Plan Input */}
          <FormField
            control={form.control}
            name="mealPlan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Plan</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your meal plan" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input
                    placeholder="Enter your accommodation preferences"
                    {...field}
                  />
                </FormControl>
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

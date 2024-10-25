"use client"

import React, { useState } from "react"
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
import { CalendarIcon, SearchIcon } from "lucide-react"
import { redirect } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover"
import { differenceInDays, format } from "date-fns"
import { Calendar } from "../ui/calendar" // Assuming Calendar component is imported here

// Define the Zod schema
const formSchema = z.object({
  destination: z.string().nonempty({ message: "Destination is required" }),
  dateRange: z
    .object({
      from: z.date().nullable(),
      to: z.date().nullable(),
    })
    .refine((data) => data.from && data.to, {
      message: "Please select a date range",
    }),
})

const TripForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      dateRange: {
        from: null,
        to: null,
      },
    },
  })

  const [selectedDate, setSelectedDate] = useState<{
    from: Date | null
    to: Date | null
  }>({ from: null, to: null })

  const handleDateSelect = (range: {
    from: Date | undefined
    to: Date | undefined
  }) => {
    setSelectedDate({
      from: range.from || null,
      to: range.to || null,
    })

    form.setValue("dateRange", {
      from: range.from || null,
      to: range.to || null,
    })
  }

  const calculateDuration = () => {
    if (selectedDate.from && selectedDate.to) {
      return differenceInDays(selectedDate.to, selectedDate.from) + 1
    }
    return 0
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const duration = calculateDuration()

    redirect(`/createTrip?destination=${data.destination}&duration=${duration}`)
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto flex md:flex-row flex-col gap-4"
        >
          {/* Destination Input */}
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input
                    placeholder="To where?"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date Range Picker */}
          <div className={cn("grid gap-2 mt-8")}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !selectedDate.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2" />
                  {selectedDate.from ? (
                    selectedDate.to ? (
                      <>
                        {format(selectedDate.from, "LLL dd, y")} -{" "}
                        {format(selectedDate.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(selectedDate.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  selected={selectedDate as any}
                  onSelect={handleDateSelect as any}
                  numberOfMonths={2}
                  className="bg-white rounded-md shadow-lg"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="max-w-44 mt-7"
            variant="default"
            size="lg"
          >
            <SearchIcon className="mr-2" />
            Search
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default TripForm

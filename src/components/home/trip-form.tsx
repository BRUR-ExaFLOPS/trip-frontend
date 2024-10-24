"use client"

import React from "react"
import TypingAnimation from "../ui/typing-animation"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { SearchIcon } from "lucide-react"
import { redirect } from "next/navigation"

const formSchema = z.object({
  destination: z.string(),
  duration: z.number(),
})

const TripForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      duration: 3
    },
  })

  const onSubmit = () => {
    console.log("Hello")
    redirect(`/createTrip?destination=${form.getValues("destination")}&duration=${form.getValues("duration")}`)
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto flex gap-4"
        >
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="">Destination</FormLabel>
                <FormControl>
                  <Input
                    placeholder="to where?"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="max-w-44 mt-7" variant="default" size="lg">
            <SearchIcon />
            Search
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default TripForm

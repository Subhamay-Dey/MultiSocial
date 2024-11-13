"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AnimatedTooltipPreview } from "./Tooltip"
import { signIn, signOut, useSession } from 'next-auth/react'

const CheckIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="4" fill="#4ade80" />
      <path
        d="M14.6668 6.5L8.25016 12.9167L5.3335 10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

export default function Hero() {
    const { data: session } = useSession()
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-white">
            <main className="max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold bg-gradient-to-b from-black to-gray-800 bg-clip-text text-transparent leading-tight">
                Manage All Your Social{" "}
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold bg-gradient-to-b from-black to-gray-800 bg-clip-text text-transparent leading-tight">
                Media Accounts
                <span className="italic pl-4">in One</span>
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold bg-gradient-to-b from-black to-gray-800 bg-clip-text text-transparent leading-tight">
                <span className="italic">Place</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600">
              Post and schedule all your content on all your social accounts (all in one place). A useful tool at an actual fair price, that lets you...
            </p>
            <ul className="space-y-4">
              {[
                "Post to all major platforms in one click",
                "Schedule content for the perfect posting time",
                "Customize captions for each platform",
                "Save time and money (starting at $9 /month)",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckIcon/>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-4">
              <Button className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-lg py-6 px-8">
                Try it for free
              </Button>
              <p className="text-sm text-gray-500 text-center md:text-left">
                No credit card required
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="aspect-video rounded-lg border bg-gray-100 overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Product Demo"
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Used by <span className="text-gray-900 text-2xl font-bold">10</span>{" "}
                  <span className="text-emerald-500">Creators</span>
                </p>
              </div>
              <div className="flex items-center gap-3 space-x-2">
                <div className="">
                  <AnimatedTooltipPreview/>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600">65 posts published</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
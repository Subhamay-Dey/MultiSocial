"use client"

import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AnimatedTooltipPreview } from "./Tooltip"
import { useSession } from 'next-auth/react'
import TryFree from "../sub-components/TryFree"
import { useEffect } from "react"

const CheckIcon = () => (
  <svg className="h-6 w-6 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
)

export default function Hero() {
    const { data: session } = useSession()
  
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <main className="max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-1">
              <h1 className="text-4xl py-2 md:text-5xl lg:text-[54px] font-bold leading-tight">
                Manage All Your Social{" "}
                Media Accounts
                <span className="italic pl-4">in One</span>
                {" "}
                <span className="italic">Place</span>
              </h1>
            </div>
            <p className="text-lg opacity-90">
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
                  <span className="opacity-75">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-4">
              { session ? (
                <Link href="/dashboard">
                  <button className="btn btn-success btn-lg">
                    Try it for free
                  </button>
                </Link>
              ) : (
                <TryFree>
                  <button className="btn btn-success btn-lg">
                    Try it for free
                  </button>
                </TryFree>
              )}
              
              <p className="text-sm opacity-60 text-center md:text-left">
                No credit card required
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="aspect-video rounded-lg border bg-base-200 overflow-hidden">
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
                <p className="opacity-75">
                  Used by <span className="text-2xl font-bold">10</span>{" "}
                  <span className="text-success">Creators</span>
                </p>
              </div>
              <div className="flex items-center gap-3 space-x-2">
                <div className="">
                  <AnimatedTooltipPreview/>
                </div>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <input 
                      key={i} 
                      type="radio" 
                      name="rating-2" 
                      className="mask mask-star-2 bg-warning" 
                      checked={i === 4}
                      readOnly
                    />
                  ))}
                </div>
                <p className="opacity-75">65 posts published</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
"use client"

import { Check, Eye, Filter, Search, X } from 'lucide-react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import Image from 'next/image'

export default function DisplaySocialProfiles({back, imgurl}:{back: () => void, imgurl:string}) {
  const [activeStep, setActiveStep] = useState(1)
  const [selectedImage, setSelectedImage] = useState("/placeholder.svg?height=200&width=300")
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [socialLinks, setSocialLinks] = useState<any>(null);

  const steps = [
    { number: 1, title: "Choose Post Type", completed: true },
    { number: 2, title: "Select Accounts", completed: false },
    { number: 3, title: "Details", completed: false },
    { number: 4, title: "Publish", completed: false },
  ]

  const progress = (activeStep / steps.length) * 100

  return (
    <div className="w-full max-w-5xl pt-10">
      <div className="relative mb-8">
        <Progress value={progress} className="h-2" />
        <div className="absolute top-0 left-0 right-0 flex justify-between transform -translate-y-1/2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  step.completed
                    ? "bg-primary text-black"
                    : index + 1 === activeStep
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.completed ? <Check className="h-4 w-4" /> : step.number}
              </div>
              <span
                className={`mt-2 text-sm ${
                  index + 1 === activeStep ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-6">Select Accounts</h2>
              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input className="pl-9" placeholder="Search accounts..."/>
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
              {socialLinks ? (
                socialLinks.map((platform: any) => (
                  <div key={platform.id} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <input type="checkbox" className="rounded" />
                    <Image
                      src={platform.profileImageUrl || "/placeholder.svg"}
                      alt={platform.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{platform.platformName}</div>
                      <div className="text-sm text-muted-foreground">{platform.profileName}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
              </div>
            </div>

            <div className="w-80">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Preview</h3>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <img
                  src={imgurl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={back}>Back</Button>
        <Button>Next</Button>
      </div>
    </div>
  )
}
'use client'

import { CloudUpload, Clock, FileText, Grid, Menu, Plus, Settings, Users, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { IoClose } from "react-icons/io5"

export default function Component() {
  const [activeTab, setActiveTab] = useState('text')
  const [postText, setPostText] = useState('')
  const [showPricingPage, setShowPricingPage] = useState(false)
  const [activeView, setActiveView] = useState('new-post')
  const { data: session } = useSession()

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setImageUrl(objectUrl)
    }
  }

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImageUrl(null)
  }

  const renderContent = () => {
    switch (activeView) {
      case 'new-post':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent">
              Create a post
            </h2>
            <div className="flex justify-center items-center border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('single')}
                className={`pb-2 px-8 font-medium ${
                  activeTab === 'single' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-500'
                }`}
              >
                Single File
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`pb-2 px-8 font-medium ${
                  activeTab === 'text' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-500'
                }`}
              >
                Text Post
              </button>
              <button
                onClick={() => setActiveTab('carousel')}
                className={`pb-2 px-8 font-medium ${
                  activeTab === 'carousel' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-500'
                }`}
              >
                Carousel
              </button>
            </div>
            {activeTab === 'text' ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="relative">
                  <textarea
                    placeholder="Start writing your post here..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    className="w-full min-h-[200px] p-4 border-2 border-purple-300 hover:border-purple-400 rounded-lg text-black"
                    maxLength={2200}
                  />
                  <div className="absolute bottom-2 right-2 text-sm text-gray-400">{postText.length}/2200</div>
                </div>
                <button className="w-full mt-4 bg-gray-200 text-gray-600 py-3 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  Select accounts
                </button>
              </div>
            ) : activeTab === 'single' ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-center hover:cursor-pointer"
                onClick={handleClick}
                style={{
                  backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '300px',
                }}
              >
                {imageUrl && (
                  <button
                    className="text-white bg-black bg-opacity-50 rounded-full p-1"
                    onClick={handleRemoveImage}
                    aria-label="Remove Image"
                  >
                    <IoClose className="w-6 h-6" />
                  </button>
                )}
                {!imageUrl && (
                  <>
                    <CloudUpload className="w-12 h-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-1 text-black">Click to upload or drag and drop</h3>
                    <p className="text-sm text-gray-500 mb-2">or paste image from clipboard</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      Image or Video (max 100MB)
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </p>
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  accept="image/*,video/*"
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-center">
                <Grid className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-1 text-black">Create a carousel post</h3>
                <p className="text-sm text-gray-500">Upload multiple images or videos</p>
              </div>
            )}
          </div>
        )
      case 'scheduled':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent">
              Scheduled Posts
            </h2>
            <p className="text-gray-500">No scheduled posts found.</p>
          </div>
        )
      case 'posts':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent">
              Posts
            </h2>
            <p className="text-gray-500">No past posts found.</p>
          </div>
        )
      case 'accounts':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent">
              Connected Accounts
            </h2>
            <div className="space-y-4">
              {['Instagram', 'Twitter', 'YouTube', 'TikTok', 'Facebook', 'LinkedIn', 'Bluesky', 'Threads', 'Pinterest'].map(
                (platform) => (
                  <button
                    key={platform}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center justify-between"
                  >
                    <span>Connect {platform}</span>
                    <Plus className="w-5 h-5" />
                  </button>
                )
              )}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <span className="flex gap-2 items-center">
            <h2 className="bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent tracking-tighter text-xl font-black text-center">
              MultiSocial
            </h2>
            <Image src="/Multisocials.png" alt="logo" width={24} height={24} />
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto p-6">
          <div className="border-b border-gray-200">
            <button
              className="w-full bg-purple-500 text-white rounded-md py-2 px-4 flex items-center justify-center gap-2 mb-6"
              onClick={() => setActiveView('new-post')}
            >
              <Plus className="w-5 h-10" />
              Create post
            </button>
          </div>
          <div className="my-6">
            <h2 className="text-xs font-semibold text-gray-500 mb-2">Content</h2>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveView('new-post')}
                  className={`flex items-center gap-3 w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 ${
                    activeView === 'new-post' ? 'bg-gray-100 text-purple-500' : 'text-gray-700'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  New post
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('scheduled')}
                  className={`flex items-center gap-3 w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 ${
                    activeView === 'scheduled' ? 'bg-gray-100 text-purple-500' : 'text-gray-700'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  Scheduled
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('posts')}
                  className={`flex items-center gap-3 w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 ${
                    activeView === 'posts' ? 'bg-gray-100 text-purple-500' : 'text-gray-700'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                  Posts
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold text-gray-500 mb-2 border-t border-gray-200 pt-6">Configuration</h2>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveView('accounts')}
                  className={`flex items-center gap-3 w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 ${
                    activeView === 'accounts' ? 'bg-gray-100 text-purple-500' : 'text-gray-700'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  Accounts
                </button>
              </li>
            </ul>
          </div>
        </nav>
        {/* Posts left indicator */}
        <div className=" bg-white rounded-full flex flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 6V12L16 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent">
              5 posts left
            </span>
          </div>
          <span className="w-full bg-purple-600 py-2 rounded-full"></span>
        </div>
        {/* Upgrade to premium */}
        <div className="w-full flex justify-center items-center pb-4">
          <div className=" bg-white rounded-lg shadow-md p-4 w-56 border border-gray-200">
            <h3 className="font-semibold mb-2 bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent">
              Upgrade to premium
            </h3>
            <p className="text-sm text-gray-600 mb-4">Unlimited posting and scheduling for an unbeatable price.</p>
            <button
              className="w-full bg-purple-500 text-white rounded-md py-2 px-4 text-sm font-medium"
              onClick={() => setShowPricingPage(true)}
            >
              Choose plan
            </button>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">
              N
            </div>
            <div>
              <p className="text-sm font-medium bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent">
                {session?.user.name}
              </p>
              <p className="text-xs text-gray-500">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-6xl mx-auto">
          <div className="bg-purple-100 border border-purple-300 rounded-md p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-purple-800">Connect your social media accounts to start posting</span>
            </div>
            <button className="bg-gray-800 text-white text-sm rounded-md py-1 px-3">Connect Accounts</button>
          </div>

          {renderContent()}
        </div>
      </main>

      {/* Pricing Page Modal */}
      {showPricingPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Choose Your Plan</h2>
              <button onClick={() => setShowPricingPage(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {['Basic', 'Pro', 'Enterprise'].map((plan) => (
                <div key={plan} className="border rounded-lg p-6 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{plan}</h3>
                  <p className="text-gray-600 mb-4">Perfect for {plan.toLowerCase()} users</p>
                  <p className="text-3xl font-bold mb-4">
                    ${plan === 'Basic' ? '9' : plan === 'Pro' ? '29' : '99'}
                    <span className="text-sm font-normal">/month</span>
                  </p>
                  <ul className="mb-6 flex-grow">
                    <li className="flex items-center mb-2">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Feature 1
                    </li>
                    <li className="flex items-center mb-2">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Feature 2
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Feature 3
                    </li>
                  </ul>
                  <button className="w-full bg-purple-500 text-white rounded-md py-2 px-4 text-sm font-medium">
                    Select {plan}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
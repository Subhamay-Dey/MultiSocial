'use client'

import { CloudUpload, Clock, FileText, Grid, Menu, Plus, Settings, Users, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { IoClose } from "react-icons/io5"
import PricingSection from '@/components/pages-components/Pricing-Page'

export default function Component() {
  const [activeTab, setActiveTab] = useState('single')
  const [postText, setPostText] = useState('')
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
          <>
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-green-800">Connect your social media accounts to start posting</span>
            </div>
            <button className="btn btn-accent">Connect Accounts</button>
          </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent">
                Create a post
              </h2>
              <div className="flex justify-center items-center border-b border-gray-200 mb-6">
                <div className="tabs tabs-bordered">
                  <button
                    onClick={() => setActiveTab('single')}
                    className={`tab ${activeTab === 'single' ? 'tab-active' : ''}`}
                  >
                    Single File
                  </button>
                  <button
                    onClick={() => setActiveTab('text')}
                    className={`tab ${activeTab === 'text' ? 'tab-active' : ''}`}
                  >
                    Text Post
                  </button>
                  <button
                    onClick={() => setActiveTab('carousel')}
                    className={`tab ${activeTab === 'carousel' ? 'tab-active' : ''}`}
                  >
                    Carousel
                  </button>
                </div>
              </div>
              {activeTab === 'text' ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="relative">
                    <textarea
                      className="textarea textarea-bordered w-full min-h-[200px]"
                      placeholder="Start writing your post here..."
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
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
          </>
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
      case 'choose-plan':
        return (
          <PricingSection/>
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
              className="btn btn-accent w-full mb-6"
              onClick={() => setActiveView('new-post')}
            >
              <Plus className="w-5 h-5" />
              Create post
            </button>
          </div>
          
          <ul className="menu bg-base-200 rounded-box w-full">
            <li>
              <h2 className="menu-title">Content</h2>
              <ul>
                <li>
                  <a 
                    onClick={() => setActiveView('new-post')}
                    className={activeView === 'new-post' ? 'active' : ''}
                  >
                    <FileText className="w-5 h-5" />
                    New post
                  </a>
                </li>
                <li>
                  <a 
                    onClick={() => setActiveView('scheduled')}
                    className={activeView === 'scheduled' ? 'active' : ''}
                  >
                    <Clock className="w-5 h-5" />
                    Scheduled
                  </a>
                </li>
                <li>
                  <a 
                    onClick={() => setActiveView('posts')}
                    className={activeView === 'posts' ? 'active' : ''}
                  >
                    <Grid className="w-5 h-5" />
                    Posts
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="menu bg-base-200 rounded-box w-full mt-6">
            <li>
              <h2 className="menu-title">Configuration</h2>
              <ul>
                <li>
                  <a 
                    onClick={() => setActiveView('accounts')}
                    className={activeView === 'accounts' ? 'active' : ''}
                  >
                    <Users className="w-5 h-5" />
                    Accounts
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* Posts left indicator */}
        <div className="card bg-base-100 p-4">
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
            <span className="text-sm font-medium">5 posts left</span>
          </div>
          <progress className="progress progress-accent w-full" value="40" max="100"></progress>
        </div>
        {/* Upgrade to premium */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Upgrade to premium</h3>
            <p>Unlimited posting and scheduling for an unbeatable price.</p>
            <div className="card-actions justify-end">
              <button 
                onClick={() => setActiveView('choose-plan')}
                className="btn btn-accent btn-block"
              >
                Choose plan
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-8">
              <span>N</span>
            </div>
          </div>
          <div>
            <p className="font-medium">{session?.user.name}</p>
            <p className="text-xs opacity-70">Free Plan</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
      
    </div>
  )
}
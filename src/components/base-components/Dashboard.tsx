"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import LinkSocialMedia from '../pages-components/Socials'

function Dashboard() {

    const {data: session} = useSession()

    if(!session) {
        return
    }

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}</h1>
      <LinkSocialMedia />
    </div>
  )
}

export default Dashboard
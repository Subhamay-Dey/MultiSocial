import React from 'react'
import Navbar from './Navbar'
import Hero from '../pages-components/Hero'

function Home() {
  return (
    <div className='flex flex-col justify-center items-center'>
        <Navbar/>
        <Hero/>
    </div>
  )
}

export default Home
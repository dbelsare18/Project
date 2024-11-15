import React from 'react'
import image from '../Images/home.jpg'

import Navbar from './Navbar'
export default function Home() {
    const myStyle={
        backgroundImage:`url(${image})`,
        backgroundSize:'cover',
        backgroundRepeat:'no-reapeat',
        height:'100vh'
      }
  return (
    <div>
    <div style={myStyle}>
      <Navbar/>

    </div>
  
    </div>
  )
}

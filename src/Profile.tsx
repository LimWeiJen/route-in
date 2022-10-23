import React from 'react'
import { Navbar, Sidebar, Analytics } from './components'

const Profile = () => {
  

  return (
    <div className='wrapper'>
      <Navbar />
      <div className='main'>
        <Sidebar />
        <Analytics />
      </div>
    </div>
  )
}

export default Profile
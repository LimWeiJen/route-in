import { Navbar, Sidebar, TaskGroups } from './components'
import React from 'react'

const Home = () => {

  return (
    <div className='wrapper'>
      <Navbar />
      <div className='main'>
        <Sidebar />
        <TaskGroups />
      </div>
    </div>
  )
}

export default Home
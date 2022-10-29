import { Navbar, Sidebar, TaskGroups } from './components'
import React from 'react'

const Home = () => {

  return (
    <div>
      <Navbar />
      <main>
        <Sidebar />
        <TaskGroups />
      </main>
    </div>
  )
}

export default Home
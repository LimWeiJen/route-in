import { Navbar, Sidebar, TaskGroups } from './components'
import React, { useContext } from 'react'
import { UserContext } from './contexts/UserContext'

const Home = () => {
  const userContext = useContext(UserContext);

  return (
    <div className={userContext?.theme}>
      <Navbar />
      <main>
        <Sidebar />
        <TaskGroups />
      </main>
    </div>
  )
}

export default Home
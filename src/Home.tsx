import { Navbar, Sidebar, TaskGroups } from './components'
import React, { useContext } from 'react'
import { UserContext } from './contexts/UserContext'

const Home = () => {
  const userContext = useContext(UserContext);

  if (userContext?.isBusy) return null;
  return (
    <div className={userContext?.styles!.theme || 'light'}>
      <Navbar />
      <main>
        <Sidebar />
        <TaskGroups />
      </main>
    </div>
  )
}

export default Home
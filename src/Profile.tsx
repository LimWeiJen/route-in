import React, { useContext } from 'react'
import { Navbar, Sidebar, Analytics } from './components'
import { UserContext } from './contexts/UserContext'

const Profile = () => {
  const userContext = useContext(UserContext);

  if (userContext?.isBusy) return null;
  return (
    <div className={userContext?.styles!.theme}>
      <Navbar />
      <main>
        <Sidebar />
        <Analytics />
      </main>
    </div>
  )
}

export default Profile
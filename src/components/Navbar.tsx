import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const Navbar = () => {
  const userContext = useContext(UserContext);

  /**
   * @desc logs the user out of the website
   * 
   * @returns void
   */
  const _logout = () => {
    signOut(auth).then(() => location.href = '/');
  }

  return (
    <div>
      <button onClick={_logout}>sign out</button>
      <button onClick={userContext?.addNewTaskGroup}>new task group</button>
    </div>
  )
}

export default Navbar
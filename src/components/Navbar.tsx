import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import '../styles/navbar.scss'
import { PlusCircle } from 'react-feather'
import logo from '../images/Routine Tracker.svg'

const Navbar = () => {
  const userContext = useContext(UserContext);

  return (
    <div className='navbar'>
      <div className='left'>
        <img src={logo} />
        <h1>RouteIn</h1>
      </div>
      <div className='right'>
        <PlusCircle className='nav-btn' onClick={userContext?.addNewTaskGroup} />
        <img src={auth.currentUser?.photoURL || ''} />
      </div>
    </div>
  )
}

export default Navbar
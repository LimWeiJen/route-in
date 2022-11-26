import { auth } from '../firebase'
import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import '../styles/navbar.scss'
import { PlusCircle, ToggleLeft, ToggleRight } from 'react-feather'
import logo from '../images/Routine Tracker.svg'
import logoDark from '../images/Routine Tracker Dark.svg'

const Navbar = () => {
  const userContext = useContext(UserContext);

  return (
    <div className='navbar'>
      <div className='left'>
        <img alt='logo' src={userContext?.styles!.theme === 'light' ? logo : logoDark} />
        <h1>RouteIn</h1>
      </div>
      <div className='right'>
        <PlusCircle className='nav-btn ico' onClick={userContext?.addNewTaskGroup} />
        {userContext?.styles!.theme === 'light' ? 
        <ToggleLeft className='nav-btn ico' onClick={() => userContext?.switchTheme(userContext?.styles!.theme === 'light' ? 'dark' : 'light')} /> : 
        <ToggleRight className='nav-btn ico' onClick={() => userContext?.switchTheme(userContext?.styles!.theme === 'light' ? 'dark' : 'light')} />
        }
        <img alt='logo' src={auth.currentUser?.photoURL || ''} />
      </div>
    </div>
  )
}

export default Navbar
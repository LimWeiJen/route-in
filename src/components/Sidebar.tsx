import { signOut } from 'firebase/auth';
import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase';
import { LogOut, Settings, Home, User } from 'react-feather'
import '../styles/sidebar.scss'

const Sidebar = () => {

  /**
   * @desc logs the user out of the website
   * 
   * @returns void
   */
  const _logout = () => {
    signOut(auth).then(() => location.href = '/');
  }
  
  return (
    <div className='sidebar'>
      <Link to={'/home'} className='btn'>
        <div style={{backgroundColor: '#E73333'}} className='block'></div>
        <Home className='ico-btn white' />
        <p className='white'>Home</p>
      </Link>
      <Link to={'/edit-tasks/default'} className="btn">
        <div className='block'></div>
        <User className='ico-btn' />
        <p>Profile</p>
      </Link>
      <Link to={'/edit-tasks/default'} className="btn">
        <div className='block'></div>
        <Settings className='ico-btn' />
        <p>Settings</p>
      </Link>
      <div className='btn' onClick={_logout}>
        <div className='block'></div>
        <LogOut className='ico-btn' />
        <p>Log Out</p>
      </div>
    </div>
  )
}

export default Sidebar
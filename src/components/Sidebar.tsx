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
      <Link to={'/home'} style={{backgroundColor: '#E73333'}} className='btn'>
        <Home className='ico-btn white' />
      </Link>
      <Link to={'/edit-tasks/default'} className="btn">
        <User className='ico-btn' />
      </Link>
      <Link to={'/edit-tasks/default'} className="btn">
        <Settings className='ico-btn' />
      </Link>
      <div className='btn' onClick={_logout}>
        <LogOut className='ico-btn' />
      </div>
    </div>
  )
}

export default Sidebar
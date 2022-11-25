import { signOut } from 'firebase/auth';
import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase';
import { LogOut, Settings, Home, User } from 'react-feather'
import '../styles/sidebar.scss'

const Sidebar = () => {
  console.log(window.location.pathname)
  /**
   * @desc logs the user out of the website
   * 
   * @returns void
   */
  const _logout = () => {
    signOut(auth).then(() => window.location.href = '/');
  }
  
  return (
    <div className='sidebar'>
      <Link to={'/home'} style={window.location.pathname === "/home" ? {backgroundColor: '#E73333'} : {}} className='sidebar-btn'>
        <Home className={`${window.location.pathname === "/home" ? "ico-active" : ""} ico`} />
      </Link>
      <Link to={'/profile'}style={window.location.pathname === "/profile" ? {backgroundColor: '#17A1FA'} : {}} className="sidebar-btn">
        <User className={`${window.location.pathname === "/profile" ? "ico-active" : ""} ico`} />
      </Link>
      <Link to={'/settings'}style={window.location.pathname === "/settings" ? {backgroundColor: '#1BC02C'} : {}} className="sidebar-btn">
        <Settings className={`${window.location.pathname === "/settings" ? "ico-active" : ""} ico`} />
      </Link>
      <div className='sidebar-btn' onClick={_logout}>
        <LogOut className='ico' />
      </div>
    </div>
  )
}

export default Sidebar
import { signOut } from 'firebase/auth';
import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase';
import { LogOut, Settings, Home, User } from 'react-feather'
import '../styles/sidebar.scss'

const Sidebar = () => {
  console.log(location.pathname)
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
      <Link to={'/home'} style={location.pathname === "/home" ? {backgroundColor: '#E73333'} : {}} className='sidebar-btn'>
        <Home className={`${location.pathname === "/home" ? "white" : ""}`} />
      </Link>
      <Link to={'/profile'}style={location.pathname === "/profile" ? {backgroundColor: '#17A1FA'} : {}} className="sidebar-btn">
        <User className={`${location.pathname === "/profile" ? "white" : ""}`} />
      </Link>
      <div className='sidebar-btn'style={location.pathname === "/edit-tasks/default" ? {backgroundColor: '#1BC02C'} : {}} onClick={() => location.href="/edit-tasks/default"}>
        <Settings className={`${location.pathname === "/edit-tasks/default" ? "white" : ""}`} />
      </div>
      <div className='sidebar-btn' onClick={_logout}>
        <LogOut />
      </div>
    </div>
  )
}

export default Sidebar
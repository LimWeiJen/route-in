import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
      <div>
        <Link to={'/edit-tasks/default'}>Edit Tasks</Link>
        <Link to={'/home'}>Home</Link>
      </div>
    </div>
  )
}

export default Sidebar
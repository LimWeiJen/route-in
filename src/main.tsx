import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import EditTasks from './EditTasks'
import Home from './Home'
import Profile from './Profile'
import PageNotFound from './PageNotFound'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/edit-tasks/:id' element={<EditTasks />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

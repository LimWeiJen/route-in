import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Settings from './Settings'
import Home from './Home'
import Profile from './Profile'
import PageNotFound from './PageNotFound'
import './styles/global.scss'
import { UserProvider } from './contexts/UserContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <UserProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/home' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </UserProvider>
)

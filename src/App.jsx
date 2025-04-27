import { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import './App.css'

// Import page components
import HomePage from './pages/HomePage'
import SessionStoragePage from './pages/SessionStoragePage'
import LocalStoragePage from './pages/LocalStoragePage'
import IndexedDBPage from './pages/IndexedDBPage'
import CookiesPage from './pages/CookiesPage'

function App() {
  const [theme, setTheme] = useState('light')

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.body.setAttribute('data-theme', savedTheme)
    }
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.body.setAttribute('data-theme', newTheme)
  }

  return (
    <div className="app-container">
      <header>
        <h1>Примеры Хранилищ Браузера</h1>
        <p>Примеры работы хранилищ в браузере</p>
      </header>

      <nav className="tabs">
        <NavLink 
          to="/"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Главная
        </NavLink>
        <NavLink 
          to="/session"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Сессионное Хранилище
        </NavLink>
        <NavLink 
          to="/local"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Локальное Хранилище
        </NavLink>
        <NavLink 
          to="/indexeddb"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          IndexedDB
        </NavLink>
        <NavLink 
          to="/cookies"
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          Куки
        </NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/session" element={<SessionStoragePage />} />
          <Route path="/local" element={<LocalStoragePage theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/indexeddb" element={<IndexedDBPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
        </Routes>
      </main>

      <footer>
        <a href="https://technium.ru/">Техниум</a>
      </footer>
    </div>
  )
}

export default App

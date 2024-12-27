import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from "./pages/home"
import { TestRecordsProvider } from './contexts/testRecordsContext'

function App() {

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<TestRecordsProvider>
            <Home/>
            </TestRecordsProvider>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App

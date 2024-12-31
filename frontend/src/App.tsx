import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from "./pages/home"
import { Profile } from './pages/profile/Profile'
import { TestRecordsProvider } from './contexts/testRecordsContext'

function App() {

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<TestRecordsProvider>
            <Home/>
            </TestRecordsProvider>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App

import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import './App.css'

function App() {

  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App

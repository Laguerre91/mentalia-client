import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar/Navbar"
import SignupPage from "./pages/SignupPage"

import './App.css'

function App() {

  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  )
}

export default App

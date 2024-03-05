import { Routes, Route } from "react-router-dom"
import NavBar from "./components/Navbar/NavBar"
import "bootstrap/dist/css/bootstrap.css"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import './App.css'

function App() {

  return (
    <div className='App'>
      <NavBar />

      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App

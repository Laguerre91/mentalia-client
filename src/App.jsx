import { Routes, Route } from "react-router-dom"
import NavBar from "./components/Navbar/Navbar"
import "bootstrap/dist/css/bootstrap.css"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import './App.css'
import AppRoutes from './routes/AppRoutes'


function App() {

  return (
    <div className='App'>

      <NavBar />
      <AppRoutes />

    </div>
  )
}

export default App

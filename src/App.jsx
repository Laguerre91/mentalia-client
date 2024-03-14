import NavBar from "./components/Navbar/Navbar"
import "bootstrap/dist/css/bootstrap.css"
import './App.css'
import AppRoutes from './routes/AppRoutes'
import Footer from "./components/Footer/Footer"


function App() {

  return (
    <div className='App'>

      <NavBar />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App

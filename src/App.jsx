import NavBar from "./components/Navbar/Navbar"
import "bootstrap/dist/css/bootstrap.css"
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

import getCurrentUser from "./customHooks/getCurrentUser"
import MainRoutes from "./Routes/MainRoutes"

export const backendBaseURL = "http://localhost:8000/api/v1"

// import logo from './assets/EdGine_Logos/logo-transparent-png.png'
const App = () => {

  getCurrentUser()

  return (
    <div className="min-h-screen">
       {/* <Navbar/> */}
       <MainRoutes/>
    </div>
  )
}

export default App
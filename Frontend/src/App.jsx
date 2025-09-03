// import { useEffect } from "react"
import getCurrentUser from "./customHooks/getCurrentUser"
import MainRoutes from "./Routes/MainRoutes"

export const backendBaseURL = "http://localhost:8000/api/v1"


const App = () => {
  
  getCurrentUser();

  return (
    <div className="min-h-screen">

      

       {/* <Navbar/> */}
       <MainRoutes/>
    </div>
  )
}

export default App
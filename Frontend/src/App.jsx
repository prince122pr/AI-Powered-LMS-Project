import { useEffect } from "react"
import getCurrentUser from "./customHooks/getCurrentUser"
import MainRoutes from "./Routes/MainRoutes"
import { useSelector } from "react-redux"

export const backendBaseURL = "http://localhost:8000/api/v1"


const App = () => {

  let userData = useSelector((state) => state.user);

    useEffect(() => {
    if (userData?.token) {
      getCurrentUser();
    }
  }, [userData?.token]); // sirf tab chalega jab token change hoga
  
  return (
    <div className="min-h-screen">
       {/* <Navbar/> */}
       <MainRoutes/>
    </div>
  )
}

export default App
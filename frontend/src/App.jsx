
import {BrowserRouter , Routes , Route , Navigate} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoutes from "./components/ProtectedRoutes"

 function RegisterAndLogout(){
  localStorage.clear()
  return <RegisterPage/> 
 }
 function Logout(){
  localStorage.clear()
  return <Navigate to ="/login" />
 }
const App =() => {
  return (
    // pour utliser l'historique de navigation du navigateur
   <BrowserRouter>
  {/* definitions des routes qui vont etre utiliser dans notre application   */}
      <Routes>
        <Route
        path="/"
        element={
          <ProtectedRoutes>
            <HomePage/>
          </ProtectedRoutes>
        } 
        />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterAndLogout/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
   </BrowserRouter>
  )
}
export default App
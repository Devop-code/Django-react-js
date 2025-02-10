import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState,useEffect } from "react";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
    useEffect(()=>{
          auth().catch(()=>setAuthorized(false))
    },[])
  const [isAuthorize, setAuthorized] = useState(null);

  const refreshtokens = async () => {};
       const refreshtoken = localStorage.getItem(REFRESH_TOKEN)
       try{
         const res = async ()=> await  api.post("/api/token/refresh/",{
            refresh:refreshtoken,
         })
         if(res.status === 200 ){
            localStorage.setItem(ACCESS_TOKEN,res.data.access)
            setAuthorized(true)
         }
         else{
            setAuthorized(false)
         }
       }catch(error){
            console.log(error)
       }
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setAuthorized(false);
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) {
      await refreshtokens;
    } else {
      setAuthorized(true);
    }
  };
  if (isAuthorize === null) {
    return <div>Loading....</div>;
  }
  return isAuthorize ? children : <Navigate to="/login" />;
}
export default ProtectedRoute;

import { Outlet , Navigate } from "react-router-dom";


const useAuth = () => {
    const token = localStorage.getItem('token')
    let user = {loggedIn : true}
   
    if(!token){
         localStorage.removeItem('token')
           user = { loggedIn: false }
         
    }
       return user && user.loggedIn ;
}

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate  to='./register'  />
}

export default ProtectedRoute
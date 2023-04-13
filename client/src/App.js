import React from 'react';
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Site from './Site';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import ErrorPage from './components/Pages/ErrorPage';
import Welcome from './components/Pages/Welcome';
import ProtectedRoute from './components/Pages/ProtectedRoute';


 const App = () => {
  return (
    
      <Routes>

        <Route path="/"  element={<Welcome/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
       <Route element={<ProtectedRoute/>} >
          <Route path="/site" element={<Site/>} />
       </Route>
        <Route path="/*" element={<ErrorPage/>} />

      </Routes>
      
    
  )
}

export default App;
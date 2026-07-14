import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppContextProvider, useAppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AuthenticateEmail from "./pages/AuthenticateEmail";
import EmpDashboard from "./pages/EmpDashboard";
import EmpLogin from "./pages/EmpLogin";
import EmpPasswodChange from "./pages/EmpPasswodChange";

function AppRoutes() {
  const { isLoggedin, userData,empDetails } = useAppContext();

  return (
    <Routes>
      
      <Route path="/login" element = {(isLoggedin)? <Navigate to="/" /> : <Login />} />

      <Route path="/" element = {isLoggedin ? <Dashboard /> : <Navigate to="/login" />} />

      <Route path="/auth-account" element={ isLoggedin ? userData?.isAuthenticated ? <Navigate to="/" />  : <AuthenticateEmail />: <Navigate to="/login" /> }/>

      <Route path="/emp-login" element = { <EmpLogin/> }/>

      <Route path="/emp-dashboard" element = {  empDetails?.isFirstLogin  ? ( <Navigate to="/emp-change-password"/> ) : ( <EmpDashboard />) } />
      
      <Route  path="/emp-change-password" element={ empDetails?.isFirstLogin ? ( <EmpPasswodChange /> ) : ( <Navigate to="/emp-dashboard"/> )} />

    </Routes>
  );
}

export default function App() {
  return (
    <AppContextProvider>
      <AppRoutes />
      <ToastContainer position="top-right" />
    </AppContextProvider>
  );
}
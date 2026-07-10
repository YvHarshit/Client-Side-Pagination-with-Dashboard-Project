import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppContextProvider, useAppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AuthenticateEmail from "./pages/AuthenticateEmail";
import EmpDashboard from "./pages/EmpDashboard";
import EmpLogin from "./pages/EmpLogin";

function AppRoutes() {
  const { isLoggedin, userData } = useAppContext();

  return (
    <Routes>
      
      <Route path="/login" element = {(isLoggedin)? <Navigate to="/" /> : <Login />} />

      <Route path="/" element = {isLoggedin ? <Dashboard /> : <Navigate to="/login" />} />

      <Route path="/auth-account" element={ isLoggedin ? userData?.isAuthenticated ? <Navigate to="/" />  : <AuthenticateEmail />: <Navigate to="/login" /> }/>

      <Route path="/emp-dashboard" element = { <EmpDashboard/> }/>

      <Route path="/emp-login" element = { <EmpLogin/> }/>

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
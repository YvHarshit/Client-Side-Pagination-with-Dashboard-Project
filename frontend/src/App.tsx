import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppContextProvider, useAppContext } from "./context/AppContext";
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Admin/Login";
import AuthenticateEmail from "./pages/Admin/AuthenticateEmail";
import EmpDashboard from "./pages/Employee/EmpProfile";
import EmpLogin from "./pages/Employee/EmpLogin";
import EmpPasswodChange from "./pages/Employee/EmpPasswodChange";
import MainEmpDas from "./pages/Employee/EmpDashboard";
import ApplyLeave from "./pages/Employee/ApplyLeave";
import MyLeaves from "./pages/Employee/MyLeaves";
import AdminLeave from "./pages/Admin/AdminLeave";
import CompanyAnalytics from "./pages/Admin/CompanyAnalytics";
import EmpAttendance from "./pages/Employee/EmpAttendance"
import Testimonials from "./pages/Admin/Testimonials";
import About from "./pages/Admin/About";

function AppRoutes() {
  const { isLoggedin, userData,empDetails } = useAppContext();

  return (
    <Routes>
      
      <Route path="/login" element = {(isLoggedin)? <Navigate to="/" /> : <Login />} />

      <Route path="/" element = {isLoggedin ? <Dashboard /> : <Navigate to="/login" />} />

      <Route path="/auth-account" element={ isLoggedin ? userData?.isAuthenticated ? <Navigate to="/" />  : <AuthenticateEmail />: <Navigate to="/login" /> }/>

      <Route path="/emp-login" element = { <EmpLogin/> }/>

      <Route path="/emp-dashboard" element = {  empDetails?.isFirstLogin  ? ( <Navigate to="/emp-change-password"/> ) : ( <MainEmpDas />) } />
      
      <Route  path="/emp-change-password" element={ empDetails?.isFirstLogin ? ( <EmpPasswodChange /> ) : ( <Navigate to="/emp-dashboard"/> )} />

      <Route path="/profile" element={<EmpDashboard/>}/>

      <Route path = "/emp/apply-leave" element={<ApplyLeave/>} />

      <Route path= "/emp/my-leaves" element = { <MyLeaves/>}/>

      <Route path="/admin/leaves" element={<AdminLeave />} />

      <Route path="/company/analytics" element ={<CompanyAnalytics/>}/>

      <Route path = "/emp/attendance" element = {<EmpAttendance/>}/>

      <Route path="/testimonials" element={<Testimonials />} />

      <Route path="/about" element={<About />} />      

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
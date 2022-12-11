import React from "react"; 
import {
  BrowserRouter,
  Route, 
  Routes
} from "react-router-dom";  
import LandingPage from "./mainComponents/LandingPage/LandingPage";   
import DispatchersDashboard from "./mainComponents/DispatchersDashboard/DispatchersDashboard"; 
import StaffDashboard from "./mainComponents/StaffDashboard/StaffDashboard";

const App = () => {
  return (
    <BrowserRouter>
         <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/dispatchers-dashboard" element={<DispatchersDashboard />}/>
          <Route path="/staff-dashboard" element={<StaffDashboard />}/>
          </Routes>
    </BrowserRouter>
  );
}
export default App;

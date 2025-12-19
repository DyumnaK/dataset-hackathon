import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import PatientDetail from "./PatientDetail";
import AddPatientForm from "./AddPatientForm";
import Home from "./Home";
import AACBoardBuilder from "./aac/AACBoardBuilder";
import ScheduleHome from "./schedule/ScheduleHome";
import ScheduleEditor from "./schedule/ScheduleEditor";

import "./styles/aac.css";
import "./styles/aacTheme.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing & Authentication */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Professional Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Patient Management */}
        <Route path="/add-patient" element={<AddPatientForm />} />
        <Route path="/patient/:patientId" element={<PatientDetail />} />
        
        {/* Modules */}
        <Route path="/app" element={<Home />} />
        <Route path="/aac" element={<AACBoardBuilder />} />
        <Route path="/schedule" element={<ScheduleHome />} />
        <Route path="/schedule/:id" element={<ScheduleEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

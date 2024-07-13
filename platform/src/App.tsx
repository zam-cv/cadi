import { BrowserRouter, Routes, Route } from "react-router-dom";
// Importing your components from the new path
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Facturacion from './pages/Facturacion';
import InscripcionAlumno from './pages/InscripcionAlumno';
import InscripcionTerapeuta from './pages/InscripcionTerapeuta';
import Pagos from './pages/Pagos';
import Calculadora from './pages/Calculadora';
import ReportesAlumnos from './pages/ReportesAlumnos';
import ReportesIndustria from './pages/ReportesIndustria';
import Profiles from './pages/Profiles';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/facturacion" element={<Facturacion />} />
        <Route path="/inscripcion_alumno" element={<InscripcionAlumno />} />
        <Route path="/inscripcion_terapeuta" element={<InscripcionTerapeuta />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/calculadora" element={<Calculadora />} />
        <Route path="/reportes_alumnos" element={<ReportesAlumnos />} />
        <Route path="/reportes_industria" element={<ReportesIndustria />} />
        <Route path="/profiles" element={<Profiles />}>
          <Route path=":profileId" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LayoutSystem from "./components/LayoutSystem";
import "./App.css";

// security
import Protected from "./components/Protected";
import Unprotected from "./components/Unprotected";

// providers
import SettingsProvider from "./providers/SettingsProvider";
import AuthProvider from "./providers/AuthProvider";

// pages
import Login from "./pages/Login";
import Home from "./pages/Home";

import EnrollStudents from "./pages/Home/EnrollStudents";
import EnrollTherapists from "./pages/Home/EnrollTherapists";
import EnrollRelatives from "./pages/Home/EnrollRelatives";
import MakeProductionReports from "./pages/Home/MakeProductionReports";
import MakeReports from "./pages/Home/MakeReports";
import SeeCalculator from "./pages/Home/SeeCalculator";
import SeeDashboard from "./pages/Home/SeeDashboard";
import SeeProductionReports from "./pages/Home/SeeProductionReports";
import SeeReports from "./pages/Home/SeeReports";
import SeeReportsAsRelative from "./pages/Home/SeeReportsAsRelative";
import SeeStudents from "./pages/Home/SeeStudents";
import SeeTherapists from "./pages/Home/SeeTherapists";

function App() {
  return (
    <SettingsProvider>
      <LayoutSystem>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Login */}
                <Route
                  index
                  path="/"
                  element={
                    <Unprotected>
                      <Login />
                    </Unprotected>
                  }
                />

                {/* Home */}
                <Route
                  path="/home"
                  element={
                    <Protected>
                      <Home />
                    </Protected>
                  }
                />

                <Route
                  path="/enroll_students"
                  element={
                    <Protected>
                      <EnrollStudents />
                    </Protected>
                  }
                />

                <Route
                  path="/enroll_therapists"
                  element={
                    <Protected>
                      <EnrollTherapists />
                    </Protected>
                  }
                />

                <Route
                  path="/enroll_relatives"
                  element={
                    <Protected>
                      <EnrollRelatives />
                    </Protected>
                  }
                />

                <Route
                  path="/make_production_reports"
                  element={
                    <Protected>
                      <MakeProductionReports />
                    </Protected>
                  }
                />

                <Route
                  path="/make_reports"
                  element={
                    <Protected>
                      <MakeReports />
                    </Protected>
                  }
                />

                <Route
                  path="/see_calculator"
                  element={
                    <Protected>
                      <SeeCalculator />
                    </Protected>
                  }
                />

                <Route
                  path="/see_dashboard"
                  element={
                    <Protected>
                      <SeeDashboard />
                    </Protected>
                  }
                />

                <Route
                  path="/see_production_reports"
                  element={
                    <Protected>
                      <SeeProductionReports />
                    </Protected>
                  }
                />

                <Route
                  path="/see_reports"
                  element={
                    <Protected>
                      <SeeReports />
                    </Protected>
                  }
                />

                <Route
                  path="/see_reports_as_relative"
                  element={
                    <Protected>
                      <SeeReportsAsRelative />
                    </Protected>
                  }
                />

                <Route
                  path="/see_students"
                  element={
                    <Protected>
                      <SeeStudents />
                    </Protected>
                  }
                />

                <Route
                  path="/see_therapists"
                  element={
                    <Protected>
                      <SeeTherapists />
                    </Protected>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LayoutSystem>
    </SettingsProvider >
  );
}

export default App;

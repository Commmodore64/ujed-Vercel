import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/dashboard/Index";
import Payments from "./components/payments/Index";
import Administrator from "./components/administrator/Index";
import Template from "./components/payments/Template";
import CourseInfo from "./components/dashboard/CourseInfo";
import Queries from "./components/queries/Index";
import { Toaster } from 'sonner';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <div className="flex h-screen">
        <div className="flex-1 bg-white overflow-y-auto">
          <div className="mx-auto">
            <Routes>
              <Route
                path="/"
                element={isAuthenticated ? <Navigate to="/dashboard" /> : <HomePage />}
              />
              <Route path="/profile" element={<Profile />}/>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/admin" element={<Administrator />} />
              <Route path="/template" element={<Template />} />
              <Route path="/courseinfo" element={<CourseInfo />} />
              <Route path="/queries" element={<Queries />} />
              {/* <Route path="/settings" element={<Settings />} /> */}
            </Routes>
            <Toaster position="top-right" />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
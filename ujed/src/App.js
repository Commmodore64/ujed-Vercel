import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Sidebar from "./components/sidebar/Index";
import Dashboard from "./components/dashboard/Index";
import Payments from "./components/payments/Index";
import Administrator from "./components/administrator/Index";
import { Toaster } from 'sonner';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <div className="flex h-screen">
        {isAuthenticated && <Sidebar />}
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
              {/* <Route path="/settings" element={<Settings />} /> */}
              {/* Agrega más rutas según sea necesario */}
            </Routes>
            <Toaster position="top-right" />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

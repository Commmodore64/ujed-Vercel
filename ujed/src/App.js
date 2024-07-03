import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './components/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import { Navigate } from 'react-router-dom';

function App() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/profile" /> : <HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

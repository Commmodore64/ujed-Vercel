import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './components/Profile';
import LogoutButton from './components/LogoutButton';

function App() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <div className="App">
      <h1>React App</h1>
      <button onClick={() => loginWithRedirect()}>login</button>
      <Profile />
      {isAuthenticated && <LogoutButton />}
    </div>
  );
}

export default App;

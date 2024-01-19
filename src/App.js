import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import BottomNavBar from './components/BottomNavBar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ConfirmSignUp from './pages/ConfirmSignUp';
import Profile from './pages/Profile';
import { AuthProvider } from './services/AuthContext';
import RouteGuard from './RouteGuard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <AuthProvider>
 
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/confirm-sign-up" element={<ConfirmSignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset-password" element={<ResetPassword/>}/>
            <Route path="/profile" element={
              <RouteGuard>
                <Profile/>
              </RouteGuard>
            } />
          </Routes>
          <BottomNavBar />
        </div>
      </Router>

    </AuthProvider>
  );
}

export default App;

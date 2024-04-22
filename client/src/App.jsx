import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LogInPage from './Pages/LogInPage';
import RegistrationPage from './Pages/RegistrationPage';
import NotFoundPage from './Pages/NotFoundPage';
import { isAuthenticated } from './Utility/Helper';

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {

      console.log('Token is valid')

      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  const userInfo = (useremail, logeed) => {
    setUserEmail(useremail);
    setLogged(logeed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogged(false);
    setUserEmail('');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <HomePage userEmail={userEmail} handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={ isAuthenticated() ? ( <Navigate to="/" /> ) : (<LogInPage userInfo={userInfo} /> )} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

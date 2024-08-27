import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserPanel from './components/UserPanel';
import AdminPanel from './components/AdminPanel';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginForm onSwitch={toggleForm} />}
        />
        <Route
          path="/register"
          element={<RegisterForm onSwitch={toggleForm} />}
        />
        <Route
          path="/admin"
          element={<AdminPanel />}
        />
        <Route
          path="/user"
          element={<UserPanel />}
        />
        <Route
          path="/"
          element={isLogin ? <LoginForm onSwitch={toggleForm} /> : <RegisterForm onSwitch={toggleForm} />}
        />
      </Routes>
    </Router>
  );

}

export default App;

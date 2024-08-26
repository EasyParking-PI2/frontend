import React, { useState } from 'react';
import Container from '@mui/material/Container';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ParkingGrid from './components/ParkingGrid';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const handleLogin = () => {
    setCurrentPage('vagas');
  };

  const handleRegister = () => {
    setCurrentPage('login'); // Redireciona para a tela de login após o registro
  };

  return (
    <Container>
      {currentPage === 'login' && (
        <LoginForm onSubmit={handleLogin} onSwitch={() => setCurrentPage('register')} />
      )}

      {currentPage === 'register' && (
        <RegisterForm onSubmit={handleRegister} onSwitch={() => setCurrentPage('login')} />
      )}

      {currentPage === 'vagas' && <ParkingGrid />}
    </Container>
  );
}

export default App;

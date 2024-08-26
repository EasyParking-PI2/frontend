import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';  // Adicionado para navegação

function LoginForm({ onSwitch }) {
   const [formData, setFormData] = useState({
      login: '',
      password: '',
   });

   const navigate = useNavigate();  // Hook de navegação

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const data = await loginUser(formData);

         // Salva o token no localStorage
         localStorage.setItem('authToken', data.token);
         localStorage.setItem('user', JSON.stringify({
            login: formData.login,
            ...data.user
         }));

         alert('Login bem-sucedido!');

         // Redirecionar para a tela de admin ou usuário após o login
         if (formData.login === 'admin') {
            navigate('/admin');  // Redireciona para o painel do admin
         } else {
            navigate('/user');   // Redireciona para o painel do usuário
         }
      } catch (error) {
         console.error('Erro ao fazer login:', error);
         alert('Erro ao fazer login');
      }
   };

   return (
      <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh" mt={8}>
         <Card sx={{ maxWidth: 400, width: '100%', bgcolor: '#f5f5f5', boxShadow: 3 }}>
            <CardContent>
               <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Typography variant="h5" component="div" gutterBottom align="center">
                     Login
                  </Typography>
                  <TextField
                     name="login"
                     label="Login"
                     value={formData.login}
                     onChange={handleChange}
                     fullWidth
                     required
                     sx={{ mb: 2 }}
                  />
                  <TextField
                     name="password"
                     label="Senha"
                     type="password"
                     value={formData.password}
                     onChange={handleChange}
                     fullWidth
                     required
                     sx={{ mb: 2 }}
                  />
                  <Button type="submit" variant="contained" fullWidth>
                     Login
                  </Button>
               </Box>
               <Button onClick={onSwitch} fullWidth sx={{ mt: 2 }}>
                  Não tem uma conta? Registre-se
               </Button>
            </CardContent>
         </Card>
      </Box>
   );
}

export default LoginForm;

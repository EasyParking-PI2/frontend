import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function RegisterForm({ onSubmit, onSwitch }) {
   const [formData, setFormData] = useState({
      login: '',
      password: '',
      name: '',
      email: '',
      cpf: '',
      phone: '',
   });

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit();
   };

   return (
      <Box display="flex" justifyContent="center" alignItems="flex-start" height="100vh" mt={8}>
         <Card sx={{ maxWidth: 400, width: '100%', bgcolor: '#f5f5f5', boxShadow: 3 }}>
            <CardContent>
               <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Typography variant="h5" component="div" gutterBottom align="center">
                     Registrar
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
                  <TextField
                     name="name"
                     label="Nome"
                     value={formData.name}
                     onChange={handleChange}
                     fullWidth
                     required
                     sx={{ mb: 2 }}
                  />
                  <TextField
                     name="email"
                     label="Email"
                     value={formData.email}
                     onChange={handleChange}
                     fullWidth
                     required
                     sx={{ mb: 2 }}
                  />
                  <TextField
                     name="cpf"
                     label="CPF"
                     value={formData.cpf}
                     onChange={handleChange}
                     fullWidth
                     required
                     sx={{ mb: 2 }}
                  />
                  <TextField
                     name="phone"
                     label="Telefone"
                     value={formData.phone}
                     onChange={handleChange}
                     fullWidth
                     required
                     sx={{ mb: 2 }}
                  />
                  <Button type="submit" variant="contained" fullWidth>
                     Registrar
                  </Button>
               </Box>
               <Button onClick={onSwitch} fullWidth sx={{ mt: 2 }}>
                  Já tem uma conta? Faça Login
               </Button>
            </CardContent>
         </Card>
      </Box>
   );
}

export default RegisterForm;

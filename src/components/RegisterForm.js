import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createUser } from '../services/api';
import { Link } from '@mui/material';

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

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         await createUser(formData);
         alert('Usuário registrado com sucesso!');
         onSwitch();
      } catch (error) {
         console.error('Erro ao registrar usuário:', error);
         alert('Erro ao registrar usuário');
      }
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
                     type='email'
                  />
                  <TextField
                     name="cpf"
                     label="CPF"
                     value={formData.cpf}
                     onChange={(e) => {
                        let cpf = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito

                        if (cpf.length > 3 && cpf.length <= 6) {
                           cpf = cpf.replace(/(\d{3})(\d+)/, '$1.$2');
                        } else if (cpf.length > 6 && cpf.length <= 9) {
                           cpf = cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
                        } else if (cpf.length > 9) {
                           cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
                        }

                        setFormData({ ...formData, cpf });
                     }}
                     fullWidth
                     required
                     sx={{ mb: 2 }}
                     inputProps={{ "maxLength": 14 }}

                  />
                  <TextField
                     name="phone"
                     label="Telefone"
                     value={formData.phone}
                     onChange={(e) => {
                        let phone = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito

                        if (phone.length > 0 && phone.length <= 2) {
                           phone = phone.replace(/(\d{2})/, '($1) ');
                        } else if (phone.length > 2 && phone.length <= 7) {
                           phone = phone.replace(/(\d{2})(\d+)/, '($1) $2');
                        } else if (phone.length > 7) {
                           phone = phone.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
                        }

                        setFormData({ ...formData, phone });
                     }}
                     fullWidth
                     required
                     sx={{ mb: 2 }}
                     inputProps={{ "maxLength": 15 }}
                  />
                  <Button type="submit" variant="contained" fullWidth>
                     Registrar
                  </Button>
               </Box>
               <Link href="/login">
                  Já tem uma conta? Faça Login
               </Link>
            </CardContent>
         </Card>
      </Box>
   );
}

export default RegisterForm;

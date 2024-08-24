import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function LoginForm({ onSubmit, onSwitch }) {
   const [formData, setFormData] = useState({
      email: '',
      password: '',
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
                     Login
                  </Typography>
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

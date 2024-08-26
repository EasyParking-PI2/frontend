import React from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
   const navigate = useNavigate();
   const user = JSON.parse(localStorage.getItem('user'));

   const handleLogout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      navigate('/login');
   };

   return (
      <Box
         sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: 16,
            right: 72, // Move a posição para a esquerda
            padding: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adiciona um fundo com leve transparência
            borderRadius: '12px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' // Adiciona uma leve sombra
         }}
      >
         <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            {user?.login.charAt(0).toUpperCase()}
         </Avatar>
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="subtitle1" sx={{ lineHeight: '1' }}>
               {user?.login}
            </Typography>
            <Button
               variant="contained"
               color="error"
               size="small"
               onClick={handleLogout}
               sx={{
                  mt: 0.5,
                  borderRadius: '8px',
                  padding: '4px 8px',
                  fontSize: '0.75rem',
               }}
            >
               DESLOGAR
            </Button>
         </Box>
      </Box>
   );
};

export default UserProfile;

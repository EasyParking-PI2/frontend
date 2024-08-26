import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ParkingSlot from './ParkingSlot';
import Chip from '@mui/material/Chip';

function ParkingGrid() {
   const [userLogin, setUserLogin] = useState('');

   // Extrair o login do usuário do localStorage
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.user && user.user.login) {
         setUserLogin(user.user.login);
      }
   }, []);

   const handleLogout = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      window.location.reload();
   };

   const slots = [
      { id: 1, occupied: false },
      { id: 2, occupied: true },
      { id: 3, occupied: false },
      { id: 4, occupied: true },
   ];

   return (
      <Box sx={{ padding: 4 }}>
         <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" gutterBottom>
               Easy Parking - Vagas Disponíveis
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
               {userLogin && (
                  <>
                     <Chip
                        label={`Logado como: ${userLogin}`}
                        variant="outlined"
                        color="primary"
                        sx={{ borderRadius: '16px', padding: '8px 16px', mb: 1 }}
                     />
                     <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={handleLogout}
                     >
                        Sair
                     </Button>
                  </>
               )}
            </Box>
         </Box>
         <Button variant="contained" color="primary" onClick={() => alert('Adicionar vaga')} sx={{ mb: 3 }}>
            Adicionar Vaga
         </Button>
         <Grid container spacing={3}>
            {slots.map((slot) => (
               <Grid item xs={12} sm={6} md={4} lg={3} key={slot.id}>
                  <ParkingSlot slot={slot} />
               </Grid>
            ))}
         </Grid>
      </Box>
   );
}

export default ParkingGrid;

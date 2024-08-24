import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import ParkingSlot from './ParkingSlot';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ParkingGrid() {
   const [slots, setSlots] = useState([
      { id: 1, occupied: false },
      { id: 2, occupied: true },
      { id: 3, occupied: false },
      { id: 4, occupied: true },
   ]);

   const addSlot = () => {
      const newSlot = { id: slots.length + 1, occupied: false };
      setSlots([...slots, newSlot]);
   };

   return (
      <Box sx={{ padding: 4 }}>
         <Typography variant="h4" gutterBottom>
            Easy Parking - Vagas Disponíveis
         </Typography>
         <Button variant="contained" color="primary" onClick={addSlot} sx={{ mb: 3 }}>
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

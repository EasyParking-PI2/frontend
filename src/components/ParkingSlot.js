import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ParkingSlot({ slot }) {
   return (
      <Box
         sx={{
            border: '1px solid',
            borderColor: slot.occupied ? 'red' : 'green',
            backgroundColor: slot.occupied ? '#ffebee' : '#e8f5e9',
            padding: 2,
            textAlign: 'center',
            borderRadius: 2,
         }}
      >
         <Typography variant="h6">
            Vaga {slot.id}
         </Typography>
         <Typography variant="body1">
            {slot.occupied ? 'Ocupada' : 'Livre'}
         </Typography>
      </Box>
   );
}

export default ParkingSlot;

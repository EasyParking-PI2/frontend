import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme, occupied }) => ({
   backgroundColor: occupied ? theme.palette.error.dark : theme.palette.success.light,
   color: theme.palette.getContrastText(occupied ? theme.palette.error.light : theme.palette.success.light),
   minWidth: 275,
   textAlign: 'center',
   boxShadow: occupied ? '0 0 10px rgba(255,0,0,0.5)' : '0 0 10px rgba(0,255,0,0.5)',
   transition: 'transform 0.3s',
   '&:hover': {
      transform: 'scale(1.05)',
   },
}));

function ParkingSlot({ slot, onClick }) {

   const ocupada = slot.status === 'ocupada';

   return (
      <StyledCard
         occupied={ocupada ? true : false}
         onClick={() => onClick(slot)}
      >
         <CardContent>
            <Typography variant="h5" component="div">
               Vaga {slot.numero}
            </Typography>
            <Typography variant="body1">
               Categoria: {slot.categoria.charAt(0).toUpperCase() + slot.categoria.slice(1)}
            </Typography>
            <Typography variant="body1">
               Status: {ocupada ? 'Ocupada' : 'Disponível'}
            </Typography>
         </CardContent>
      </StyledCard>
   );
}

export default ParkingSlot;

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function VehicleCard({ vehicle }) {
   return (
      <Card>
         <CardContent>
            <Typography variant="h6" component="div">
               {vehicle.modelo} - {vehicle.placa}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               Marca: {vehicle.marca}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               Categoria: {vehicle.categoria}
            </Typography>
         </CardContent>
      </Card>
   );
}

export default VehicleCard;

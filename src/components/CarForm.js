import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function CarForm() {
   const [carData, setCarData] = useState({
      modelo: '',
      marca: '',
      placa: '',
      categoria: '',
   });

   const handleChange = (e) => {
      setCarData({
         ...carData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // Aqui você faria a requisição POST para o backend
      console.log('Carro cadastrado:', carData);
   };

   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
         <TextField
            name="modelo"
            label="Modelo"
            value={carData.modelo}
            onChange={handleChange}
            fullWidth
            required
         />
         <TextField
            name="marca"
            label="Marca"
            value={carData.marca}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mt: 2 }}
         />
         <TextField
            name="placa"
            label="Placa"
            value={carData.placa}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mt: 2 }}
         />
         <TextField
            name="categoria"
            label="Categoria"
            value={carData.categoria}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mt: 2 }}
         />
         <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            Cadastrar Veiculo
         </Button>
      </Box>
   );
}

export default CarForm;

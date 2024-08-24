import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function SlotForm() {
   const [slotData, setSlotData] = useState({
      id: '',
      occupied: false,
   });

   const handleChange = (e) => {
      setSlotData({
         ...slotData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // Aqui você faria a requisição POST para o backend
      console.log('Vaga cadastrada:', slotData);
   };

   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
         <TextField
            name="id"
            label="ID da Vaga"
            value={slotData.id}
            onChange={handleChange}
            fullWidth
            required
         />
         <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            Cadastrar Vaga
         </Button>
      </Box>
   );
}

export default SlotForm;

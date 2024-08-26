import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

function EstacionarModal({ open, onClose, onPark, slot }) {
   const [placa, setPlaca] = useState('');

   const handlePark = async () => {
      try {
         const token = localStorage.getItem('authToken');

         // Envia a placa e o número da vaga para a função onPark
         onPark(placa);

         // Limpa o input após estacionar
         setPlaca('');

         // Fecha o modal após estacionar
         onClose();

         // Faz a requisição para o backend
         const response = await axios.post(
            'http://localhost:5000/api/vagas/estacionar',
            {
               placa: placa,
               numeroVaga: slot.numero, // Utiliza slot.numero em vez de selectedSlot.numero
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
            }
         );

         // Atualiza o estado da vaga com as novas informações
         const updatedSlot = response.data;
         console.log(updatedSlot)

         // Fecha o modal
         onClose();
      } catch (error) {
         console.error('Erro ao estacionar veículo:', error);
      }
   };

   return (
      <Modal open={open} onClose={onClose}>
         <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2
         }}>
            <Typography variant="h6" gutterBottom>
               Estacionar veículo na vaga {slot ? slot.numero : ''}
            </Typography>
            <TextField
               label="Placa"
               fullWidth
               margin="normal"
               value={placa}
               onChange={(e) => setPlaca(e.target.value)}
            />
            <Box mt={2} display="flex" justifyContent="space-between">
               <Button variant="contained" color="success" onClick={handlePark}>
                  Estacionar
               </Button>
               <Button variant="outlined" onClick={onClose}>
                  Cancelar
               </Button>
            </Box>
         </Box>
      </Modal>
   );
}

export default EstacionarModal;

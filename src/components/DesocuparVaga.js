import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

function DesocuparModal({ open, onClose, slot }) {
   const [placa, setPlaca] = useState('');

   const handleUnPark = async () => {
      try {
         const token = localStorage.getItem('authToken');

         // Faz a requisição para o backend
         const response = await axios.post(
            'http://localhost:5000/api/vagas/desocupar',
            {
               placa: placa,
               numeroVaga: slot.numero, // Utiliza slot.numero
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
            }
         );

         // Exibe as informações de tempo e custo
         alert(`Tempo estacionado: ${response.data.tempoEstacionado}\nValor a pagar: R$ ${response.data.valor}`);

         // Atualiza a vaga como desocupada e fecha o modal
         onClose();
      } catch (error) {
         console.error('Erro ao desocupar veículo:', error);
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
               Desocupar veículo da vaga {slot ? slot.numero : ''}
            </Typography>
            <TextField
               label="Placa"
               fullWidth
               margin="normal"
               value={placa}
               onChange={(e) => setPlaca(e.target.value)}
            />
            <Box mt={2} display="flex" justifyContent="space-between">
               <Button variant="contained" color="error" onClick={handleUnPark}>
                  Desocupar
               </Button>
               <Button variant="outlined" onClick={onClose}>
                  Cancelar
               </Button>
            </Box>
         </Box>
      </Modal>
   );
}

export default DesocuparModal;

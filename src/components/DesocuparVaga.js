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

         const dataHoraEntrada = new Date(response.data.dataHoraEntrada).getTime();
         const dataHoraSaida = new Date(response.data.dataHoraSaida).getTime();

         const dataHoraTotal = (dataHoraSaida - dataHoraEntrada) / 1000;

         // Calcula horas, minutos e segundos
         const horas = Math.floor(dataHoraTotal / 3600);
         const minutos = Math.floor((dataHoraTotal % 3600) / 60);
         const segundos = Math.floor(dataHoraTotal % 60);

         // Formata para HH:MM:SS
         const horasFormatadas = String(horas).padStart(2, '0');
         const minutosFormatados = String(minutos).padStart(2, '0');
         const segundosFormatados = String(segundos).padStart(2, '0');

         const tempoTotalFormatado = `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
         console.log(response.data);

         // Exibe as informações de tempo e custo
         alert(`Tempo estacionado: ${tempoTotalFormatado} \n Valor a pagar: R$ ${response.data.valor}`);

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

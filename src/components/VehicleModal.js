import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

function VehicleModal({ open, onClose, onSuccess }) {
   const [modelo, setModelo] = useState('');
   const [marca, setMarca] = useState('');
   const [placa, setPlaca] = useState('');
   const [categoria, setCategoria] = useState('');

   const handleAddVehicle = async () => {
      const token = localStorage.getItem('authToken');

      try {
         const response = await axios.post(
            'http://localhost:5000/api/veiculos',
            {
               modelo,
               marca,
               placa,
               categoria,
            },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
            }
         );
         onSuccess(response.data); // Chama a função de sucesso ao adicionar o veículo
         onClose();
      } catch (error) {
         console.error('Erro ao adicionar veículo:', error);
         alert('Erro ao adicionar o veículo. Tente novamente.');
      }
   };

   return (
      <Modal open={open} onClose={onClose}>
         <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,  // Largura do card
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,  // Arredondar os cantos
         }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
               Adicionar Veículo
            </Typography>
            <TextField
               label="Modelo"
               value={modelo}
               onChange={(e) => setModelo(e.target.value)}
               fullWidth
               margin="normal"
            />
            <TextField
               label="Marca"
               value={marca}
               onChange={(e) => setMarca(e.target.value)}
               fullWidth
               margin="normal"
            />
            <TextField
               label="Placa"
               value={placa}
               onChange={(e) => setPlaca(e.target.value)}
               fullWidth
               margin="normal"
            />
            <TextField
               label="Categoria"
               value={categoria}
               onChange={(e) => setCategoria(e.target.value)}
               fullWidth
               margin="normal"
            />
            <Button
               variant="contained"
               color="primary"
               onClick={handleAddVehicle}
               fullWidth
               sx={{ mt: 2 }}
            >
               Adicionar
            </Button>
         </Box>
      </Modal>
   );
}

export default VehicleModal;
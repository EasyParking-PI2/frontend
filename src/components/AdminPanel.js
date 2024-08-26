import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import ParkingSlot from './ParkingSlot';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import UserProfile from './UserProfile';

function AdminPanel() {
   const [slots, setSlots] = useState([]);
   const [loading, setLoading] = useState(true);
   const [selectedCategory, setSelectedCategory] = useState('carro');
   const [open, setOpen] = useState(false);

   useEffect(() => {
      fetchSlots();
   }, []);

   const fetchSlots = async () => {
      setLoading(true);
      const token = localStorage.getItem('authToken');

      try {
         const response = await axios.get('http://localhost:5000/api/vagas', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         setSlots(response.data);
      } catch (error) {
         console.error('Erro ao carregar as vagas:', error);
         alert('Não foi possível carregar as vagas. Por favor, tente novamente mais tarde.');
      } finally {
         setLoading(false);
      }
   };

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const handleAddSlot = async () => {
      const token = localStorage.getItem('authToken');
      const newSlotNumber = slots.length > 0 ? Math.max(...slots.map(slot => slot.numero)) + 1 : 1;
      const newSlot = {
         numero: newSlotNumber,
         categoria: selectedCategory,
         ocupado: false,
      };

      try {
         const response = await axios.post('http://localhost:5000/api/vagas', newSlot, {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
         });
         setSlots([...slots, response.data]); // Adiciona ao final da lista
         alert(`Vaga número ${newSlotNumber} adicionada com sucesso!`);
         handleClose(); // Fechar o modal após adicionar a vaga
      } catch (error) {
         console.error('Erro ao adicionar a vaga:', error);
         alert('Não foi possível adicionar a vaga. Por favor, tente novamente.');
      }
   };

   const handleDeleteSlot = async () => {
      const token = localStorage.getItem('authToken');
      if (slots.length === 0) {
         alert('Não há vagas para excluir.');
         return;
      }

      const slotToDelete = slots[slots.length - 1]; // Seleciona a última vaga para excluir

      try {
         await axios.delete(`http://localhost:5000/api/vagas/${slotToDelete.id}`, { // Excluindo pela ID da vaga
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         setSlots(slots.slice(0, -1)); // Remove a última vaga da lista
         alert(`Vaga número ${slotToDelete.numero} excluída com sucesso!`);
      } catch (error) {
         console.error('Erro ao excluir a vaga:', error);
         alert('Não foi possível excluir a vaga. Por favor, tente novamente.');
      }
   };

   return (
      <Box sx={{ padding: 4 }}>
         <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" gutterBottom>
               Painel do Admin - Gerenciamento de Vagas
            </Typography>
            <UserProfile />
         </Box>

         <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mr: 2 }}>
               Adicionar Vaga
            </Button>
            <Button variant="contained" color="secondary" onClick={handleDeleteSlot}>
               Excluir Vaga
            </Button>
         </Box>

         {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
               <CircularProgress />
            </Box>
         ) : (
            <Grid container spacing={6} justifyContent="flex-start"> {/* Aumentando o espaçamento */}
               {slots.sort((a, b) => a.numero - b.numero).map((slot) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={slot.id}>
                     <ParkingSlot slot={slot} />
                  </Grid>
               ))}
            </Grid>
         )}

         <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
         >
            <Fade in={open}>
               <Paper sx={{ padding: 4, margin: 'auto', width: 400, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <Typography variant="h6" gutterBottom>
                     Selecione a Categoria da Vaga
                  </Typography>
                  <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                     <InputLabel id="modal-categoria-label">Categoria da Vaga</InputLabel>
                     <Select
                        labelId="modal-categoria-label"
                        value={selectedCategory}
                        onChange={(event) => setSelectedCategory(event.target.value)}
                        label="Categoria da Vaga"
                     >
                        <MenuItem value="carro">Carro</MenuItem>
                        <MenuItem value="moto">Moto</MenuItem>
                        <MenuItem value="caminhonete">Caminhonete</MenuItem>
                     </Select>
                  </FormControl>
                  <Box display="flex" justifyContent="space-between">
                     <Button variant="contained" color="primary" onClick={handleAddSlot}>
                        Confirmar
                     </Button>
                     <Button variant="outlined" onClick={handleClose}>
                        Cancelar
                     </Button>
                  </Box>
               </Paper>
            </Fade>
         </Modal>
      </Box>
   );
}

export default AdminPanel;
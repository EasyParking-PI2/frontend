import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ParkingSlot from './ParkingSlot';
import VehicleCard from './VehicleCard';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import UserProfile from './UserProfile';
import EstacionarModal from './EstacionarModal';
import Button from '@mui/material/Button';  // Importando o componente Button
import axios from 'axios';
import VehicleModal from './VehicleModal';
import DesocuparModal from './DesocuparVaga';

// Função TabPanel para gerenciar os conteúdos das abas
function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`tabpanel-${index}`}
         aria-labelledby={`tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{ p: 3 }}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

function UserPanel() {
   const [value, setValue] = useState(0);
   const [slots, setSlots] = useState([]);
   const [vehicles, setVehicles] = useState([]);
   const [loadingSlots, setLoadingSlots] = useState(true);
   const [loadingVehicles, setLoadingVehicles] = useState(true);
   const [selectedSlot, setSelectedSlot] = useState(null);
   const [openModal, setOpenModal] = useState(false);

   const [openVehicleModal, setOpenVehicleModal] = useState(false);
   const [openDesocuparModal, setOpenDesocuparModal] = useState(false);

   const handleOpenVehicleModal = () => {
      setOpenVehicleModal(true);
   };

   const handleCloseVehicleModal = () => {
      setOpenVehicleModal(false);
   };

   const handleOpenDesocuparModal = (slot) => {
      setSelectedSlot(slot);
      setOpenDesocuparModal(true);
   };

   // const handleCloseDesocuparModal = () => {
   //    setOpenDesocuparModal(false);
   //    setSelectedSlot(null);
   // };

   const handleSlotClick = (slot) => {
      console.log(slot)
      if (slot.status === 'ocupada') {
         handleOpenDesocuparModal(slot);
      } else {
         handleOpenModal(slot);
      }
   };

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   useEffect(() => {
      const fetchSlots = async () => {
         setLoadingSlots(true);
         const token = localStorage.getItem('authToken');

         try {
            const response = await axios.get('http://localhost:5000/api/vagas', {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            setSlots(response.data);
            console.log(response.data);

         } catch (error) {
            console.error('Erro ao carregar as vagas:', error);
         } finally {
            setLoadingSlots(false);
         }
      };


      const fetchVehicles = async () => {
         setLoadingVehicles(true);
         const token = localStorage.getItem('authToken');

         try {
            const response = await axios.get(`http://localhost:5000/api/veiculos/mines`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            setVehicles(response.data);
         } catch (error) {
            console.error('Erro ao carregar os veículos:', error);
         } finally {
            setLoadingVehicles(false);
         }
      };

      fetchSlots();
      fetchVehicles();
   }, [setSlots, setVehicles, setLoadingSlots, setLoadingVehicles]);


   const handleOpenModal = (slot) => {
      setSelectedSlot(slot);
      setOpenModal(true);
   };

   const handleCloseModal = () => {
      setOpenModal(false);
      setSelectedSlot(null);
   };

   const handleParkVehicle = async (placa) => {
      // const token = localStorage.getItem('authToken');

      // try {
      //    const response = await axios.post(
      //       `http://localhost:5000/api/vagas/estacionar`,
      //       {
      //          placa: placa,
      //          numeroVaga: selectedSlot.numero, // Passa o número da vaga e a placa
      //       },
      //       {
      //          headers: {
      //             Authorization: `Bearer ${token}`,
      //             'Content-Type': 'application/json',
      //          },
      //       }
      //    );
      //    // Atualiza o estado da vaga com as novas informações
      //    const updatedSlot = response.data;
      //    setSlots((prevSlots) =>
      //       prevSlots.map((slot) =>
      //          slot.numero === updatedSlot.numero ? updatedSlot : slot
      //       )
      //    );
      //    handleCloseModal();
      // } catch (error) {
      //    console.error('Erro ao estacionar o veículo:', error);
      //    alert('Não foi possível estacionar o veículo. Por favor, tente novamente.');
      // }
   };

   return (
      <Box sx={{ width: '100%' }}>
         <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Vagas Disponíveis" />
            <Tab label="Meus Veículos" />
         </Tabs>

         <TabPanel value={value} index={0}>
            {loadingSlots ? (
               <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                  <CircularProgress />
               </Box>
            ) : (
               <Grid container spacing={6} justifyContent="flex-start">
                  {slots.sort((a, b) => a.numero - b.numero).map((slot) => (
                     <Grid item xs={12} sm={6} md={4} lg={3} key={slot.id}>
                        <ParkingSlot slot={slot} onClick={() => handleSlotClick(slot)} />
                     </Grid>
                  ))}
               </Grid>
            )}
         </TabPanel>

         <TabPanel value={value} index={1}>
            <Button variant="contained" color="primary" onClick={() => handleOpenVehicleModal()} sx={{ mb: 3 }}>
               Adicionar Veículo
            </Button>

            {loadingVehicles ? (
               <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                  <CircularProgress />
               </Box>
            ) : (
               <Grid container spacing={6} justifyContent="flex-start">
                  {vehicles.map((vehicle) => (
                     <Grid item xs={12} sm={6} md={4} lg={3} key={vehicle.id}>
                        <VehicleCard vehicle={vehicle} />
                     </Grid>
                  ))}
               </Grid>
            )}
         </TabPanel>

         <UserProfile />

         {/* Modal para estacionar o veículo */}
         <EstacionarModal
            open={openModal && selectedSlot !== null}
            onClose={handleCloseModal}
            onPark={handleParkVehicle}
            slot={selectedSlot}
         />

         <VehicleModal
            open={openVehicleModal}
            onClose={handleCloseVehicleModal}
            onSuccess={(novoVeiculo) => setVehicles((prevVehicles) => [...prevVehicles, novoVeiculo])}
         />

         <DesocuparModal
            open={openDesocuparModal}
            onClose={() => setOpenDesocuparModal(false)}
            slot={selectedSlot}
         />
      </Box>
   );
}

export default UserPanel;

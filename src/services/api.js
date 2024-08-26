const API_URL = 'http://localhost:5000/api';

const API_URL2 = 'http://localhost:3000/api';

// Função para autenticar o usuário e obter o token
export async function login(credentials) {
   const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
   });
   if (!response.ok) {
      throw new Error('Falha ao autenticar');
   }
   const data = await response.json();
   return data.token;  // Retorna o token de autenticação
}

// Função para obter todas as vagas
export async function getParkingSlots() {
   const token = localStorage.getItem('authToken');
   const response = await fetch(`${API_URL}/vagas`, {
      headers: {
         'Authorization': `Bearer ${token}`,
      },
   });
   if (!response.ok) {
      throw new Error('Falha ao obter as vagas');
   }
   return response.json();
}

// Função para cadastrar um novo carro
export async function createVehicle(vehicleData) {
   const token = localStorage.getItem('authToken');
   const response = await fetch(`${API_URL}/veiculos`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(vehicleData)
   });
   if (!response.ok) {
      throw new Error('Falha ao cadastrar o veículo');
   }
   return response.json();
}

// Função para cadastrar uma nova vaga
export async function createSlot(slotData) {
   const token = localStorage.getItem('authToken');
   const response = await fetch(`${API_URL}/vagas`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(slotData)
   });
   if (!response.ok) {
      throw new Error('Falha ao cadastrar a vaga');
   }
   return response.json();
}

export async function createUser(userData) {
   const response = await fetch(`${API_URL2}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
   });
   if (!response.ok) {
      throw new Error('Falha ao registrar o usuário');
   }
   return response.json();
}

export async function loginUser(credentials) {
   const response = await fetch(`${API_URL2}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
   })

   if (!response.ok) {
      throw new Error('Falha no login');
   }

   const data = await response.json();
   return data;
}
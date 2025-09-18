// src/services/apiService.ts
import axios from 'axios';

const API_BASE_URL = 'http://SEU_IP_LOCAL:8080/api'; // ou .NET: http://SEU_IP:5000/api

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export default api;
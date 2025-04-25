/**
 * Instância centralizada do Axios para requisições à API.
 * Utiliza a variável de ambiente NEXT_PUBLIC_API_URL como base.
 * Facilita manutenção e reutilização em diferentes componentes.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
});

export default api;

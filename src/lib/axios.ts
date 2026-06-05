import axios, {
  type InternalAxiosRequestConfig, // Tipe untuk konfigurasi request
  type AxiosResponse, // Tipe untuk objek respons sukses
  type AxiosError, // Tipe untuk objek error
} from 'axios';

// TODO: Create axios instance with base configuration
// Hint: Use environment variables for API URL and API key
// Reference: https://axios-http.com/docs/instance

const api = axios.create({
  // TODO: Configure baseURL from environment variable
  // TODO: Add default headers (API key, content-type)
  baseURL: import.meta.env.VITE_TMDB_BASE_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — inject API key into every request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.params = {
    ...config.params,
    api_key: import.meta.env.VITE_TMDB_API_KEY as string,
    language: config.params?.language ?? 'en-US',
  };
  return config;
});

// Response interceptor — normalize errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) throw new Error('API key tidak valid. Periksa file .env kamu.');
      if (status === 404) throw new Error('Data tidak ditemukan.');
      if (status === 429) throw new Error('Terlalu banyak request. Coba lagi sebentar.');
    }
    throw error;
  }
);
// TODO: Add request interceptor if needed
// Hint: You can add API key to every request here

// TODO: Add response interceptor for error handling

export default api;

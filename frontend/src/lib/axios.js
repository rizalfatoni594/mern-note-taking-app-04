import axios from 'axios';

// in production there is no such thing called localhost, so this has to be dynamic
const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : '/api';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api };

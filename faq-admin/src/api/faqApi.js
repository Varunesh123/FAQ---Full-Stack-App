import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI || 'http://localhost:3000'
})

export default Axios
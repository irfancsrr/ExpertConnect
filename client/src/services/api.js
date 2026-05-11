import axios from "axios";
import {API_URL} from "../utils/path";

const api = axios.create({
  baseURL: `${API_URL}/api`, // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
                   
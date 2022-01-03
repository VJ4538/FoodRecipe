import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const SpoonacularAPI = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

export default SpoonacularAPI;

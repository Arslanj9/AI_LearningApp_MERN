// src/api.js

// Base URL for all API requests
export const API_BASE_URL = "http://localhost:5000";

// Optional: create a preconfigured axios instance
import axios from "axios";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

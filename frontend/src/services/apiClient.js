/*
Purpose
Pre-configured Axios instance. Not used yet (frontend currently runs on
mock data), but created now so the Backend Integration Policy in the
spec can be satisfied with minimal changes later.

Future Features
- Backend Integration:
  1. Set baseURL to the Spring Boot backend, e.g. http://localhost:8080/api
  2. Attach an interceptor that reads the JWT token from localStorage
     and sets the Authorization: Bearer <token> header on every request.
  3. Add a response interceptor to handle 401 (redirect to login) and
     centralize error handling.
*/

import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Backend Integration: uncomment once JWT auth is live.
// apiClient.interceptors.request.use((config) => {
//   const user = JSON.parse(localStorage.getItem('pms_user'))
//   if (user?.token) {
//     config.headers.Authorization = `Bearer ${user.token}`
//   }
//   return config
// })

export default apiClient

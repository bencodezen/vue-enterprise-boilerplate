// Mock axios in our unit tests, so that we test against
// the provided VUE_APP_API_BASE_URL or the mock API.

import axios from 'axios'

const axiosInstance = axios.create({
  baseURL:
    process.env.VUE_APP_API_BASE_URL ||
    `http://localhost:${process.env.MOCK_API_PORT}`,
})

export default axiosInstance

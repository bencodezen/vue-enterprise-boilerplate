// Mock axios in our unit tests, so that we test against
// the provided API_BASE_URL or the mock API.

const axios = require('axios')

const axiosInstance = axios.create({
  baseURL:
    process.env.API_BASE_URL || `http://localhost:${process.env.MOCK_API_PORT}`,
})

module.exports = axiosInstance

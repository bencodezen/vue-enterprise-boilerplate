// Mock axios in our unit tests, so that no one

const axios = require('axios')

const mockApiPort = 9090

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || `http://localhost:${mockApiPort}`,
})

if (!process.env.API_BASE_URL) {
  let mockApiServer

  axiosInstance.interceptors.request.use(config => {
    mockApiServer = startMockApiServer()
    return config
  })

  axiosInstance.interceptors.response.use(
    response => {
      mockApiServer.close()
      return response
    },
    error => {
      mockApiServer.close()
      return Promise.reject(error)
    }
  )
}

module.exports = axiosInstance

function startMockApiServer() {
  const app = require('express')()
  app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    next()
  })
  require('../../mock-api')(app)
  return app.listen(mockApiPort)
}

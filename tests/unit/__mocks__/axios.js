const axios = require('axios')
const appConfig = require('@src/app.config')

const axiosInstance = axios.create({
  baseURL: process.env.PROD_API
    ? appConfig.prod.baseUrl
    : 'http://localhost:9090',
})

if (!process.env.PROD_API) {
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
  return app.listen(9090)
}

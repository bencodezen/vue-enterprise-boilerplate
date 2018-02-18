module.exports = app => {
  app.post('/api/session', (request, response) => {
    authenticate(request.body)
      .then(user => {
        response.json(user)
      })
      .catch(error => {
        response.status(401).json({ message: error.message })
      })
  })
}

function authenticate({ username, password }) {
  return new Promise((resolve, reject) => {
    if (username === 'admin' && password === 'password') {
      resolve({
        id: 1,
        username: 'admin',
        name: 'Vue Master',
        token: 'mock-token',
      })
    } else {
      reject(new Error('Invalid user credentials'))
    }
  })
}

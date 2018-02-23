const _ = require('lodash')

module.exports = app => {
  // Log in a user with a username and password
  app.post('/api/session', (request, response) => {
    authenticate(request.body)
      .then(user => {
        response.json(user)
      })
      .catch(error => {
        response.status(401).json({ message: error.message })
      })
  })

  // Get the user of a provided token, if valid
  app.get('/api/session', (request, response) => {
    const token = request.headers.authorization

    const matchedUser = users.find(user => user.token === token)

    if (!matchedUser) {
      return response.status(401).json({
        message:
          'The token is either invalid or has expired. Please log in again.',
      })
    }

    response.json(_.omit(matchedUser, ['password']))
  })
}

function authenticate({ username, password }) {
  return new Promise((resolve, reject) => {
    const matchedUser = users.find(
      user => user.username === username && user.password === password
    )
    if (matchedUser) {
      resolve(_.omit(matchedUser, ['password']))
    } else {
      reject(new Error('Invalid user credentials.'))
    }
  })
}

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'password',
    name: 'Vue Master',
  },
].map(user => {
  return {
    ...user,
    token: `valid-token-for-${user.username}`,
  }
})

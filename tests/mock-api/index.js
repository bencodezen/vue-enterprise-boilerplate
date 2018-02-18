const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')

module.exports = app => {
  app.use(bodyParser.json())
  authRoutes(app)
}

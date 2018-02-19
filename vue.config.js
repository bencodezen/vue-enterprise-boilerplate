const appConfig = require('./src/app.config')

module.exports = {
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: appConfig.title,
    // Set up all the aliases we use in our app.
    resolve: {
      alias: require('./aliases.config').webpack,
    },
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true,
    // Enable CSS modules for all CSS/pre-processor files.
    // This option does not affect *.vue files.
    modules: true,
  },
  // Split dependencies into their own bundle.
  // https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  dll: true,
  // Configure Webpack's dev server.
  // https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md
  devServer: {
    ...(process.env.PROD_API
      ? // Proxy API endpoints to the production base URL.
        { proxy: { '/api': { target: appConfig.prod.baseUrl } } }
      : // Proxy API endpoints a local mock API.
        { before: require('./tests/mock-api') }),
  },
}

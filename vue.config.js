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
  // Split vendors using autoDLLPlugin.
  dll: true,
  ...(process.env.PROD_API
    ? {
        proxy: {
          '/api': appConfig.prod.baseUrl,
        },
      }
    : {
        devServer: {
          // Provide a mock API for development and tests
          before: require('./tests/mock-api'),
        },
      }),
}

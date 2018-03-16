module.exports = {
  presets: [
    [
      '@vue/app',
      {
        // Disable Babel's polyfills, replaced by the
        // polyfill.io service in index.html
        useBuiltIns: false,
      },
    ],
  ],
  plugins: [
    // Support async/await
    // NOTE: Using async/await at least once will increase
    // the size of your app bundle by almost 10KB gzipped.
    // https://babeljs.io/docs/plugins/transform-runtime/
    [
      '@babel/transform-runtime',
      { helpers: true, polyfill: false, regenerator: true },
    ],
  ],
  env: {
    test: {
      presets: [
        [
          '@vue/app',
          {
            // Enable Babel's polyfills for Jest tests
            useBuiltIns: 'usage',
            // Use CommonJS modules for Jest tests
            modules: 'commonjs',
          },
        ],
      ],
    },
  },
}

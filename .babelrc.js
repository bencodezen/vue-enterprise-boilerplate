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

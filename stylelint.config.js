module.exports = {
  extends: [
    // Use the Standard config as the base linting config
    'stylelint-config-standard',
    // Enforce a standard order for CSS properties
    'stylelint-config-recess-order',
    // Override rules that would interfere with Prettier
    // https://github.com/hugomrdias/prettier-stylelint/blob/master/config.js
    './node_modules/prettier-stylelint/config.js',
    // Override rules to allow linting of CSS modules
    'stylelint-config-css-modules',
  ],
  plugins: [
    // Bring in some extra rules for SCSS
    'stylelint-scss',
  ],
  // Rule lists:
  // - https://stylelint.io/user-guide/rules/
  // - https://github.com/kristerkari/stylelint-scss#list-of-rules
  rules: {
    // Enforce camelCase for classes and ids, to work better
    // with CSS modules
    'selector-class-pattern': /^[a-z][a-zA-Z]+$/,
    'selector-id-pattern': /^[a-z][a-zA-Z]+$/,
    // Limit the number of universal selectors in a selector,
    // to avoid very slow selectors
    'selector-max-universal': 1,
    // ===
    // SCSS
    // ===
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/dollar-variable-pattern': /^[a-z-]+$/,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/operator-no-newline-before': true,
    'scss/operator-no-unspaced': true,
    'scss/selector-no-redundant-nesting-selector': true,
    // Allow SCSS and CSS module keywords beginning with `@`
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
}

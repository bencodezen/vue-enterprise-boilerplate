// Create custom Cypress commands and overwrite existing ones.
// https://on.cypress.io/custom-commands

Cypress.Commands.add('logIn', ({ username, password } = {}) => {
  // Visit the login page
  cy.visit('/login')

  // Enter the user-supplied username and password, with valid fallbacks.
  cy.get('input[name="username"]').type(username || 'admin')
  cy.get('input[name="password"]').type(password || 'password')

  // Submit the login form
  cy
    .get('button')
    .contains('Log in')
    .click()

  // If the user did not provide a custom username or password,
  // then assume success and wait for a redirect to the homepage.
  if (!username && !password) {
    cy.contains('Home Page')
  }
})

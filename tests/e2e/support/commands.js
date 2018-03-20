// Create custom Cypress commands and overwrite existing ones.
// https://on.cypress.io/custom-commands

Cypress.Commands.add(
  'logIn',
  ({ username = 'admin', password = 'password' } = {}) => {
    // Manually log the user in
    cy.location('pathname').then(pathname => {
      if (pathname === 'blank') {
        cy.visit('/')
      }
    })
    cy.window().then(window => {
      return window.__app__.$store.dispatch('auth/logIn', {
        username,
        password,
      })
    })
  }
)

// Create custom Cypress commands and overwrite existing ones.
// https://on.cypress.io/custom-commands

Cypress.Commands.add('logIn', ({ to = '/', user = {} } = {}) => {
  // Save a current user with a valid token in localStorage
  cy.window().then(window => {
    window.localStorage.setItem(
      'auth.currentUser',
      JSON.stringify(
        Object.assign(
          {},
          {
            id: 1,
            username: 'admin',
            name: 'Vue Master',
            token: 'valid-token-for-admin',
          },
          user
        )
      )
    )
  })
  // Watch requests to the session validation path
  cy.server()
  cy.route('/api/session').as('validateSession')
  // Visit the authenticated route
  cy.visit(to)
  // Wait for the session to validate
  cy.wait('@validateSession')
})

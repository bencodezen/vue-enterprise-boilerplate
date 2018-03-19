describe('Authentication', () => {
  it('login link exists on the home page when logged out', () => {
    cy.visit('/')
    cy.contains('a', 'Log in').click()
    cy.location('pathname').should('equal', '/login')
    cy.get('input[type="password"]')
  })

  it('login form shows an error on failure', () => {
    cy.logIn({ username: 'badUsername', password: 'badPassword' })
    cy.contains('error logging in')
  })

  it('login and logout work correctly', () => {
    cy.logIn()
    cy.contains('a', 'Log out').click()
    cy.contains('a', 'Log in')
  })
})

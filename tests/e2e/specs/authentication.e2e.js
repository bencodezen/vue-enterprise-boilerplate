describe('Login', () => {
  it('link exists on the home page when logged out', () => {
    cy.visit('/')
    cy
      .get('a')
      .contains('Log in')
      .click()
  })

  it('form shows an error on failure', () => {
    cy.logIn({ username: 'badUsername', password: 'badPassword' })
    cy.contains('error logging in')
  })

  it('form redirects to the home page on success', () => {
    cy.logIn()
  })

  it('does not show login link when already logged in', () => {
    cy.get('a').should('not.contain', 'Log in')
  })
})

describe('Logout', () => {
  it('logs the user out when clicking on the "Log out" link', () => {
    cy
      .get('a')
      .contains('Log out')
      .click()

    cy.get('a').contains('Log in')
  })
})

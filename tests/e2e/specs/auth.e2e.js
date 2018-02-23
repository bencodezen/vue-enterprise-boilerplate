describe('Login', () => {
  // Allow localStorage to persist between the Login tests,
  // so that we can test that the user session is correctly
  // saved and restored.
  const originalLocalStorageClear = Cypress.LocalStorage.clear
  before(() => {
    Cypress.LocalStorage.clear = () => {}
  })
  after(() => {
    Cypress.LocalStorage.clear = originalLocalStorageClear
  })

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

  it('persists after page refresh', () => {
    cy.reload()
    cy.get('a').contains('Log out')
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

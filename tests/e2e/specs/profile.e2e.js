describe('Profile', () => {
  it('redirects to login when logged out', () => {
    cy.visit('/profile')
    cy.location('pathname').should('equal', '/login')
  })

  it('shows a link to the profile page when logged in', () => {
    cy.logIn()
    cy
      .get('a')
      .contains('Logged in as Vue Master')
      .click()
  })

  it('contains the correct title and profile content', () => {
    cy.get('h1').contains('Vue Master')
    cy.get('pre').contains('"username": "admin"')
  })
})

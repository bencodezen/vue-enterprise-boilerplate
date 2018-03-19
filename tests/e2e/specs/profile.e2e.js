describe('Profile', () => {
  it('redirects to login when logged out', () => {
    cy.visit('/profile')
    cy.location('pathname').should('equal', '/login')
  })

  it('works correctly when logged in', () => {
    cy.logIn()
    cy.contains('a', 'Logged in as Vue Master').click()
    cy.contains('h1', 'Vue Master')
    cy.contains('pre', '"username": "admin"')
  })
})

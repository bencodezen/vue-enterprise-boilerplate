describe('Profile Page', () => {
  it('redirects to login when logged out', () => {
    cy.visit('/profile')
    cy.location('pathname').should('equal', '/login')
  })

  it('nav link exists when logged in', () => {
    cy.logIn()
    cy.contains('a', 'Logged in as Vue Master').should(
      'have.attr',
      'href',
      '/profile'
    )
  })

  it('shows the current user profile when logged in', () => {
    cy.logIn()
    cy.visit('/profile')
    cy.contains('h1', 'Vue Master')
  })
})

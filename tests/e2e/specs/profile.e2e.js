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

  it('shows non-current users at username routes when logged in', () => {
    cy.logIn()
    cy.visit('/profile/user1')
    cy.contains('h1', 'User One')
  })

  it('shows a user 404 page when looking for a user that does not exist', () => {
    cy.logIn()
    cy.visit('/profile/non-existant-user')
    cy.contains('h1', /User\s+Not\s+Found/)
  })
})

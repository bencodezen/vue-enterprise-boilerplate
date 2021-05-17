describe('Home Page', () => {
  it('has the correct title and heading', () => {
    cy.visit('/')
    cy.title().should('equal', 'Random Quote | LOTR Randomizer')
    cy.contains('h1', 'The one app to randomize them all')
  })
})

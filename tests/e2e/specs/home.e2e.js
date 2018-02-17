describe('Home Page', () => {
  before(() => {
    cy.visit('/')
  })

  it('has the correct title', () => {
    cy.title().should('equal', 'Home | My Project')
  })

  it('has the correct heading', () => {
    cy.get('h1').contains('Home Page')
  })
})

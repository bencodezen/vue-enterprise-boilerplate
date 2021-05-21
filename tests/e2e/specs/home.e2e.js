describe('Home Page', () => {
  const validQuoteExample = {
    docs: [
      {
        dialog: 'Mr Frodo!',
        _id: 'ghi',
        character: 'abc',
        movie: 'def',
      },
    ],
  }

  it('has the correct title and heading', () => {
    cy.intercept(
      'GET',
      'https://the-one-api.dev/v2/quote?limit=1000000',
      validQuoteExample
    ).as('getQuotes')
    cy.intercept('GET', 'https://the-one-api.dev/v2/character', {
      docs: [{ name: 'Samwise Gamgee', _id: 'abc' }],
    }).as('getCharacters')
    cy.intercept('GET', 'https://the-one-api.dev/v2/movie', {
      docs: [{ name: 'Return of the king', _id: 'def' }],
    }).as('getMovies')
    cy.visit('/')

    cy.wait('@getQuotes')
    cy.wait('@getCharacters')
    cy.wait('@getMovies')
    cy.title().should('equal', 'Random Quote | LOTR Randomizer')
    cy.contains('h1', 'The one app to randomize them all')
  })

  it('displays quote after clicking on a button', () => {
    cy.contains('button', 'Po-ta-toes!').click({ force: true })

    cy.contains('h3', 'Mr Frodo!')
  })

  it('displays quote details after clicking on a button', () => {
    cy.contains('p', 'Samwise Gamgee')
    cy.contains('p', 'Return of the king')
  })
})

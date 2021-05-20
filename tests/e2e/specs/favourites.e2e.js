describe('Favourites Page without favourite quotes', () => {
  it('has the correct title and heading', () => {
    cy.visit('/favourites')
    cy.title().should('equal', 'Favourites | LOTR Randomizer')
    cy.contains('h2', 'Favourite quotes')
  })

  it('displays empty list when no favourite quotes', () => {
    cy.get('.tile').should('not.have.descendants')
  })

  xit('displays favourite quotes list when it exists', () => {
    cy.contains('div', 'Mr Frodo!')
    cy.contains('p', 'Samwise Gamgee')
    cy.contains('p', 'Return of the king')
  })
})

describe('Favourites Page with favourite quotes', () => {
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

  it('displays favourite quotes list when it exists', () => {
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

    cy.contains('button', 'Po-ta-toes!').click({ force: true })

    cy.contains('section', 'Add to favourites').click()

    cy.contains('a', 'Favourites').click()

    cy.title().should('equal', 'Favourites | LOTR Randomizer')
    cy.contains('h2', 'Favourite quotes')

    cy.contains('div', 'Mr Frodo!')
    cy.contains('p', 'Samwise Gamgee')
    cy.contains('p', 'Return of the king')
  })
})

// Returns the Vuex store.
export const getStore = () => cy.window().its('__app__.$store')

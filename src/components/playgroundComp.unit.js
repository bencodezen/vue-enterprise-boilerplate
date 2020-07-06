// i't was hard to build this in a way that i coul'd commit
// i learned a lot for this

import PlaygroundComp from './playgroundComp.vue'

describe('@components/playgroundComp', () => {
  it(`fetching data and generationg a table`, () => {
    createComponentMocks({
      store: {
        playground: {
          state: {
            dataArray: [],
          },
          getters: {
            getDataArray: () => [],
          },
          actions: {
            fetchDataFromServer() {
              return Promise.resolve('dataArray')
            },
          },
        },
      },
    })
    expect(PlaygroundComp).toBeAComponent()
  })
})

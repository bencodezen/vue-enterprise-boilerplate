// i don't really understand the functionality.
// if its just for documentation or has other uses.
// copied and modified from other component

import PlaygroundComp from './playgroundComp.vue'
// import { MdTable, MdContent } from 'vue-material/dist/components'

// describe('@components/playgroundComp', () => {
//     it(`fetching data and generationg a table`, () => {
//         const { vm } = shallowMount(
//             PlaygroundComp,
//             createComponentMocks({
//                 store: {
//                     playground: {
//                         state: {
//                             dataArray: []
//                         },
//                         getters: {
//                             getDataArray: () => []
//                         },
//                         actions: {
//                             fetchDataFromServer() {
//                                 return Promise.resolve('dataArray')
//                             }
//                         }
//                     },
//                 },
//             })
//         )
//         expect(vm).toBeAComponent()
//     })
// })

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

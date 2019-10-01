module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Name:',
    validate(value) {
      if (!value.length) {
        return 'Vuex modules must have a name.'
      }
      return true
    },
  },
]

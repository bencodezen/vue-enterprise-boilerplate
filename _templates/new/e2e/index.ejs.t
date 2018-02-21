---
to: tests/e2e/specs/<%= h.inflection.dasherize(name) %>.e2e.js
---
describe('<%= h.inflection.titleize(name.replace(/-/g, '_')) %>', () => {

})

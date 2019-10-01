---
to: src/state/modules/<%= h.changeCase.kebab(name) %>.unit.js
---
<%
  const fileName = h.changeCase.kebab(name)
  const importName = h.changeCase.camel(fileName) + 'Module'
%>import * as <%= importName %> from './<%= fileName %>'

describe('@state/modules/<%= fileName %>', () => {
  it('exports a valid Vuex module', () => {
    expect(<%= importName %>).toBeAVuexModule()
  })
})

---
to: src/components/<%= h.inflection.dasherize(name) %>.unit.js
---
<%
  const fileName = h.inflection.dasherize(name)
  const importName = h.inflection.camelize(name)
%>import <%= importName %> from './<%= fileName %>'

describe('@components/<%= fileName %>', () => {
  it('exports a valid component', () => {
    expect(<%= importName %>).toBeAComponent()
  })
})

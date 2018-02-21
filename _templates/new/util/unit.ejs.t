---
to: "src/utils/<%= h.inflection.dasherize(name) %>.unit.js"
---
<%
  const fileName = h.inflection.dasherize(name)
  const importName = h.inflection.camelize(fileName.replace(/-/g, '_'), true)
%>import <%= importName %> from './<%= fileName %>'

describe('@utils/<%= fileName %>', () => {
  it('says hello', () => {
    const result = <%= importName %>()
    expect(result).toEqual('hello')
  })
})

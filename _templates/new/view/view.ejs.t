---
to: "src/router/views/<%= h.inflection.dasherize(name) %>.vue"
---
<%
  const fileName = h.inflection.dasherize(name)
  const importName = h.inflection.camelize(fileName.replace(/-/g, '_'))
%><script>
import Layout from '@layouts/main'

export default {
  page: {
    title: '<%= importName %>',
    meta: [{ name: 'description', content: '<%= importName %>' }],
  },
  components: { Layout }
}
</script>

<template>
  <Layout>
    <%= h.inflection.titleize(name.replace(/-/g, '_')) %>
  </Layout>
</template>
<%

if (useStyles) { %>
<style lang="scss" module>
@import '@design';
</style>
<% } %>

---
to: src/components/<%= h.inflection.dasherize(name) %>.vue
---
<%
if (blocks.indexOf('script') !== -1) {
%><script>
export default {

}
</script>
<%
}

if (blocks.indexOf('template') !== -1) {
%>
<template>

</template>
<%
}

if (blocks.indexOf('style') !== -1) {
%>
<style lang="scss" module>
@import '~@design';
</style>
<%
}
%>

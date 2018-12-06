<script>
// Allows stubbing BaseLink in unit tests
const BaseLink = 'BaseLink'

export default {
  // Functional components are stateless, meaning they can't
  // have data, computed properties, etc and they have no
  // `this` context.
  functional: true,
  props: {
    routes: {
      type: Array,
      required: true,
    },
  },
  // Render functions are an alternative to templates
  render(h, { props, $style = {} }) {
    function getRouteTitle(route) {
      return typeof route.title === 'function' ? route.title() : route.title
    }

    // Functional components are the only components allowed
    // to return an array of children, rather than a single
    // root node.
    return props.routes.map((route) => (
      <BaseLink
        tag="li"
        key={route.name}
        to={route}
        exact-active-class={$style.active}
      >
        <a>{getRouteTitle(route)}</a>
      </BaseLink>
    ))
  },
}
</script>

<style lang="scss" module>
@import '@design';

.active a {
  font-weight: 600;
  color: $color-link-text-active;
  text-decoration: none;
  cursor: default;
}
</style>

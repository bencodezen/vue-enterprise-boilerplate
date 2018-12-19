<script>
export default {
  inheritAttrs: false,
  props: {
    href: {
      type: String,
      default: '',
    },
    allowInsecure: {
      type: Boolean,
      default: false,
    },
    to: {
      type: Object,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    routerLinkTo({ name, params }) {
      return {
        name,
        params,
        ...(this.to || {}),
      }
    },
  },
  created() {
    this.validateProps()
  },
  methods: {
    // Perform more complex prop validations than is possible
    // inside individual validator functions for each prop.
    validateProps() {
      if (process.env.NODE_ENV === 'production') return

      if (this.href) {
        // Check for non-external URL in href.
        if (!/^\w+:/.test(this.href)) {
          return console.warn(
            `Invalid <BaseLink> href: ${
              this.href
            }.\nIf you're trying to link to a local URL, provide at least a name or to`
          )
        }
        // Check for insecure URL in href.
        if (!this.allowInsecure && !/^(https|mailto|tel):/.test(this.href)) {
          return console.warn(
            `Insecure <BaseLink> href: ${
              this.href
            }.\nWhen linking to external sites, always prefer https URLs. If this site does not offer SSL, explicitly add the allow-insecure attribute on <BaseLink>.`
          )
        }
      } else {
        // Check for insufficient props.
        if (!this.name && !this.to) {
          return console.warn(
            `Invalid <BaseLink> props:\n\n${JSON.stringify(
              this.$props,
              null,
              2
            )}\n\nEither a \`name\` or \`to\` is required for internal links, or an \`href\` for external links.`
          )
        }
      }
    },
  },
}
</script>

<template>
  <a v-if="href" :href="href" target="_blank" v-bind="$attrs">
    <slot />
  </a>
  <RouterLink v-else :to="routerLinkTo" v-bind="$attrs">
    <slot />
  </RouterLink>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: 'Copy',
    },
    tooltipText: {
      type: String,
      default: 'Copy to clipboard',
    },
  },
}
</script>

<template>
  <b-tooltip
    type="is-light"
    :label="tooltipText"
    position="is-bottom"
    :delay="500"
  >
    <span :class="$style.button">
      <img
        :class="$style.icon"
        :alt="buttonText"
        src="@assets/icons/iconmonstr-copy-2.svg"
      />
      {{ buttonText }}
    </span>
  </b-tooltip>
</template>

<style lang="scss" module>
@import '@design';
.button {
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-in-out;
    transform: scale(1.3);
  }
}

.icon {
  width: 20px;
  height: auto;
  margin-right: 8px;
}
</style>

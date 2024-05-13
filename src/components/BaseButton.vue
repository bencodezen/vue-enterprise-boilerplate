<template>
  <button :class="$style.button">
    <slot />
  </button>
</template>

<style module>
.button {
  cursor: pointer;
  border: none;
}

.button:disabled {
  cursor: not-allowed;
}
</style>

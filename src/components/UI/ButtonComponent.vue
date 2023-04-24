<template>
  <button type="button">
    <template v-if="rectangle">
      <img src="../../assets/icons/button-triangle.svg" alt="triangle" />
    </template>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    rectangle: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

button {
  width: 180px;
  height: 48px;

  background: #da1617;
  box-shadow: 2px 2px 4px rgba(61, 61, 61, 0.05);
  border-radius: 2px;
  border: 0;
  font-weight: 700;
  font-size: 14px;
  color: $white;
  cursor: pointer;;

  img {
    margin-right: 14px;
  }
}
</style>

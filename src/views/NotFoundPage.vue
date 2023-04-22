<template>
  <div class="error">
    <img src="../assets/img/error.png" alt="" />
    <div class="title">Ooops..</div>
    <div class="text">Something went wrong!</div>
    <div class="button-wrapper">
      <button-component class="button"> Try again </button-component>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "@/components/UI/ButtonComponent.vue";

export default {
  name: 'NotFoundView',
  components: {ButtonComponent}
}
</script>

<style lang="scss" scoped>
.error {
  text-align: center;
  font-weight: 400;

  img {
    padding-top: 255px;
  }

  .title {
    font-size: 28px;
    font-family: 'KronaOne', sans-serif;
    margin-bottom: 4px;
  }

  .text {
    font-size: 16px;
  }

  .button-wrapper {
    position: absolute;
    bottom: 5%;
    width: calc(100% - 10px);

    .button {
      margin: 0 auto;
    }
  }
}
</style>

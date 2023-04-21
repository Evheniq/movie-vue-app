<template>
  <div class="not-found">
    <div class="not-found__content">
      <div class="not-found__title">404</div>
      <div class="not-found__subtitle">Page not found</div>
      <div class="not-found__description">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </div>
      <div class="not-found__button">
        <router-link to="/">Go to home page</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped></style>

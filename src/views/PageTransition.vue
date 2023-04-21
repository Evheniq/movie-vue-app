<template>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in" appear>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
.route-enter-from {
  opacity: 0;
  transform: translateX(300px);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.5s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}
</style>

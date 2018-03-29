<template>
  <div id="app">
    <menu-top/>
    <router-view/>
  </div>
</template>

<script>
import menuTop from '@/components/geral/menuTop';

export default {
  name: 'App',
  components: {
    menuTop
  }
}
</script>

<style>
  @import "./assets/css/style.css";
  @import "./assets/css/responsive.css";
  @import "./assets/css/animations.css";
</style>

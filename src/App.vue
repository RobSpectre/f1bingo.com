<template lang="pug">
div#app.bg-darkgray.py-4
  div.container.mx-auto.max-w-screen-md
    Header
    Board
    Footer
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Board from '@/components/Board.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Board
  }
}
</script>

<style lang="scss">
html, body {
  @apply bg-darkgray;
}
</style>

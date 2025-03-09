<template lang="pug">
.w-full.bg-lightgray
  h1.banner {{ event }}
</template>

<script>
import cards from '@/assets/data/deck.json'


export default {
  name: 'Banner',
  data () {
    return {
      event: cards.event
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Banner';
  src: url('@/assets/fonts/banner.woff2')
}

.banner {
  font-family: 'Banner', serif;
  @apply uppercase text-center p-3 text-white text-xs md:text-sm lg:text-base;
}
</style>

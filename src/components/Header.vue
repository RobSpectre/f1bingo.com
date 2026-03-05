<template lang="pug">
#header.bg-cover.bg-no-repeat.bg-left.flex.h-48.relative
  h1.flex-auto.text-center.text-6xl.text-white.hidden Formula 1 Bingo
  div.absolute.right-0.bottom-0.mb-4.mr-4.flex.items-center.gap-4.no-capture
    ShareButton(text="Share")
    button(
      type='button'
      class='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-tire-wet transition-all duration-200 ease-out uppercase hover:bg-tire-soft hover:-translate-y-1 hover:shadow-lg active:scale-95 focus:outline-none'
      @click='resetBoard()'
    )
      | Reset
</template>

<script>
import ShareButton from '@/components/ShareButton.vue'

export default {
  name: 'Header',
  components: {
    ShareButton
  },
  methods: {
    resetBoard () {
      this.emitter.emit('reset-board', {})

      this.$gtag.event('Click', {
        event_category: 'UX',
        event_label: 'Reset'
      })
    }
  }
}
</script>

<style lang="scss">
#header {
  background-image: url('@/assets/header-1280x400.png');
  background-color: #070000;
}
</style>

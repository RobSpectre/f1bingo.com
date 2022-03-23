<template lang="pug">
#header.bg-cover.bg-no-repeat.bg-left.flex.h-48.relative
  h1.flex-auto.text-center.text-6xl.text-white.hidden Formula 1 Bingo
  span.flex-initial.absolute.right-0.bottom-0.mb-4.mr-24
    ShareButton(text="Share")
  span.ml-3.shadow-sm.rounded-md.flex-initial.absolute.right-0.bottom-0.mb-4
    button.inline-flex.items-center.p-2.border.border-transparent.text-large.leading-5.font-medium.rounded-md.text-white.bg-orange.transition.duration-150.ease-in-out.uppercase(type='button' class='hover:bg-yellow focus:outline-none' @click='resetBoard()')
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
        event_category: 'Reset',
        event_label: 'Board'
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

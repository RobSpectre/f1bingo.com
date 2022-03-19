<template lang="pug">
#header.bg-auto.bg-center.flex
  span.ml-3.shadow-sm.rounded-md.flex-initial
    button.inline-flex.items-center.p-2.border.border-transparent.text-large.leading-5.font-medium.rounded-md.text-white.bg-blue.transition.duration-150.ease-in-out.uppercase(type='button' class='hover:bg-orange focus:outline-none focus:shadow-outline-orange focus:border-orange active:bg-orange' @click='resetBoard()')
      | Reset
  h1.flex-auto.text-center.text-6xl.text-white Formula 1 Bingo

</template>

<script>
export default {
  name: 'Header',
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

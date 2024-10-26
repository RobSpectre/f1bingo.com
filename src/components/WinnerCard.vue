<template lang="pug">
.fixed.z-10.inset-0.overflow-y-auto(v-if='winConditionMet & !winnerCardClosed' aria-labelledby='modal-title' role='dialog' aria-modal='true')
  .flex.items-center.justify-center.min-h-screen.pt-4.px-4.pb-20.text-center(class='sm:block sm:p-0')
    //
      Background overlay, show/hide based on modal state.
      Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
      Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
    .fixed.inset-0.bg-gray-500.bg-opacity-75.transition-opacity(aria-hidden='true')
    // This element is to trick the browser into centering the modal contents.
    span.hidden(class='sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true') &ZeroWidthSpace;
    //
      Modal panel, show/hide based on modal state.
      Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    #winner.bg-cover.relative.inline-block.align-bottom.bg-white.rounded-lg.px-4.pt-5.pb-4.text-left.overflow-hidden.shadow-xl.transform.transition-all.h-56.w-64(class='sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:h-80 sm:p-6')
      button.absolute.right-0.top-0.mt-4.mr-4(@click="closeWinnerCard")
        svg.w-6.h-6(xmlns="http://www.w3.org/2000/svg", fill="none", viewBox="0 0 24 24", stroke-width="1.5", stroke="white")
          path(stroke-linecap="round", stroke-linejoin="round", d="M6 18 18 6M6 6l12 12")
      div
        ShareButton(text="Share")
</template>

<script>
import ShareButton from '@/components/ShareButton.vue'

export default {
  name: 'WinnerCard',
  components: {
    ShareButton
  },
  props: { 
    selectedSquares: Array,
    winConditionMet: Boolean,
    winnerCardClosed: Boolean
  },
  methods: {
    closeWinnerCard () {
      return this.$emit('closeWinnerCard')

      this.$gtag.event('Click', {
        event_category: 'UX',
        event_label: 'closeWinnerCard'
      })
    }
  }
}
</script>

<style lang="scss">
#winner {
  background-image: url('@/assets/winner_graphic.png');
}
</style>

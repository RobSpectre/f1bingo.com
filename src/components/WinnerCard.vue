<template lang="pug">
.fixed.z-10.inset-0.overflow-y-auto(v-if='winConditionMet' aria-labelledby='modal-title' role='dialog' aria-modal='true')
  .flex.items-end.justify-center.min-h-screen.pt-4.px-4.pb-20.text-center(class='sm:block sm:p-0')
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
      div
        ShareButton(text="Share")
</template>

<script>
import ShareButton from '@/components/ShareButton.vue'

import victorySong from '@/assets/sounds/les_toreadors.mp3'

export default {
  name: 'WinnerCard',
  components: {
    ShareButton
  },
  props: { 
    selectedSquares: Array,
    winConditionMet: Boolean
  },
  computed: {
    playMusic () {
      if (this.winConditionMet === true) {
        this.playVictoryMusic()
      }
    }
  },
  methods: {
    playVictoryMusic () {
      const audio = new Audio(victorySong)
      audio.volume = 0.5
      audio.play()
    }
  }
}
</script>

<style lang="scss">
#winner {
  background-image: url('@/assets/winner_graphic.png');
}
</style>

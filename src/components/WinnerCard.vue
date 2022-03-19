<template lang="pug">
.fixed.bottom-0.inset-x-0.px-4.pb-6.transition.ease-in-out.duration-700(v-if='winConditionMet' class='sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center')
  .fixed.inset-0.transition-opacity
    .absolute.inset-0.bg-gray-500.opacity-75
  .bg-white.rounded-lg.px-4.pt-5.pb-4.overflow-hidden.shadow-xl.transform.transition-all(class='sm:max-w-sm sm:w-full sm:p-6' role='dialog' aria-modal='true' aria-labelledby='modal-headline')
    div
      .mx-auto.flex.items-center.justify-center.h-24.w-24.rounded-full.bg-green
        img.p-5.text-white(src='/Checkered-Racing-Flags.svg')
      .mt-3.text-center(class='sm:mt-5')
        h2#modal-headline.text-6xl.leading-6.font-medium.text-gray-900.mb-4
          | BINGO! 
</template>

<script>
export default {
  name: 'WinnerCard',
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
    playVictoryMusic  () {
      const audio = new Audio('/les_toreadors.mp3')
      audio.volume = 0.5
      audio.play()
    }
  }
}
</script>

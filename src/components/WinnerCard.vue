<template lang="pug">
div(v-if='winConditionMet & !winnerCardClosed' class="no-capture absolute z-20 inset-0 overflow-hidden flex items-center justify-center p-4 rounded-xl" aria-labelledby='modal-title' role='dialog' aria-modal='true')
  //
    Victory panel, animated using custom CSS classes.
  div#winner(class='victory-animation bg-cover relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-2xl h-64 w-72 sm:p-6')
    button.absolute.right-0.top-0.mt-4.mr-4.transition-transform.hover_scale-110.active_scale-95.z-30(@click="closeWinnerCard")
      svg.w-6.h-6.drop-shadow-md(xmlns="http://www.w3.org/2000/svg", fill="none", viewBox="0 0 24 24", stroke-width="2", stroke="white")
        path(stroke-linecap="round", stroke-linejoin="round", d="M6 18 18 6M6 6l12 12")
    
    div.absolute.inset-x-0.flex.justify-center.z-30(class="top-1/3")
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
      this.$gtag.event('Click', {
        event_category: 'UX',
        event_label: 'closeWinnerCard'
      })

      return this.$emit('closeWinnerCard')
    }
  }
}
</script>

<style lang="scss">
#winner {
  background-image: url('@/assets/winner_graphic.png');
  background-position: center;
}

.victory-animation {
  animation: 
    victoryPopIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards,
    victoryPulse 2s ease-in-out 0.6s infinite alternate;
}

@keyframes victoryPopIn {
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(-10deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.05) rotate(3deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes victoryPulse {
  0% {
    box-shadow: 0 0 15px 5px rgba(0, 160, 222, 0.4); /* wet tire blue glow */
    transform: scale(1);
  }
  100% {
    box-shadow: 0 0 30px 15px rgba(0, 160, 222, 0.8);
    transform: scale(1.02);
  }
}
</style>

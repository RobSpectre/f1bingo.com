<template lang="pug">
div(
  v-if='winConditionMet && !winnerCardClosed'
  class="winner-modal absolute inset-0 overflow-hidden flex items-center justify-center p-4 rounded-[1rem]"
  aria-labelledby='modal-title'
  role='dialog'
  aria-modal='true'
)
  div#winner.surface-strong.winner-panel.no-capture
    button.winner-panel__close(
      @click="closeWinnerCard"
      type='button'
      aria-label='Close winner modal'
    )
      svg.w-5.h-5(xmlns="http://www.w3.org/2000/svg", fill="none", viewBox="0 0 24 24", stroke-width="2", stroke="currentColor")
        path(stroke-linecap="round", stroke-linejoin="round", d="M6 18 18 6M6 6l12 12")
    p.section-label Bingo Achieved
    h3#modal-title.winner-panel__title Full send.
    p.winner-panel__copy You hit a complete line. Screenshot the board and post your weekend masterpiece.
    .winner-panel__actions
      ShareButton(text="Share Win")
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
.winner-modal {
  z-index: 20;
  background: rgba(3, 6, 10, 0.68);
  backdrop-filter: blur(12px);
}

.winner-panel {
  position: relative;
  display: grid;
  gap: 0.9rem;
  width: min(100%, 28rem);
  padding: 1.5rem;
  border-radius: 0.9rem;
  background:
    linear-gradient(135deg, rgba(255, 196, 81, 0.16), transparent 35%),
    linear-gradient(180deg, rgba(10, 16, 24, 0.96), rgba(10, 12, 18, 0.98));
  animation:
    victoryPopIn 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.2) forwards,
    victoryPulse 2s ease-in-out 0.55s infinite alternate;
}

.winner-panel__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-main);
}

.winner-panel__title {
  font-size: clamp(2.2rem, 7vw, 3rem);
  line-height: 0.9;
}

.winner-panel__copy {
  color: var(--text-muted);
  line-height: 1.45;
}

.winner-panel__actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.2rem;
}

@keyframes victoryPopIn {
  0% {
    opacity: 0;
    transform: translateY(12px) scale(0.92);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes victoryPulse {
  0% {
    box-shadow: 0 0 0 1px rgba(255, 196, 81, 0.08), 0 25px 60px rgba(0, 0, 0, 0.38);
  }
  100% {
    box-shadow: 0 0 0 1px rgba(255, 196, 81, 0.22), 0 30px 75px rgba(255, 91, 77, 0.22);
  }
}
</style>

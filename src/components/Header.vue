<template lang="pug">
header#header.surface-strong.hero
  .hero__copy
    h1.hero__title F1 Bingo
    .hero__meta
      span.hero__pill Live board
      span.hero__pill Tap to mark incidents
      span.hero__pill Share your card
  .hero__rail
    .hero__panel
      p.hero__kicker Board Status
      p.hero__value {{ selectedCount }} / 25
      p.hero__detail Squares marked
    .hero__actions.no-capture
      ShareButton(text="Share Card")
      button.control-button.control-button--secondary(
        type='button'
        @click='resetBoard()'
      ) Reset Grid
</template>

<script>
import ShareButton from '@/components/ShareButton.vue'
import { boardStore } from '@/store/board'

export default {
  name: 'Header',
  components: {
    ShareButton
  },
  setup() {
    const game = boardStore()

    return { game }
  },
  computed: {
    selectedCount () {
      return this.game.selectedSquares.length
    }
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
.hero {
  position: relative;
  display: grid;
  gap: 1.5rem;
  overflow: hidden;
  border-radius: 1rem;
  padding: 1.5rem;
  background:
    linear-gradient(135deg, rgba(109, 215, 255, 0.12), transparent 35%),
    linear-gradient(120deg, rgba(255, 91, 77, 0.18), transparent 45%),
    linear-gradient(180deg, rgba(8, 17, 28, 0.9), rgba(7, 9, 12, 0.96));
}

.hero::before,
.hero::after {
  content: '';
  position: absolute;
  inset: auto auto 0 0;
  height: 0.35rem;
  width: 100%;
  background:
    linear-gradient(90deg, #ff5b4d 0 18%, transparent 18% 22%, #f5c451 22% 40%, transparent 40% 44%, #6dd7ff 44% 70%, transparent 70% 74%, rgba(255, 255, 255, 0.4) 74% 100%);
}

.hero::after {
  inset: 0 auto auto auto;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.22), transparent 55%);
}

.hero__copy,
.hero__rail {
  position: relative;
  z-index: 1;
}

.hero__title {
  max-width: 9ch;
  font-size: clamp(2.75rem, 7vw, 5rem);
  line-height: 0.92;
  letter-spacing: 0.01em;
}

.hero__lede {
  max-width: 42rem;
  color: var(--text-muted);
  font-size: 1.05rem;
  line-height: 1.45;
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.hero__pill {
  border-radius: 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.55rem 0.9rem;
  font-family: 'Oswald', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero__rail {
  display: grid;
  gap: 1rem;
  align-content: start;
}

.hero__panel {
  border-radius: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  padding: 1rem 1.1rem;
}

.hero__kicker,
.hero__detail {
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.78rem;
}

.hero__value {
  margin: 0.15rem 0;
  font-family: 'Oswald', sans-serif;
  font-size: 2.1rem;
  line-height: 1;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (min-width: 900px) {
  .hero {
    grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.72fr);
    gap: 2rem;
    padding: 2rem;
  }
}
</style>

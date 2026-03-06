<template lang="pug">
section.board-shell.surface-strong
  .board-shell__header
    .board-shell__masthead
      h1.board-shell__title Formula 1 Bingo
      .board-shell__event-row
        p.board-shell__event {{ game.event || cards.event }}
        .board-shell__signal(aria-hidden='true')
          span(v-for='n in 5' :key='n')
      p.board-shell__hint Tap events as they happen.
    .board-shell__actions.no-capture
      ShareButton(text="Share Card")
      button.control-button.control-button--secondary(
        type='button'
        @click='resetBoard()'
      ) Reset Grid
  #board.board-grid
    div(v-for='cell in game.board' :key='cell.id' class='board-grid__cell-wrapper')
      button.board-grid__cell(
        @click.prevent='markSquare(cell.id)'
        :class="cellClasses(cell)"
        :id="'square-' + cell.id"
      )
        span.celltext(:class='cellTextClasses(cell)') {{ cell.text }}
        .particles-container.absolute.inset-0.pointer-events-none.overflow-hidden(v-if="particles[cell.id]")
          div(v-for="p in particles[cell.id]" :key="p.id" class="particle" :style="p.style")
  particles.absolute.inset-0.w-full.h-full.z-10(
    v-if="winConditionMet && !game.winnerCardDismissed"
    :index="0"
    :intensity="5"
  )
  winner-card.z-20(
    :selectedSquares='game.selectedSquares'
    :winConditionMet='winConditionMet'
    :winnerCardClosed='game.winnerCardDismissed'
    @closeWinnerCard='dismissWinnerCard()'
  )
</template>

<script>
import cards from '@/assets/data/deck.json'

import ShareButton from '@/components/ShareButton.vue'
import WinnerCard from '@/components/WinnerCard.vue'
import Particles from '@/components/Particles.vue'

import { boardStore } from '@/store/board'

const WIN_CONDITIONS = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [5, 10, 15, 20, 25],
  [1, 7, 13, 19, 25],
  [5, 9, 13, 17, 21]
]

const EMOJI_SEGMENT_REGEX = /^\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F|\uFE0E)?)*$/u

export default {
  name: 'Board',
  components: {
    ShareButton,
    WinnerCard,
    Particles
  },
  setup() {
    const game = boardStore()

    return { game }
  },
  data () {
    return {
      particles: {},
      victorySoundPlayed: false
    }
  },
  mounted () {
    if (this.shouldRegenerateBoard()) {
      this.loadBoard()
    }

    this.emitter.on('reset-board', () => {
      this.victorySoundPlayed = false
      this.loadBoard()
    })
  },
  computed: {
    winConditionMet () {
      for (let i = 0; i < WIN_CONDITIONS.length; i++) {
        let winningSquares = 0

        for (let n = 0; n < this.game.selectedSquaresIds.length; n++) {
          if (WIN_CONDITIONS[i].includes(this.game.selectedSquaresIds[n]) === true) {
            winningSquares++
          }
        }

        if (winningSquares === 5) {
          this.playVictoryMusic()

          this.$gtag.event('Click', {
            event_category: 'Gameplay',
            event_label: 'BINGO'
          })

          return true
        }
      }

      return false
    }
  },
  methods: {
    shouldRegenerateBoard () {
      if (this.game.event !== cards.event || this.game.version !== cards.version) {
        return true
      }

      if (!Array.isArray(this.game.board) || this.game.board.length !== 25) {
        return true
      }

      return this.game.board.some((cell, index) => {
        if (!cell || typeof cell.text !== 'string' || cell.text.trim().length === 0) {
          return true
        }

        if (index === 12) {
          return cell.text !== 'Lights Out! (Free)'
        }

        return false
      })
    },
    cellClasses (cell) {
      return {
        'board-grid__cell--selected': cell.selected,
        'board-grid__cell--free': cell.id === 13
      }
    },
    cellTextClasses (cell) {
      return {
        'celltext--emoji': this.isEmojiOnlyCell(cell.text)
      }
    },
    segmentText (text) {
      if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
        return [...segmenter.segment(text)].map(({ segment }) => segment)
      }

      return Array.from(text)
    },
    isEmojiOnlyCell (text) {
      if (typeof text !== 'string') {
        return false
      }

      const trimmed = text.trim()

      if (!trimmed) {
        return false
      }

      const graphemes = this.segmentText(trimmed)

      if (graphemes.length < 1 || graphemes.length > 2) {
        return false
      }

      return graphemes.every(segment => EMOJI_SEGMENT_REGEX.test(segment))
    },
    markSquare (id) {
      if (navigator.vibrate) {
        navigator.vibrate(25)
      }

      const square = this.game.getSquareById(id)

      if (!square.selected) {
        this.spawnParticles(id)
      }

      this.game.markSquare(id)

      if (!this.winConditionMet) {
        this.victorySoundPlayed = false
      }

      this.$gtag.event('Click', {
        event_category: 'Gameplay',
        event_label: square.text
      })

      return id
    },
    spawnParticles(cellId) {
      if (!this.particles[cellId]) {
        this.particles[cellId] = []
      }

      const particleCount = 12
      const newParticles = []

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount
        const distance = 40 + Math.random() * 40
        const length = 15 + Math.random() * 20
        const thickness = 2 + Math.random() * 3

        newParticles.push({
          id: Date.now() + i,
          style: {
            '--dist': `${distance}px`,
            '--angle': `${angle}rad`,
            width: `${length}px`,
            height: `${thickness}px`,
            backgroundColor: '#f5c451'
          }
        })
      }

      this.particles[cellId] = [...this.particles[cellId], ...newParticles]

      setTimeout(() => {
        this.particles[cellId] = this.particles[cellId].filter(
          p => !newParticles.find(np => np.id === p.id)
        )
      }, 400)
    },
    loadBoard () {
      const deck = this.shuffle([...cards.squares])
      let id = 1
      let deckIndex = 0
      const newBoard = []

      for (let i = 0; i < 25; i++) {
        if (i === 12) {
          newBoard.push({ id: id, text: 'Lights Out! (Free)', selected: true })
        } else {
          newBoard.push({ id: id, text: deck[deckIndex], selected: false })
          deckIndex++
        }

        id++
      }

      this.game.setEvent(cards.event)
      this.game.setVersion(cards.version)
      this.game.resetBoard(newBoard)
    },
    shuffle (array) {
      let currentIndex = array.length
      let temporaryValue = array.length
      let randomIndex = array.length

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      return array
    },
    playVictoryMusic () {
      if (this.game.winnerCardDismissed || this.victorySoundPlayed) {
        return
      }

      const audio = new Audio('/sounds/les_toreadors.mp3')
      audio.volume = 0.5
      audio.play()
      this.victorySoundPlayed = true
    },
    dismissWinnerCard () {
      this.game.setWinnerCardDismissed(true)
    },
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
.board-shell {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  padding: 1rem;
}

.board-shell__header {
  position: relative;
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem 1rem 1.1rem;
  border-radius: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  background:
    linear-gradient(90deg, rgba(2, 7, 14, 0.92) 0%, rgba(4, 10, 18, 0.82) 44%, rgba(6, 10, 16, 0.44) 100%),
    url('@/assets/header-2026.svg');
  background-size: cover;
  background-position: center;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 20px 50px rgba(0, 0, 0, 0.28);
}

.board-shell__header::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent 22%),
    repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0 5px, transparent 5px 12px);
  opacity: 0.18;
  mix-blend-mode: screen;
  pointer-events: none;
}

.board-shell__header::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 4px;
  background: linear-gradient(90deg, rgba(255, 196, 81, 0), rgba(255, 196, 81, 0.9) 24%, rgba(255, 91, 77, 0.85) 58%, rgba(109, 215, 255, 0.88) 100%);
  pointer-events: none;
}

.board-shell__masthead {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0.18rem;
  align-content: start;
}

.board-shell__title {
  max-width: 10ch;
  font-size: clamp(2.9rem, 7vw, 5.35rem);
  line-height: 0.88;
  letter-spacing: 0.02em;
  color: #f7f8fb;
  text-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
}

.board-shell__event-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.7rem;
}

.board-shell__event {
  font-family: 'Oswald', sans-serif;
  font-size: clamp(0.98rem, 1.8vw, 1.35rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(243, 245, 248, 0.94);
}

.board-shell__signal {
  display: flex;
  gap: 0.35rem;
}

.board-shell__signal span {
  width: 0.58rem;
  height: 0.58rem;
  border-radius: 9999px;
  background: rgba(255, 91, 77, 0.3);
  box-shadow: 0 0 0 1px rgba(255, 91, 77, 0.16);
}

.board-shell__signal span:nth-child(-n + 3) {
  background: #ff4b3e;
  box-shadow: 0 0 12px rgba(255, 75, 62, 0.5);
}

.board-shell__signal span:nth-child(n + 4) {
  background: rgba(255, 255, 255, 0.22);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.board-shell__hint {
  max-width: 34rem;
  margin-top: 0.35rem;
  color: rgba(228, 233, 240, 0.8);
  line-height: 1.45;
}

.board-shell__actions {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: start;
  justify-content: flex-start;
}

.board-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.7rem;
  position: relative;
}

.board-grid__cell-wrapper {
  min-width: 0;
}

.board-grid__cell {
  position: relative;
  display: flex;
  aspect-ratio: 1 / 1;
  width: 100%;
  min-width: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02)),
    linear-gradient(180deg, #10161f, #0a0e14);
  padding: 0.65rem;
  text-align: center;
  color: var(--text-main);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.board-grid__cell::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(255, 91, 77, 0.12), transparent 44%),
    linear-gradient(315deg, rgba(109, 215, 255, 0.08), transparent 40%);
  opacity: 0;
  transition: opacity 180ms ease;
}

.board-grid__cell::after {
  content: '';
  position: absolute;
  inset: auto -35% 10%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(245, 196, 81, 0.9), transparent);
  opacity: 0;
  transform: translateX(-140%);
  pointer-events: none;
}

.board-grid__cell:hover {
  transform: translateY(-2px);
  border-color: rgba(109, 215, 255, 0.32);
  box-shadow:
    0 18px 35px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.board-grid__cell:hover::before {
  opacity: 1;
}

.board-grid__cell:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 2px;
}

.board-grid__cell--selected {
  border-color: rgba(255, 196, 81, 0.45);
  background:
    linear-gradient(180deg, rgba(255, 196, 81, 0.18), rgba(255, 91, 77, 0.08)),
    linear-gradient(180deg, #251913, #161011);
  box-shadow:
    0 18px 40px rgba(255, 91, 77, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  animation: selectedSquareGlow 2.4s ease-in-out infinite;
}

.board-grid__cell--selected::before {
  opacity: 1;
}

.board-grid__cell--selected::after {
  opacity: 0.9;
  animation: selectedSquareSweep 1.8s linear infinite;
}

.board-grid__cell--free {
  background:
    linear-gradient(180deg, rgba(109, 215, 255, 0.2), rgba(245, 196, 81, 0.12)),
    linear-gradient(180deg, #132433, #10161f);
}

.celltext {
  position: relative;
  z-index: 1;
  display: block;
  margin: 0;
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(0.82rem, 1.7vw, 1rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: 0.035em;
  text-transform: uppercase;
  text-wrap: balance;
}

.celltext--emoji {
  font-family: 'Source Sans 3', sans-serif;
  font-size: clamp(2.4rem, 6vw, 3.65rem);
  line-height: 1;
  letter-spacing: 0;
  text-transform: none;
  text-shadow: 0 10px 24px rgba(0, 0, 0, 0.28);
}

.particle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: left center;
  border-radius: 9999px;
  animation: explode 0.4s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
  opacity: 0.8;
}

@keyframes explode {
  0% {
    transform: translate(0, -50%) rotate(var(--angle)) translateX(0) scaleX(0.1);
    opacity: 0.8;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: translate(0, -50%) rotate(var(--angle)) translateX(var(--dist)) scaleX(1);
    opacity: 0;
  }
}

@keyframes selectedSquareGlow {
  0%,
  100% {
    box-shadow:
      0 18px 40px rgba(255, 91, 77, 0.14),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
  50% {
    box-shadow:
      0 22px 48px rgba(255, 91, 77, 0.24),
      0 0 0 1px rgba(245, 196, 81, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
}

@keyframes selectedSquareSweep {
  0% {
    transform: translateX(-140%);
  }
  100% {
    transform: translateX(140%);
  }
}

@media (min-width: 900px) {
  .board-shell {
    padding: 1.1rem;
  }

  .board-shell__header {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    min-height: 11.75rem;
    padding: 1.15rem 1.15rem 1.25rem;
  }
}

@media (max-width: 640px) {
  .board-shell__header {
    padding: 0.95rem 0.9rem 1rem;
  }

  .board-shell__title {
    font-size: 2.35rem;
  }

  .board-shell__event {
    font-size: 0.92rem;
  }

  .board-shell__actions {
    flex-wrap: nowrap;
    gap: 0.55rem;
  }

  .board-shell__actions > * {
    flex: 1 1 0;
    min-width: 0;
  }

  .board-shell__actions .control-button {
    width: 100%;
    justify-content: center;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .board-grid {
    gap: 0.45rem;
  }

  .board-grid__cell {
    padding: 0.45rem;
    border-radius: 0.55rem;
  }

  .celltext {
    font-size: 0.72rem;
    line-height: 1.12;
  }

  .celltext--emoji {
    font-size: clamp(2rem, 9vw, 3rem);
  }
}
</style>

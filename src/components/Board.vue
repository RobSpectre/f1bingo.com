<template lang="pug">
#board.bg-white.grid.grid-flow-col.grid-cols-5.grid-rows-5.gap-4.p-4.flex.items-center.justify-center
  div(v-for='cell in game.board' :key='cell.id' @click.prevent='markSquare(cell.id)')
    button(
      class="aspect-square w-full h-full text-white flex items-center justify-center square transition-all duration-200 ease-out rounded-2xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
      :class="{ 'bg-tire-soft': cell.selected, 'bg-gray': !cell.selected }"
      :id="'square-' + cell.id"
    )
      span.celltext {{ cell.text }}
      // Particle overlay for each cell
      .particles-container.absolute.inset-0.pointer-events-none.overflow-hidden(v-if="particles[cell.id]")
        div(v-for="p in particles[cell.id]" :key="p.id" class="particle" :style="p.style")
  winner-card(
    :selectedSquares='game.selectedSquares',
    :winConditionMet='winConditionMet',
    :winnerCardClosed='winnerCardClosed',
    @closeWinnerCard='winnerCardClosed = true'
  )
</template>

<script>
import cards from '@/assets/data/deck.json'

import WinnerCard from '@/components/WinnerCard.vue'

import { boardStore } from '@/store/board'

export default {
  name: 'Board',
  components: {
    WinnerCard
  },
  setup() {
    const game = boardStore()

    return { game }
  },
  data () {
    return {
      winnerCardClosed: false,
      particles: {} // Track particles per square ID
    }
  },
  mounted () {
    if (this.game.event !== cards.event || this.game.version !== cards.version) {
      this.loadBoard()
    }

    this.emitter.on('reset-board', (payload) => {
      this.loadBoard()
    })
  },
  computed: {
    winConditionMet () {
      const winConditions = [
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

      for (let i = 0; i < winConditions.length; i++) {
        let winningSquares = 0

        for (let n = 0; n < this.game.selectedSquaresIds.length; n++) {
          if ( winConditions[i].includes(this.game.selectedSquaresIds[n]) === true) {
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
  data () {
    return {
      winnerCardClosed: false,
      particles: {} // Track particles per square ID
    }
  },
  methods: {
    markSquare (id) {
      // Small haptic bump if supported by device
      if (navigator.vibrate) {
        navigator.vibrate(25)
      }

      const square = this.game.getSquareById(id)
      
      // Only spawn particles if we are selecting it (not unselecting)
      if (!square.selected) {
        this.spawnParticles(id)
      }

      this.game.markSquare(id)

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
        const distance = 40 + Math.random() * 40 // Travel distance
        const length = 15 + Math.random() * 20 // Length of the line
        const thickness = 2 + Math.random() * 3 // Thickness of the line
        
        newParticles.push({
          id: Date.now() + i,
          style: {
            '--dist': `${distance}px`,
            '--angle': `${angle}rad`,
            width: `${length}px`,
            height: `${thickness}px`,
            backgroundColor: '#ffffff'
          }
        })
      }

      this.particles[cellId] = [...this.particles[cellId], ...newParticles]

      // Clean up after animation duration
      setTimeout(() => {
        this.particles[cellId] = this.particles[cellId].filter(
          p => !newParticles.find(np => np.id === p.id)
        )
      }, 400)
    },
    loadBoard () {
      const deck = this.shuffle(cards.squares)
      let id = 1
      const newBoard = []

      for (let i = 0; i < 25; i++) {
        if (i === 12) {
          newBoard.push({ id: id, text: 'Lights Out! (Free)', selected: true })
        } else {
          newBoard.push({ id: id, text: deck[id], selected: false })
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
      const audio = new Audio('/sounds/les_toreadors.mp3')
      audio.volume = 0.5
      audio.play()
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap');

.celltext {
  font-family: 'Oswald', sans-serif;
  font-weight: 500;
  @apply mx-2 my-0 text-pretty inline uppercase;
}

.square {
  @apply tracking-tight text-xs sm:text-base md:text-lg
  text-balance truncate focus:outline-none leading-3 
  focus-visible:ring-2 focus-visible:ring-tire-soft focus-visible:ring-offset-2;
  position: relative; /* For particle positioning */
}

/* Racing line animation */
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
</style>

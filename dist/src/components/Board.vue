<template lang="pug">
#board.bg-white.grid.grid-flow-col.grid-cols-5.grid-rows-5.gap-4.p-10.mx-auto
  div(v-for='cell in game.board' :key='cell.id' @click.prevent='markSquare(cell.id)')
    a.m-auto.text-white.flex.items-center.justify-center(class="w-16 h-16 p-4 text-xs sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-32 lg:h-32 md:text-base lg:text-lg focus:outline-none focus:shadow-outline-none focus:border-none" :class="{ 'bg-green': cell.selected, 'bg-gray': !cell.selected }" :id="'square-' + cell.id")
      span.celltext {{ cell.text }}
  winner-card(:selectedSquares='game.selectedSquares', :winConditionMet='winConditionMet')
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
  mounted () {
    this.loadBoard()

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

          return true
        }
      }

      return false
    }
  },
  methods: {
    markSquare (id) {
      this.game.markSquare(id)

      this.$gtag.event('Click', {
        event_category: 'Gameplay',
        event_label: this.game.getSquareById(id).text
      })

      return id
    },
    loadBoard () {
      const deck = this.shuffle(cards)
      let id = 1
      const newBoard = []

      for (let i = 0; i < 25; i++) {
        if (i === 12) {
          newBoard.push({ id: id, text: 'Green Flag (Free)', selected: true })
        } else {
          newBoard.push({ id: id, text: deck[id], selected: false })
        }

        id++
      }

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
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400&display=swap');

.celltext {
  font-family: 'Roboto Condensed', sans-serif;
  @apply inline-block p-2;
}
</style>

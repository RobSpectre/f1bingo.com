<template lang="pug">
#board.bg-white.grid.grid-flow-col.grid-cols-5.grid-rows-5.gap-4.p-10.mx-auto
  div(v-for='cell in board' :key='cell.id' @click.prevent='markSquare(cell.id)')
    .bg-green.m-auto.text-white.flex.items-center.justify-center(v-if='cell.selected' class="sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-32 lg:h-32 w-16 h-16 text-xs p-4 md:text-base lg:text-lg" :id="'square-' + cell.id")
      span.inline-block.p-2 {{ cell.text }}
    a(v-else href='#')
      .bg-gray-500.m-auto.text-white.flex.items-center.justify-center(class="hover:bg-orange focus:outline-none focus:shadow-outline-orange focus:border-orange active:bg-orange sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-32 lg:h-32 w-16 h-16 text-xs p-4 md:text-base lg:text-lg" :id="'square-' + cell.id")
        span.inline-block.p-2 {{ cell.text }}
</template>

<script>
import cards from '@/assets/data/deck.json'

export default {
  name: 'Board',
  data: function () {
    return {
      board: []
    }
  },
  mounted () {
    this.loadBoard()

    this.emitter.on('reset-board', (payload) => {
      this.loadBoard()
    })
  },
  methods: {
    markSquare (id) {
      this.board.forEach((cell) => {
        if (cell.id === id) {
          cell.selected = true

          this.$gtag.event('Click', {
            event_category: 'Gameplay',
            event_label: cell.text
          })
        }
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

      this.board = newBoard
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
    }
  }
}
</script>

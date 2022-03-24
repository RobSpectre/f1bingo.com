<template lang="pug">
.flex.flex-col.mt-5.justify-center.items-center(class='sm:mt-6')
  button.inline-flex.rounded-md.border.border-transparent.shadow-sm.px-4.py-2.bg-green.text-base.font-medium.text-white.uppercase.mt-14(type='button' class='hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow sm:text-sm sm:mt-24' @click='shareBoard()') {{ text }} 
    ShareIcon.ml-2.h-4.w-4.text-white
</template>

<script>
import { ShareIcon } from '@heroicons/vue/solid'

import { useToast } from 'vue-toastification'

import { boardStore } from '@/store/board'

export default {
  name: 'ShareButton',
  components: {
    ShareIcon
  },
  setup() {
    const game = boardStore()

    const toast = useToast()

    return { game, toast }
  },
  props: {
    text: String
  },
  methods: {
    shareBoard () {
      let text = "f1bingo.com\n\n"

      let results = [
        [],
        [],
        [],
        [],
        []
      ]
        
      let row = 0
      
      this.game.board.forEach((cell) => {
        if (cell.selected === true) {
          results[row].push("🟩")
        } else {
          results[row].push("⬜")
        }
        
        row++

        if (row > 4) {
          row = 0
        }
      })

      results.forEach((row) => {
        row.forEach((square) => {
          text = text + square
        })
        
        text = text + "\n"
      })

      navigator.clipboard.writeText(text)

      this.toast(
        "Results copied to your clipboard",
        {toastClassName: "bg-green"}
      )

      return text
    }
  }
}
</script>

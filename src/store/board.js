import { defineStore } from 'pinia'

const FREE_SQUARE_ID = 13

export const boardStore = defineStore('game', {
  state: () => ({
    name: 'game',
    board: [],
    event: null,
    version: null,
    winnerCardDismissed: false
  }),
  persist: true,
  getters: {
    selectedSquares (state) {
      return state.board.filter(function (square) {
         return square.selected == true
      })
    },
    selectedSquaresIds (state) {
      return this.selectedSquares.map( x => x.id)      
    },
    getSquareById (state) {
      return (id) => state.board.find((square) => square.id === id)
    }
  },
  actions: {
    addSquare (square) {
      this.board.push(square)
    },
    markSquare (id) {
      this.board.forEach((cell) => {
        if (cell.id === id) {
          if (cell.id === FREE_SQUARE_ID) {
            cell.selected = true
            return
          }

          if (cell.selected === true) {
            cell.selected = false
          } else {
            cell.selected = true
          }
        }
      })
    },
    resetBoard (board) {
      this.board = board
      this.winnerCardDismissed = false
    },
    setEvent (title) {
      this.event = title
    },
    setVersion (version) {
      this.version = version
    },
    setWinnerCardDismissed (dismissed) {
      this.winnerCardDismissed = dismissed
    }
  }
})

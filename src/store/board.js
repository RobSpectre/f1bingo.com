import { defineStore } from 'pinia'

export const boardStore = defineStore('game', {
  state: () => ({
    name: 'game',
    board: [],
    event: null,
    version: null
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
    },
    setEvent (title) {
      this.event = title
    },
    setVersion (version) {
      this.version = version
    }
  }
})

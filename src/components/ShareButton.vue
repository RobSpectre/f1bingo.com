<template lang="pug">
button.control-button.control-button--primary(
  type='button'
  @click='shareBoard()'
)
  | {{ text }}
  ShareIcon.ml-2.h-4.w-4
</template>

<script>
import html2canvas from 'html2canvas-pro'

import { ShareIcon } from '@heroicons/vue/24/solid'

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
    async tryClipboardCopy (blob) {
      if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
        return false
      }

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ])

      return true
    },
    async createScreenshotBlob () {
      const contentElement = document.querySelector('.app-shell__content')

      if (!contentElement) {
        throw new Error('Could not find the board to capture.')
      }

      const clonedContent = contentElement.cloneNode(true)
      const captureFrame = document.createElement('div')

      captureFrame.style.position = 'absolute'
      captureFrame.style.top = '-9999px'
      captureFrame.style.left = '-9999px'
      captureFrame.style.width = '760px'
      captureFrame.style.padding = '28px'
      captureFrame.style.background = 'linear-gradient(180deg, #08111c 0%, #05070b 42%, #040506 100%)'
      captureFrame.style.borderRadius = '20px'
      captureFrame.style.boxSizing = 'border-box'

      clonedContent.style.width = '100%'
      clonedContent.style.maxWidth = '100%'
      clonedContent.style.padding = '0'

      captureFrame.appendChild(clonedContent)
      document.body.appendChild(captureFrame)

      try {
        const elementsToRemove = captureFrame.querySelectorAll('.no-capture')
        elementsToRemove.forEach(el => {
          el.remove()
        })

        const footerText = captureFrame.querySelector('.change-for-screenshot')
        if (footerText) {
          footerText.innerHTML = 'Play along at f1bingo.com'
          footerText.classList.add('footer__eyebrow')
        }

        const boardShell = captureFrame.querySelector('.board-shell')
        if (boardShell) {
          boardShell.style.background = 'linear-gradient(180deg, rgba(17, 24, 36, 0.98), rgba(10, 14, 20, 0.98))'
          boardShell.style.borderColor = 'rgba(255, 255, 255, 0.18)'
          boardShell.style.boxShadow = '0 28px 70px rgba(0, 0, 0, 0.34)'
        }

        const footerShell = captureFrame.querySelector('.footer-shell')
        if (footerShell) {
          footerShell.style.background = 'rgba(14, 19, 28, 0.96)'
          footerShell.style.borderColor = 'rgba(255, 255, 255, 0.16)'
        }

        const boardCells = captureFrame.querySelectorAll('.board-grid__cell')
        boardCells.forEach(el => {
          el.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04)), linear-gradient(180deg, #18202c, #111722)'
          el.style.borderColor = 'rgba(255, 255, 255, 0.14)'
          el.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.07)'
        })

        const selectedCells = captureFrame.querySelectorAll('.board-grid__cell--selected')
        selectedCells.forEach(el => {
          el.style.background = 'linear-gradient(180deg, rgba(255, 196, 81, 0.26), rgba(255, 91, 77, 0.14)), linear-gradient(180deg, #332117, #201615)'
          el.style.borderColor = 'rgba(255, 196, 81, 0.6)'
          el.style.boxShadow = '0 18px 40px rgba(255, 91, 77, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        })

        const cellTexts = captureFrame.querySelectorAll('.celltext')
        cellTexts.forEach(el => {
          el.style.fontSize = '1.05rem'
          el.style.lineHeight = '1.16'
          el.style.color = '#f7f8fb'
        })

        const canvas = await html2canvas(captureFrame, {
          logging: false,
          useCORS: true,
          backgroundColor: null
        })

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))

        if (!blob) {
          throw new Error('Error creating image data.')
        }

        return blob
      } finally {
        document.body.removeChild(captureFrame)
      }
    },
    async shareBoard() {
      try {
        const blob = await this.createScreenshotBlob()
        const copied = await this.tryClipboardCopy(blob)

        if (!copied) {
          throw new Error('Clipboard image sharing is not supported on this browser.')
        }

        this.toast('Board copied to your clipboard!', { toastClassName: 'theme-toast theme-toast--success' })
        this.$gtag.event('Click', {
          event_category: 'Share',
          event_label: 'Clipboard Share Success'
        })

        return true
      } catch (error) {
        console.error('Screenshot sharing failed:', error)
        this.toast(`Error sharing your board: ${error.message || error}`, { toastClassName: 'theme-toast theme-toast--error' })
        this.$gtag.event('Click', {
          event_category: 'Share',
          event_label: 'Share Failure'
        })
      }
    }
  }
}
</script>

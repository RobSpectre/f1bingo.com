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
    isIOS() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera

      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true
      }

      if (/Macintosh/.test(userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1) {
        return true
      }

      return false
    },
    async shareBoard() {
      try {
        const contentElement = document.querySelector('.app-shell__content')
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

        const options = {
          logging: false,
          useCORS: true,
          backgroundColor: null,
        }

        const canvas = await html2canvas(captureFrame, options)

        document.body.removeChild(captureFrame)

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))

        if (!blob) {
          this.toast('Error creating image data.', { toastClassName: 'bg-red' })
          return
        }

        if (this.isIOS()) {
          const file = new File([blob], 'image.png', { type: 'image/png' })

          if (navigator.share) {
            try {
              if (navigator.canShare && !navigator.canShare({ files: [file] })) {
                this.toast('Sharing images is not supported on this browser.', { toastClassName: 'bg-red' })
                return
              }

              await navigator.share({
                title: 'f1bingo.com',
                text: 'Share your board!',
                files: [file]
              })

              this.$gtag.event('Click', {
                event_category: 'Share',
                event_label: 'Share Success'
              })
            } catch (error) {
              if (error.name !== 'AbortError') {
                this.toast(`Error sharing your board: ${error.message}`, { toastClassName: 'bg-red' })
              }

              this.$gtag.event('Click', {
                event_category: 'Share',
                event_label: 'Share Failure'
              })
            }
          } else {
            this.toast('Web Share API not supported in this browser', { toastClassName: 'bg-red' })
          }
        } else {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                'image/png': blob
              })
            ])

            this.toast('Board copied to your clipboard!', { toastClassName: 'bg-green' })
            this.$gtag.event('Click', {
              event_category: 'Share',
              event_label: 'Share Success'
            })
          } catch(clipboardError) {
            this.toast(`Error copying to clipboard: ${clipboardError.message}`, { toastClassName: 'bg-red' })

            this.$gtag.event('Click', {
              event_category: 'Share',
              event_label: 'Share Failure'
            })
          }
        }

        return true
      } catch (error) {
        console.error('Screenshot sharing failed:', error)
        this.toast(`Error copying to clipboard ${error}`, { toastClassName: 'bg-red' })
      }
    }
  }
}
</script>
